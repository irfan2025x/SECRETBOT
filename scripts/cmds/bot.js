const axios = require("axios");
const m = require("moment-timezone");

let userMemory = {};  // In-memory storage for user queries and responses

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

  onStart: async function () {},

  onChat: async function ({ api, args, event }) {
    const body = event.body.trim().toLowerCase();
    const Time = m.tz("Asia/Dhaka");
    const time = Time.format("MMMM D, YYYY h:mm A");

    const senderID = event.senderID;
    const threadID = event.threadID;

    // Check if the message starts with "bot"
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
        // Log the query before making the API call
        console.log("Query sent to API:", query);

        // Make API call with the query
        const response = await axios.get(
          `https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(query)}&uid=1&webSearch=off`
        );
        
        // Log the response from the API
        console.log("API Response:", response.data);

        // Get the actual content from the response
        const content = response.data.response; // Corrected response path

        // Save the user's query and the response in memory
        userMemory[senderID] = {
          query: query,
          response: content
        };

        // Send the response back to the user
        return api.sendMessage(
          `${content}`,
          threadID,
          event.messageID
        );
      } catch (error) {
        console.error("API Call Error:", error.message);
        
        // Send an error message if something goes wrong
        return api.sendMessage(
          "❌ কিছু একটা সমস্যা হয়েছে, পরে চেষ্টা করো।",
          threadID,
          event.messageID
        );
      }
    } else {
      // If the message is a reply to bot's response
      if (event.messageReply && userMemory[senderID]) {
        const previousResponse = userMemory[senderID].response;
        if (previousResponse) {
          // Reply to the previous response with new answer
          try {
            const response = await axios.get(
              `https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(body)}&uid=1&webSearch=off`
            );
            const content = response.data.response;
            api.sendMessage(
              `${content}`,
              threadID,
              event.messageID
            );
          } catch (error) {
            console.error("API Call Error:", error.message);
            api.sendMessage(
              "❌ কিছু একটা সমস্যা হয়েছে, পরে চেষ্টা করো।",
              threadID,
              event.messageID
            );
          }
        }
      }
    }
  },
};
