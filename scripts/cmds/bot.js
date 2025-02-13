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

  onStart: async function () {},

  onChat: async function ({ api, args, event }) {
    const body = event.body.trim().toLowerCase();

    // Check if the message starts with "bot"
    if (body.startsWith("bot")) {
      const query = body.slice(3).trim(); // Remove "bot" from the message to get the query

      if (!query) {
        return api.sendMessage(
          `Please ask a valid question after saying 'bot'.`,
          event.threadID,
          event.messageID
        );
      }

      // Quick response while waiting for the API call
      api.sendMessage("Processing your request... Please wait a moment.", event.threadID);

      try {
        // Make API call with the query
        const response = await axios.get(
          `https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(query)}&uid=1&webSearch=off`
        );
        const content = response.data.response;

        // Format the response in a neat way (you can adjust this as needed)
        const formattedResponse = `
          Here's the answer to your question:
          
          🌟 **Answer:**
          ${content}
          
          🔍 **Details:** 
          Please feel free to ask more questions!
        `;

        // Send the formatted response
        return api.sendMessage(formattedResponse, event.threadID, event.messageID);
      } catch (error) {
        console.error(`Failed to get an answer: ${error.message}`);
        return api.sendMessage(
          "An error occurred while processing your request.",
          event.threadID,
          event.messageID
        );
      }
    }
  },
};
