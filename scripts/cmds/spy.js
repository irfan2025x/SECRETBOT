module.exports = {
  config: {
    name: "spy",
    version: "2.2",
    author: "Shikaki",
    countDown: 60,
    role: 0,
    shortDescription: "Get detailed user information and avatar",
    longDescription: "Retrieve and display detailed information about a user, including avatar, profile URL, and other attributes",
    category: "information",
  },

  onStart: async function ({ event, message, usersData, api, args }) {
    let uid;
    const uid1 = event.senderID; // Current user
    const uid2 = Object.keys(event.mentions)[0]; // Mentioned user, if any

    // Detect UID based on arguments or default fallback
    if (args[0]) {
      // Numeric UID check
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        // Profile link check
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) uid = match[1];
      }
    }
    if (!uid) {
      uid = event.type === "message_reply" ? event.messageReply.senderID : uid2 || uid1;
    }

    // Fetch user information
    api.getUserInfo(uid, async (err, userInfo) => {
      if (err) {
        return message.reply("❌ Failed to retrieve user information.");
      }

      // User information mapping
      const user = userInfo[uid];
      const avatarUrl = await usersData.getAvatarUrl(uid);

      // Gender mapping
      let genderText;
      switch (user.gender) {
        case 1:
          genderText = "Girl";
          break;
        case 2:
          genderText = "Boy";
          break;
        default:
          genderText = "Unknown";
      }

      // User status mapping
      const isFriend = user.isFriend ? "Yes" : "No";
      const isBirthday = user.isBirthday ? "Yes" : "No";
      const type = user.type ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : "Unknown";

      // Additional fields (if available)
      const username = user.username ? user.username : "Not Set";
      const profileUrl = user.profileUrl ? user.profileUrl : "Not Available";
      const vanity = user.vanity ? user.vanity : "Not Set";
      const friendCount = user.friendCount || "Unknown";
      const birthday = user.birthday || "Not Provided";

      // If Account Creation Date is available from API
      const accountCreateDate = user.accountCreateDate
        ? new Date(user.accountCreateDate * 1000).toLocaleDateString("en-US")
        : "Not Available";

      // Formatting the user information
      const userInformation = `
🎭 ❏ **Name:** ${user.name || "Unknown"}
🔗 ❏ **Profile URL:** ${profileUrl}
🏷️ ❏ **Username:** ${username}
💡 ❏ **Vanity:** ${vanity}
🔵 ❏ **Gender:** ${genderText}
👤 ❏ **User Type:** ${type}
🤝 ❏ **Is Friend:** ${isFriend}
🎂 ❏ **Birthday Today:** ${isBirthday}
📅 ❏ **Date of Birth:** ${birthday}
📊 ❏ **Friends Count:** ${friendCount}
🗓️ ❏ **Account Created On:** ${accountCreateDate}
🔒 ❏ **Is Blocked:** ${user.isBlocked ? "Yes" : "No"}
📱 ❏ **Devices:** ${user.devices ? user.devices.join(", ") : "Unknown"}
📍 ❏ **Last Active:** ${
        user.lastActive
          ? `${user.lastActive.time || "Unknown"} (via ${
              user.lastActive.device || "Unknown"
            })`
          : "Not Available"
      }
      `;

      // Sending the information with avatar
      message.reply({
        body: userInformation.trim(),
        attachment: await global.utils.getStreamFromURL(avatarUrl),
      });
    });
  },
};
