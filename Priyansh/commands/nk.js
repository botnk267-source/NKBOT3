const axios = require("axios");

module.exports.config = {
  name: "Nk",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "Aman Khan",
  description: "Google Gemini Flash 2.0 AI (No Prefix)",
  commandCategory: "ai",
  usages: "flash [question]",
  cooldowns: 5
};

// Auther AK https://www.facebook.com/AK47xk
module.exports.handleEvent = async function ({ api, event }) {
  try {
    const body = event.body ? event.body.trim() : "";
    if (!body) return;

  
    if (body.toLowerCase().startsWith("flash")) {
      const question = body.slice(5).trim(); // remove "flash"
      if (!question) {
        return api.sendMessage("❌ Kuch puchna to likho!", event.threadID, event.messageID);
      }

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [{ parts: [{ text: question }] }]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": "AIzaSyB933fzq-mL0Lj7HrG0K55UgnePNYkJBsk"
          }
        }
      );

      let answer = "❌ Flash se koi reply nahi mila.";
      if (response.data?.candidates?.[0]?.content?.parts) {
        answer = response.data.candidates[0].content.parts
          .map(p => p.text || "")
          .join("\n");
      }

      return api.sendMessage(
        `⚡ Flash 2.0:\n\n${answer}\n\n— 🌺 𝗢𝗪𝗡𝗘𝗥 👑➪🦋⃟⃟ ⍣⃝ 𝑵𝑲➺𝑬𝑫𝑰𝑻𝑶𝑹༆𓆪⃟⍨⃝🖤  🤖`,
        event.threadID,
        event.messageID
      );
    }
  } catch (error) {
    console.error("Flash error:", error.response?.data || error.message);
    api.sendMessage("❌ Flash error!", event.threadID, event.messageID);
  }
};

// normal run ko empty rakho, taaki prefix wale se na chale
module.exports.run = () => {};
