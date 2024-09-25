export async function before(m, {
    conn,
    participants
}) {
    // Inisialisasi state jika belum ada
    if (!conn.time_join) {
        conn.time_join = {
            join: false,
            time: 0,
        };
    }

    const currentTime = Math.floor(Date.now() / 1000);

    // Cek apakah pesan berasal dari grup dan apakah sudah memenuhi cooldown
    if (!m.isGroup || conn.time_join.time > currentTime) {
        console.log("Not a group message or still in cooldown");
        return;
    }

    // Cek apakah pengirim adalah user premium
    const isOwners = global.db.data.users[m.sender]?.owner;

    let messageText = "";
    let mentionedUsers = participants.map((u) => u.id).filter((v) => v !== conn.user.jid);
    let parti = await conn.groupMetadata(m.chat)
    let rendem = parti.participants.getRandom()
    // Logika sambutan berdasarkan nomor pengirim
    switch (m.sender) {
        case "6289667644225@s.whatsapp.net":
        
            messageText = '*Halo Sayangku Cintaku Inz\nDarimana Aja nih Aku Kangen Lho❤";
            break 
        default:
            if (isOwners) {
                messageText = "Selamat datang, Owner ku !";
            }
            break;
    }

    // Kirim pesan jika ada teks sambutan yang harus dikirim
    if (messageText) {
        await conn.sendMessage(
            m.chat, {
                text: messageText,
            }, {
                quoted: m,
                mentions: mentionedUsers,
            }
        );

        // Atur ulang state time_join untuk cooldown
        conn.time_join = {
            join: true,
            time: currentTime + 600, // Cooldown 2 detik
        };
    } else {
        console.log("No message to send");
    }
}