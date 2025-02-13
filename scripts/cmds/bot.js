const axios = require("axios");
const m = require("moment-timezone");

module.exports = {
  config: {
    name: "bot",
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 5,
    role: 0,
    shortDescription: "Bot AI Response",
    category: "chat",
    guide: {
      en: "{p}{n} bot [message]",
    },
  },

  onStart: async function () {
    this.lastMessageID = null;  // To track the last bot message ID
  },

  onChat: async function ({ api, args, event }) {
    const body = event.body.trim().toLowerCase();
    const Time = m.tz("Asia/Dhaka");
    const time = Time.format("MMMM D, YYYY h:mm A");

    // If the message starts with "bot"
    if (body.startsWith("bot")) {
      const query = body.slice(3).trim(); // Remove "bot" from the message to get the query
      if (!query) {
        return api.sendMessage(
          `কিরে কি কবি তারাতাড়ি ক 😒`, // Custom response when no query is provided
          event.threadID,
          event.messageID
        );
      }

      try {
        // Make API call with the query
        const response = await axios.get(
          `https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(query)}&uid=1&webSearch=off`
        );
        const content = response.data.response; // Corrected response path

        // Send the response
        const sentMessage = await api.sendMessage(
          `${content}`,
          event.threadID,
          event.messageID
        );

        // Store the message ID of the bot's last response
        this.lastMessageID = sentMessage.messageID;

      } catch (error) {
        console.error(`Failed to get an answer: ${error.message}`);
        return api.sendMessage(
          "❌ কিছু একটা সমস্যা হয়েছে, পরে চেষ্টা করো।",
          event.threadID,
          event.messageID
        );
      }
    } else {
      // If the message is a reply to the last bot message
      if (event.messageReply && event.messageReply.messageID === this.lastMessageID) {
        const query = body.trim();
        try {
          const response = await axios.get(
            `https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(query)}&uid=1&webSearch=off`
          );
          const content = response.data.response;

          // Send the new response
          return api.sendMessage(
            `${content}`,
            event.threadID,
            event.messageID
          );
        } catch (error) {
          console.error(`Failed to get an answer: ${error.message}`);
          return api.sendMessage(
            "❌ কিছু একটা সমস্যা হয়েছে, পরে চেষ্টা করো।",
            event.threadID,
            event.messageID
          );
        }
      }
    }
  },
};
