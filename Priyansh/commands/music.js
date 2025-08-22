const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ytSearch = require("yt-search");

module.exports = {
  config: {
    name: "music",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Download YouTube song from keyword search and link",
    commandCategory: "Media",
    usages: "[songName] [type]",
    cooldowns: 5,
    dependencies: {
      "node-fetch": "",
      "yt-search": "",
    },
  },

  run: async function ({ api, event, args }) {
    let songName, type;

    if (
      args.length > 1 &&
      (args[args.length - 1] === "audio" || args[args.length - 1] === "video")
    ) {
      type = args.pop();
      songName = args.join(" ");
    } else {
      songName = args.join(" ");
      type = "audio";
    }

    const processingMessage = await api.sendMessage(
      "╔════════════════════╗\n\n  🎶 𝑴𝑼𝑺𝑰𝑪 𝑷𝑳𝑨𝒀𝑬𝑹 🎶\n\n╚════════════════════╝\n\n🚩 जय श्री राम 🚩  \n\n✨ 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑻𝒐 𝑵𝑲 𝑴𝒖𝒔𝒊𝒄 𝑩𝒐𝒕 ✨\n\n━━━━━━━━━━━━━━━━━━━\n\n⏳ 𝑷𝒍𝒆𝒂𝒔𝒆 𝑾𝒂𝒊𝒕 𝑫𝒆𝒂𝒓 𝑼𝒔𝒆𝒓...  \n\n🔍 𝑺𝒆𝒂𝒓𝒄𝒉𝒊𝒏𝒈 𝒀𝒐𝒖𝒓 𝑭𝒂𝒗𝒐𝒖𝒓𝒊𝒕𝒆 𝑺𝒐𝒏𝒈 🎼  \n\n🎵 𝑮𝒆𝒕 𝑹𝒆𝒂𝒅𝒚 𝑭𝒐𝒓 𝑩𝒆𝒔𝒕 𝑴𝒖𝒔𝒊𝒄 𝑬𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆 💫\n\n━━━━━━━━━━━━━━━━━━━\n\n💠 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 ➤ 👑 𝑵𝑲 𝑬𝑫𝑰𝑻𝑶𝑹 👑\n\n🔥 𝑻𝒉𝒆 𝑲𝒊𝒏𝒈 𝑶𝒇 𝑩𝒐𝒕𝒔 🔥`,",
      event.threadID,
      null,
      event.messageID
    );

    try {
      const searchResults = await ytSearch(songName);
      if (!searchResults || !searchResults.videos.length) {
        throw new Error("No results found for your search query.");
      }

      const topResult = searchResults.videos[0];
      const videoId = topResult.videoId;

      const apiKey = "priyansh-here";
      const apiUrl = `https://priyanshuapi.xyz/youtube?id=${videoId}&type=${type}&apikey=${apiKey}`;

      api.setMessageReaction("⌛", event.messageID, () => {}, true);

      const downloadResponse = await axios.get(apiUrl);
      const downloadUrl = downloadResponse.data.downloadUrl;

      const safeTitle = topResult.title.replace(/[^a-zA-Z0-9 \-_]/g, "");
      const filename = `${safeTitle}.${type === "audio" ? "mp3" : "mp4"}`;
      const downloadPath = path.join(__dirname, "cache", filename);

      if (!fs.existsSync(path.dirname(downloadPath))) {
        fs.mkdirSync(path.dirname(downloadPath), { recursive: true });
      }

      const response = await axios({
        url: downloadUrl,
        method: "GET",
        responseType: "stream",
      });

      const fileStream = fs.createWriteStream(downloadPath);
      response.data.pipe(fileStream);

      await new Promise((resolve, reject) => {
        fileStream.on("finish", resolve);
        fileStream.on("error", reject);
      });

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      await api.sendMessage(
        {
          attachment: fs.createReadStream(downloadPath),
          body: `🖤 Title: ${topResult.title}\n\n Here is your ${
            type === "audio" ? "audio" : "video"
          } 🎧:`,
        },
        event.threadID,
        () => {
          fs.unlinkSync(downloadPath);
          api.unsendMessage(processingMessage.messageID);
        },
        event.messageID
      );
    } catch (error) {
      console.error(`Failed to download and send song: ${error.message}`);
      api.sendMessage(
        `Failed to download song: ${error.message}`,
        event.threadID,
        event.messageID
      );
    }
  },
};
