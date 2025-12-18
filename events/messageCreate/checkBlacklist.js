const { BLACKLIST } = require('../../cfg.json');
const color = require('../../colors.json');
const { EmbedBuilder } = require('discord.js');
const {log} = require("../../util/util");
module.exports = { checkBlacklist };

async function checkBlacklist(bot, message) {
    if(message.author.bot) return;
    let content = message.content.toLowerCase();
    if(typeof content == 'undefined') return;

    for(badword of BLACKLIST) {
        if(content.includes(badword)) {
            await message.delete();

            await log(bot, {
                channel: 'systemlogs',
                title: '❗ bad word deleted',
                message: `>>> **member**: <@${message.author.id}>\n**message**: ${message.content}\n**channel**: <#${message.channel.id}>`,
                color: color.warning,
                member: message.member
            });

            const badwordsEmbed = new EmbedBuilder()
                .setColor(color.warning)
                .setTitle('❗ **bad words deleted**')
                .setDescription(message.author.globalName + ` said a bad word >:(`)

            let warning = await message.channel.send({ embeds: [badwordsEmbed] });
            setTimeout(() => warning.delete().catch(), 8000);
        }
    }
}