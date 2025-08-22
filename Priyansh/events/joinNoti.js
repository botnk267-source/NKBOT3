module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
    description: "Notification of bots or people entering groups with random gif/photo/video",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};
 
module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
 
    const path = join(__dirname, "cache", "joinvideo");
    if (existsSync(path)) mkdirSync(path, { recursive: true }); 
 
    const path2 = join(__dirname, "cache", "joinvideo", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });
 
    return;
}
 
 
module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("", event.threadID, () => api.sendMessage({body: `𝗛𝗘𝗟𝗟𝗢 𝗗𝗢𝗦𝗧𝗢 𝗠𝗘 𝗔𝗔 𝗚𝗬𝗔 【𝗡𝗞 𝗕𝗢𝗧】
𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗞𝗥𝗢 𝗠𝗘𝗥𝗥𝗔𝗔 𝗢𝗥 𝗠𝗘𝗥𝗘 𝗕𝗢𝗦𝗦
𝗞𝗢 𝗥𝗘𝗤𝗨𝗦𝗧 𝗦𝗘𝗡𝗗 𝗞𝗥𝗢 
\n\n🌹💚✨═════••●●═════🌸🌺\n\n
         ╔═.✵.════ 🌺═══════╗
         👉 𝗛𝗘𝗟𝗣 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞👈
         ╚═══════ 🌺════.✵.═╝
 𝗙𝗕 𝗟𝗜𝗡𝗞:☞ https://www.facebook.com/profile.php?id=61577417285926
 
𝗜𝗡𝗦𝗧𝗔 𝗟𝗜𝗡𝗞:☞ https://www.instagram.com/nk_lovely_143_1?igsh=OXY4eDBsbzEzMnVr

𝗛𝗘𝗟𝗣𝗜𝗡𝗚 𝗭𝗢𝗡𝗘 : ☞ https://chat.whatsapp.com/JXr5wXNRpTy2883NqBXIsC
\n\n🌹💚✨═════••●●═════🌸🌺\n\n
𝑻𝒀𝑷 .𝑯𝑬𝑳𝑷 𝑺𝑬𝑬 𝑨𝑳𝑳 𝑪𝑶𝑴𝑴𝑨𝑫
𝑻𝒀𝑷 𝑰𝑵𝑭𝑶 𝑨𝑵𝑫 𝑶𝑾𝑵𝑬𝑬 𝑨𝑫𝑴𝑰𝑵 
𝑷𝑹𝑬𝑭𝑰𝑿 ☞ . ☜
\n\n🌹💚✨═════••●●═════🌸🌺\n\n

𝗽𝗿𝗲𝗳𝗶𝘅 => 👉 .{global.config.PREFIX} 👈

\n\n🌹💚✨═════••●●═════🌸🌺\n\n

𝑊𝑂𝑅𝑁𝐼𝐺:👇👇

𝑩𝑶𝑻 𝑲𝑶 𝑲𝑶𝑰 𝑮𝑨𝑳𝑰 𝑵𝑯𝑰 𝑫𝑬𝑮𝑨 
𝑵𝑨 𝑶𝑾𝑵𝑬𝑬 𝑲𝑶 𝑼𝑳𝑻𝑨 𝑺𝑰𝑫𝑯𝑨 𝑩𝑶𝑳𝑬𝑮𝑨 𝑨𝑮𝑨𝑹 𝑨𝑰𝑺𝑨 𝑯𝑼𝑨  𝑻𝑶. 𝑩𝑶𝑻 𝑲𝑨 𝑺𝑨𝑹𝑾𝑨𝑹 𝑶𝑵 𝑯𝑶 𝑱𝑨𝒀𝑮𝑨  𝑫𝑯𝑨𝑵𝒀𝑾𝑨𝑫 💜👈
`, attachment: fs.createReadStream(__dirname + "/cache/botjoin.mp4")} ,threadID));
    }
    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
 
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinvideo");
            const pathGif = join(path, `${threadID}.video`);
 
            var mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);
            
            (typeof threadData.customJoin == "undefined") ? msg = "╔═━━━━✦🖤✦━━━━═╗  \n\n   🌺          𝑵𝑲 𝑩𝑶𝑻            🌺 \n\n ╚═━━━━✦🖤✦━━━━═╝ \n\n🌹💚✨═════••●●═════🌸🌺\n\n ┏━━━━━✦❘༻༺❘✦━━━━━┓\n\n 🚩        𝑹𝒂𝒎 𝑹𝒂𝒎 𝑱𝒊              🚩\n\n ┗━━━━━✦❘༻༺❘✦━━━━━┛ \n\n🌹💚✨═════••●●═════🌸🌺\n\n ┏━━━━━✦❘༻༺❘✦━━━━━┓  \n\n 🌸             {name}                 🌸 \n\n┗━━━━━✦❘༻༺❘✦━━━━━┛  \n\n🌸 Swagat hai aapka hamare group me 🌸 \n\n ⚡ Yaha sab apna hai, bas respect banaye rakho ⚡  \n\n🥳 Enjoy & Stay Connected With Us 🥳 \n\n🌹💚✨═════••●●═════🌸🌺\n\n 𝗬𝗢𝗨 𝗔𝗥𝗘 𝗧𝗛𝗘 『 {soThanhVien} 』 𝗠𝗘𝗠𝗕𝗘𝗥 𝗢𝗙    〈✶ {threadName} ✶〉 𝗚𝗥𝗢𝗨𝗣 😇  \n\n🌹💚✨═════••●●═════🌸🌺\n\n 𝗜𝗙 𝗨𝗦𝗘 𝗠𝗘𝗦𝗦𝗘𝗡𝗚𝗘𝗥 𝗖𝗛𝗔𝗧𝗕𝗢𝗧😜𝑶𝑭 𝑼𝑺𝑬 𝑴𝑬𝑺𝑺𝑬𝑵𝑬𝑬 𝑪𝑯𝑨𝑻𝑩𝑶𝑻  ☆》ᗷOƬ 𝑷𝑹𝑬𝑭𝑰𝑿 👉.👈 𝑻𝒀𝑷 𝑯𝑬𝑳𝑷 𝑺𝑬𝑬 𝑨𝑳𝑳 𝑪𝑶𝑴𝑴𝑨𝑵𝑫 \n\n🌹💚🌺═════●●••═════✨💚🌹 \n\n 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 👑➪🦋⃟⃟ ⍣⃝ 𝑵𝑲➺𝑬𝑫𝑰𝑻𝑶𝑹༆𓆪⃟⍨⃝🖤. ;
            msg = msg
            .replace(/\{name}/g, nameArray.join(', '))
            .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
            .replace(/\{soThanhVien}/g, memLength.join(', '))
            .replace(/\{threadName}/g, threadName);
 
            if (existsSync(path)) mkdirSync(path, { recursive: true });
 
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));
 
            if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathvideo), mentions }
            else if (randomPath.length != 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
            }
            else formPush = { body: msg, mentions }
 
            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
              }
