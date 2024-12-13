const { BLACKLIST } = require('../../cfg.json');
const color = require('../../colors.json');
const { EmbedBuilder } = require('discord.js');
module.exports = { checkBlacklist };

async function checkBlacklist(message) {
    if(message.author.bot) return;
    var content = message.content.toLowerCase();
    if(typeof content == 'undefined') return;

    for(badword of BLACKLIST) {
        if(content.includes(badword)) {
            await message.delete();
            const badwordsEmbed = new EmbedBuilder()
                .setColor(color.warning)
                .setTitle('❗ **bad words deleted**')
                .setDescription(message.author.globalName + ` said a bad word >:(`)

            await message.channel.send({ embeds: [badwordsEmbed] });
        }
    }
}