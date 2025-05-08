const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
    isProduction: false, // ubah ke true kalau udah production
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

module.exports = snap;
