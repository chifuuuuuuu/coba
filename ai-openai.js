import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🚩 Input query`;
  
  conn.sendMessage(m.chat, {
    react: {
      text: '⏱️',
      key: m.key,
    }
  });
  
  let umanzx = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: "status@broadcast" } : {})
    },
    message: {
      "liveLocationMessage": {
        "title": "C H A T - A I",
        "h": "C H A T - A I",
        'jpegThumbnail': fs.readFileSync('./src/thumbnail.png')
      }
    }
  };
  
  try {
    let shiro = await (await fetch(`https://itzpire.site/ai/gpt-web?q=${text}`)).json(); // Thanks For Miftah
    
    await conn.sendMessage(m.chat, {
      text: `${shiro.result}`,
      contextInfo: {
        externalAdReply: {
          title: "O P E N A I",
          thumbnailUrl: "https://telegra.ph/file/0d444923219cf5fe1733e.jpg", //kalau mau di add thumbnail gpp
          sourceUrl: `https://whatsapp.com/channel/0029VaRI1OB2P59cTdJKZh3q`,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: umanzx });
    
    conn.sendMessage(m.chat, {
      react: {
        text: '✅',
        key: m.key,
      }
    });
  } catch(e) {
    throw "🚩 Error fetching API";
  }
};

handler.help = ["ai <text>"];
handler.tags = ["ai"];
handler.limit = true;
handler.command = ["ai", "gpt", "openai"];

export default handler;