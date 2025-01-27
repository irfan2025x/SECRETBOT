module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt"],
    version: "6.1",
    author: "Irfan Ahmed",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Check bot uptime, stats, and more."
    },
    longDescription: {
      en: "Displays bot uptime, system stats, memory usage, CPU load, total users, total groups, and additional details."
    },
    category: "Utility",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event, botData = {} }) {
    const os = require("os");
    const { execSync } = require("child_process");

    const formatBytes = (bytes) => {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes === 0) return "0 Bytes";
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    };

    const botUptimeInMilliseconds = process.uptime() * 1000;
    const botUptime = formatDuration(botUptimeInMilliseconds);

    const systemUptimeInMilliseconds = os.uptime() * 1000;
    const systemUptime = formatDuration(systemUptimeInMilliseconds);

    const usedMemory = os.totalmem() - os.freemem();
    const totalMemory = os.totalmem();
    const botMemoryUsage = process.memoryUsage().heapUsed;

    const cpuLoad = os.loadavg();
    const cpuCores = os.cpus().length;
    const cpuSpeed = os.cpus()[0].speed;

    let diskUsage = "N/A";
    try {
      const diskInfo = execSync("df -h --total | grep total").toString();
      const diskDetails = diskInfo.trim().split(/\s+/);
      diskUsage = `Used: ${diskDetails[2]}, Free: ${diskDetails[3]}, Total: ${diskDetails[1]}`;
    } catch (err) {
      diskUsage = "Disk info unavailable.";
    }

    const osType = os.type();
    const osPlatform = os.platform();
    const osArch = os.arch();

    const nodeVersion = process.version;

    const restartTime = new Date(Date.now() - botUptimeInMilliseconds).toLocaleString();

    // Total users and groups
    const totalUsers = botData?.totalUsers || 0; // Default to 0 if undefined
    const totalGroups = botData?.totalGroups || 0; // Default to 0 if undefined

    const message = `
━━━━━━━ 🤖 **BOT STATS** ━━━━━━━
⏱ **Bot Uptime:** ${botUptime}
💻 **System Uptime:** ${systemUptime}

📊 **Memory Usage**
   - **Total Memory:** ${formatBytes(totalMemory)}
   - **Used Memory:** ${formatBytes(usedMemory)}
   - **Bot Memory:** ${formatBytes(botMemoryUsage)}

🖥 **CPU Stats**
   - **Cores:** ${cpuCores}
   - **Avg Speed:** ${cpuSpeed} MHz
   - **Load (1m|5m|15m):** ${cpuLoad.map((load) => load.toFixed(2)).join(" | ")}

💾 **Disk Usage**
   - ${diskUsage}

👥 **Bot Data**
   - **Total Users:** ${totalUsers}
   - **Total Groups:** ${totalGroups}

🛠 **System Info**
   - **OS:** ${osType} (${osPlatform}, ${osArch})
   - **Node.js Version:** ${nodeVersion}

🔄 **Last Restart Time**
   - ${restartTime}
━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    return api.sendMessage(message, event.threadID, event.messageID);
  }
};

function formatDuration(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 7);
  const weeks = Math.floor(ms / (1000 * 60 * 60 * 24 * 7));

  let duration = "";
  if (weeks > 0) duration += `${weeks}w `;
  if (days > 0) duration += `${days}d `;
  if (hours > 0) duration += `${hours}h `;
  if (minutes > 0) duration += `${minutes}m `;
  if (seconds > 0) duration += `${seconds}s`;

  return duration.trim();
}
