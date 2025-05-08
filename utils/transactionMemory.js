// const fs = require('fs');
// const path = './transactions.json';

// // Menyimpan transaksi ke file
// function saveTransaction(orderId, username, rank) {
//   let db = {};
//   if (fs.existsSync(path)) {
//     db = JSON.parse(fs.readFileSync(path));
//   }
//   db[orderId] = { username, rank };
//   fs.writeFileSync(path, JSON.stringify(db, null, 2));
// }

// // Mengambil transaksi dari file
// function getTransaction(orderId) {
//   if (!fs.existsSync(path)) return null;
//   const db = JSON.parse(fs.readFileSync(path));
//   return db[orderId];
// }

// module.exports = {
//   saveTransaction,
//   getTransaction,
// };



const transactions = {};

function saveTransaction(orderId, username, rank) {
  transactions[orderId] = { username, rank };
}

function getTransaction(orderId) {
  return transactions[orderId];
}

module.exports = {
  saveTransaction,
  getTransaction,
};
