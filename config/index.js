const fs = require('fs');
const path = require('path');
const merge = require('deepmerge');

const Apollo = require('./apollo');
const baseConfig = require('./base.json');

process.env = merge(process.env, baseConfig);
const env = process.env.NODE_ENV || 'development';
const url = path.resolve(__dirname, `./${env}.json`);
if (fs.existsSync(url)) {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const envConfig = require(url);
  process.env = merge(process.env, envConfig);
}

const apollo = Apollo.init({ ...process.env.apollo });

apollo.pre((options) => ({
  ...options,
  headers: { apollo_auth_token: process.env.apollo.authToken },
}));

const getConfig = async () => {
  const otherConfig = await apollo.getConfig();
  process.env = merge(process.env, otherConfig);
  return otherConfig;
};

module.exports = { getConfig };
