const express = require('express');
const { createTransaction, paymentWebhook } = require('../controllers/midtransController');
const router = express.Router();

// Buat invoice baru
// POST /api/payment/create
router.post('/create', createTransaction);

// Webhook Midtrans (otomatis dipanggil Midtrans)
// POST /api/payment/webhook
router.post('/webhook', paymentWebhook);

module.exports = router;
