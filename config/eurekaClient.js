/* eslint-disable */
import { Eureka } from 'eureka-client'
import { APP, PORT, SERVICE_URL } from 'constants/env'
import Log4js from '../../log'
import getIPAddress from "./ipUtil";

const logger = Log4js.getLogger('eurekaClient')

const resolveConfigOpts = (ENV_CONFIG_OPTS) => {
  if (ENV_CONFIG_OPTS == null) {
    return {}
  }

  let configOpts = {}
  ENV_CONFIG_OPTS.split(/\s+/).forEach(prop =>
    prop.replace(/^\-D(.+)\=(.+)$/, ($0, $1, $2) => {
      if ($0 && $1 && $2) {
        configOpts[$1] = $2
      }
    })
  )

  logger.debug('config opts resolved ', configOpts)
  return configOpts
}


const CONFIG_OPTS = resolveConfigOpts(require('process').env.CONFIG_OPTS)

const HOST = CONFIG_OPTS['eureka.instance.ip'] || getIPAddress()

logger.info('Initial eurekaClient ... HOST is ', HOST)

const eurekaClient = new Eureka({
  instance: {
    instanceId: `${APP}:${HOST}:${PORT}`,
    app: APP,
    hostName: HOST,
    ipAddr: HOST,
    port: {
      $: PORT,
      '@enabled': 'true',
    },
    vipAddress: APP,
    statusPageUrl: `http://${HOST}:${PORT}/info`,
    healthCheckUrl: `http://${HOST}:${PORT}/health`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    serviceUrl: SERVICE_URL
  },
  logger: logger
})

export default eurekaClient


