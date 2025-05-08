// /rcon/mockRconClient.js
async function connectRcon() {
    console.log("🧪 [MOCK] Pretending to connect to RCON...");
    return {
      send: async (cmd) => {
        console.log(`🧪 [MOCK] Pretending to send command: ${cmd}`);
        return "OK";
      }
    };
  }
  
  async function setRank(username, group) {
    try {
      const rcon = await connectRcon();
      const command = `lp user ${username} parent set ${group}`;
      console.log(`💬 [MOCK] Sending command: ${command}`);
      await rcon.send(command);
      console.log(`✅ [MOCK] Rank ${group} diberikan ke ${username}`);
    } catch (err) {
      console.error("❌ [MOCK] Gagal kirim command RCON:", err);
    }
  }
  
  module.exports = { setRank };
  