const assert = require('assert').strict;
const merge = require('deepmerge');
const dotProp = require('dot-prop');

const AxiosRequest = require('./request');
const getIPAddress = require('./ipUtil');

const toObjectTree = (result) => {
  if (!result) {
    return {};
  }
  const resultObject = {};
  Object.keys(result).forEach((key) => {
    dotProp.set(resultObject, key, result[key]);
  });
  return resultObject;
};

const mergeConfigs = (configs) => configs.map((res) => toObjectTree(res))
  .reduce((previous, current) => merge(previous, current));

class Apollo {
  constructor({
    configServerUrl,
    clusterName,
    appId,
    namespaces,
    namespaceName,
  }) {
    assert(configServerUrl, 'configServerUrl is required');
    // assert(namespaces, 'namespaces is required');
    // assert(typeof namespaces === 'string' && namespaces.length > 0, 'namespaces is required');
    assert(appId, 'appId is required');
    assert(clusterName, 'clusterName is required');

    this.configServerUrl = configServerUrl || 'http://139.217.110.117:40003';
    this.appId = appId || 'bossserv';
    this.clusterName = clusterName || 'default';
    this.namespaces = namespaces || [];
    if (namespaceName) {
      this.namespaces.push(namespaceName);
    }
    this.clientIp = getIPAddress() || '127.0.0.1';
    this.preRequest = (option) => option;
    this.postRequest = (res) => res;
  }

  static init(options) {
    return new Apollo(options);
  }

  pre(interceptor) {
    assert(interceptor && typeof interceptor === 'function');
    this.preRequest = interceptor;
    return this;
  }

  post(interceptor) {
    assert(interceptor && typeof interceptor === 'function');
    this.postRequest = interceptor;
  }

  async getConfigFromCache() {
    const configs = await Promise
      .all(this.namespaces.map((ns) => this.getConfigFromCacheByNameSpace(ns)));

    return mergeConfigs(configs);
  }

  async getConfigFromCacheByNameSpace(namespace) {
    const url = `${this.configServerUrl}/configfiles/json/${this.appId}/${this.clusterName}/${namespace}`;
    const params = { ip: this.clientIp };
    const method = 'get';
    const options = { method, url, params };

    return this.request(options);
  }

  async getConfig() {
    const configs = await Promise
      .all(this.namespaces.map((ns) => this.getConfigByNameSpace(ns)));

    return mergeConfigs(configs.map(co=>co.configurations));
  }

  async getConfigByNameSpace(namespace) {
    const url = `${this.configServerUrl}/configs/${this.appId}/${this.clusterName}/${namespace}`;
    const params = { ip: this.clientIp };
    const method = 'get';
    const options = { method, url, params };

    return this.request(options);
  }

  async request(options) {
    const result = await AxiosRequest(this.preRequest(options));

    return this.postRequest(result);
  }
}

module.exports = Apollo;
