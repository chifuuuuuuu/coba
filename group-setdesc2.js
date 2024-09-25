let handler = async (m, { text }) => {
	if (!text) throw "the text?";

	await conn.groupUpdateDescription(m.chat, text);
	return m.reply("Succeed.");
};

handler.help = ["setdesc2", "sdesc2"];
handler.tags = ["group"];
handler.command = /^(setdesc2|sdesc2)$/i;

handler.group = true;
handler.admin = true;

export default handler;
