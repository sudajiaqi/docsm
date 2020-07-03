const interfaces = require('os').networkInterfaces();

module.exports = function getIPAddress() {
  const address = Object.values(interfaces).reduce((addr, iface) => {
    if (typeof addr === 'string') {
      return addr;
    }
    for (let i = 0; i < iface.length; i += 1) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
    return null;
  });
  return address || '0.0.0.0';
};
