const midtrans = require('../utils/midtransClient');
const { setRank } = require('../rcon/rconClient');
const { saveTransaction, getTransaction } = require('../utils/transactionMemory');

// Hardcode list rank
const rankList = {
  "Donatur": { price: 5000, group: "donatur" },
  "Donatur+": { price: 10000, group: "donaturplus" },
  "VIP": { price: 25000, group: "vip" },
  "VIP+": { price: 50000, group: "vipplus" },
  "MVP": { price: 75000, group: "mvp" },
  "MVP+": { price: 80000, group: "mvpplus" },
  "MVP²+": { price: 65000, group: "mvp2plus" }
};

// Endpoint untuk buat transaksi
exports.createTransaction = async (req, res) => {
  const { username, rank } = req.body;

  if (!rankList[rank]) {
    return res.status(400).json({ message: "Rank tidak valid" });
  }

  const orderId = `ORDER-${Date.now()}`;
  const harga = rankList[rank].price;


  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: harga,
    },
    customer_details: {
      first_name: username,
    },
    item_details: [
      {
        id: rank,
        price: harga,
        quantity: 1,
        name: `Rank ${rank}`,
      },
    ],
  };

  saveTransaction(orderId, username, rank);
  if (process.env.NODE_ENV !== 'production'){
    console.log(`🟢 Mencoba membuat transaksi untuk ${username} dengan rank ${rank}`);
  }



  try {
    const transaction = await midtrans.createTransaction(parameter);
    res.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: orderId,
    });
  } catch (error) {
    console.error("Midtrans error:", error.message);
    res.status(500).json({ message: "Gagal membuat transaksi" });
  }
};

// Endpoint webhook dari Midtrans
exports.paymentWebhook = async (req, res) => {
  try {
    const { transaction_status, fraud_status, order_id } = req.body;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`📩 Webhook diterima: ${order_id}`);
    }
    

    const saved = getTransaction(order_id);
    if (!saved) {
      console.warn(`⚠️ Transaksi tidak ditemukan di memori: ${order_id}`);
      return res.status(400).json({ message: "Transaksi tidak ditemukan" });
    }

    const { username, rank } = saved;
    const group = rankList[rank]?.group;

    if (!group) {
      return res.status(400).json({ message: "Rank tidak dikenali" });
    }

    if (
      (transaction_status === 'capture' && fraud_status === 'accept') ||
      transaction_status === 'settlement'
    ) {
      console.log(`Pembayaran SUKSES untuk ${username} (Rank: ${rank})`);
      await setRank(username, group);
      console.log(`✅ Rank ${group} berhasil diberikan ke ${username}`);
    } else {
      console.log(`❗ Pembayaran belum sukses. Status: ${transaction_status}`);
    }

    res.status(200).json({ message: "Webhook diproses" });
  } catch (error) {
    console.error("❌ Error webhook:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
