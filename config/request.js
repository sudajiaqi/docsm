const axios = require('axios');

// 1.6 错误码说明
// 正常情况下，接口返回的Http状态码是200，下面列举了Apollo会返回的非200错误码说明。
//
// 1.6.1 400 - Bad Request
// 客户端传入参数的错误，如必选参数没有传入等，客户端需要根据提示信息检查对应的参数是否正确。
//
// 1.6.2 401 - Unauthorized
// 客户端未授权，如服务端配置了访问秘钥，客户端未配置或配置错误。
//
// 1.6.2 404 - Not Found
// 接口要访问的资源不存在，一般是URL或URL的参数错误，或者是对应的namespace还没有发布过配置。
//
// 1.6.3 405 - Method Not Allowed
// 接口访问的Method不正确，比如应该使用GET的接口使用了POST访问等，客户端需要检查接口访问方式是否正确。
//
// 1.6.4 500 - Internal Server Error
// 其它类型的错误默认都会返回500，对这类错误如果应用无法根据提示信息找到原因的话，可以尝试查看服务端日志来排查问题。

const processStatusCode = (code) => {
  if (code === 200) {
    return 'Success';
  }
  if (code === 401) {
    return 'Unauthorized';
  }
  if (code === 400) {
    return 'Bad Request';
  }

  if (code === 404) {
    return 'Not Found';
  }
  if (code === 405) {
    return 'Method Not Allowed';
  }
  if (code === 500) {
    return 'Internal Server Error';
  }
  return null;
};

const apollo = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
});

apollo.interceptors.response.use((res) => {
  if (res.status !== 200) {
    return processStatusCode(res.status);
  }
  return res.data;
}, (error) => {
  console.error(error, 'error');
});

const request = (options) => apollo.request(options);

module.exports = request;
