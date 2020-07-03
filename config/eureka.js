// import Eureka from 'eureka-js-client';

// https://github.com/jquatier/eureka-js-client
// https://cnodejs.org/topic/5bcff894ad50495f5e2fbab9

// Or, if you're not using a transpiler:
const { Eureka } = require('eureka-js-client');
const getIPAddress = require('./ipUtil');

// example configuration

const ip = getIPAddress();

const getEurekaClient = () => {
  const serviceName = process.env.apollo.appId; // eureka 服务注册的服务名
  const { port } = process.env; // 对应服务的端口号

  const zone = process.env.eureka.instance.metadataMap.zone || 'unknown';
// const process.env.eureka.instance.instanceId

  return new Eureka({
    instance: {
      instanceId: `${serviceName}:${ip}:${port}:${zone}`,
      app: serviceName,
      hostName: ip,
      ipAddr: ip,
      statusPageUrl: `http://${ip}:${port}/info`, // spring admin 注册心跳
      healthCheckUrl: `http://${ip}:${port}/health`, // eureka 注册心跳
      port: {
        $: port,
        '@enabled': 'true',
      },
      // Important, otherwise spring-apigateway cannot find instance of book-service
      vipAddress: serviceName,
      // secureVipAddress: 'book-service',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      // eureka 只有一个注册中心
      // fetchRegistry: false,
      // host: '127.0.0.1',
      // port: 8761,
      // servicePath: '/eureka/apps/',
      registryFetchInterval: 3000,

      // 有多个 eureka 集群
      serviceUrls: {
        default: ['http://192.168.1.138:40001/eureka/apps/'],
      },
    },
  });
};
module.exports = getEurekaClient;
