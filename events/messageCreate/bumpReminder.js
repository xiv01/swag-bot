const color = require('../../colors.json');
const { EmbedBuilder } = require('discord.js');
const { log } = require("../../util/util");
module.exports = { bumpReminder };

const reminderEmbed = new EmbedBuilder()
    .setColor(color.default)
    .setTitle(`BUMP REMINDER`)
    .setDescription(`BUMP FAST !!!!`)

async function bumpReminder(bot, message) {
    if(!message.author.bot) return;
    if(message.embeds.length > 0) {
        if(message.embeds[0].description != null) {
            if((message.embeds[0].description.includes("Bump erfolgreich!") || message.embeds[0].description.includes("Bump done!"))) {

                await log(bot, {
                    title: "🔔 bump reminder",
                    message: `server bumped\n**timestamp**: \`${Math.floor(new Date().getTime() / 1000)}\``,
                })

                const bumperRole = message.guild.roles.cache.find(role => role.name.includes("bumper"));
                setTimeout(() => {
                    message.channel.send({ content: `${bumperRole}`, embeds: [reminderEmbed] });}, 5000);
            }
        }
    }
}