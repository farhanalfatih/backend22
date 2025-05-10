// /rcon/rconClient.js
if (process.env.NODE_ENV === 'development') {
    module.exports = require('./realRconClient');
  } else {
    module.exports = require('./mockRconClient');
  }
  