// /rcon/rconClient.js
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./realRconClient');
  } else {
    module.exports = require('./mockRconClient');
  }
  