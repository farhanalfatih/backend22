const { Rcon } = require('rcon-client');

let rconInstance = null;

async function connectRcon() {
  if (rconInstance) return rconInstance;

  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log("🔌 Connecting to RCON...");
    }

    rconInstance = await Rcon.connect({
      host: '156.67.214.127',
      port: 25575,
      password: 'ShadowMoon99281',
      timeout: 5000,
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log("✅ RCON Connected");
    }

    return rconInstance;
  } catch (err) {
    console.error("❌ Failed to connect to RCON:", err);
    throw err;
  }
}

async function setRank(username, group) {
  try {
    const rcon = await connectRcon();

    const isBedrock = username.startsWith('.');
    const finalUsername = isBedrock ? username : username;

    const command = `lp user ${finalUsername} parent set ${group}`;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`💬 Sending RCON command: ${command}`);
    }

    await rcon.send(command);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ Rank ${group} berhasil diberikan ke ${username}`);
    }
  } catch (err) {
    console.error("❌ Gagal kirim command RCON:", err);
  }
}

module.exports = { setRank };
