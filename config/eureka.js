import Eureka from 'eureka-js-client';

// https://github.com/jquatier/eureka-js-client
// https://cnodejs.org/topic/5bcff894ad50495f5e2fbab9

// Or, if you're not using a transpiler:
// const { Eureka } = require('eureka-js-client');

// example configuration
const client = new Eureka({
  // application instance information
  instance: {
    app: 'jqservice',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: 8080,
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: '192.168.99.100',
    port: 32768,
  },
});


client.start();