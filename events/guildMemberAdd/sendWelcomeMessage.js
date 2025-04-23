const { EmbedBuilder } = require('discord.js');
const { CHANNEL_WELCOME } = require('../../cfg.json');
const { getChannelById } = require('../../util/util.js');
module.exports = { sendWelcomeMessage };

async function sendWelcomeMessage(bot, member) {
    const welcomeChannel = bot.cfgChannels.find(channel => channel.welcome)?.welcome;
    const welcomeEmbed = new EmbedBuilder()
        .setColor('f60051')
        .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true })})
        .setTitle('💸 **WELCOME TO SWAG IMPERIUM** 💸')
        .setDescription('LIES DIE REGELN 🔥🔥‼️‼️‼️‼️🙏🙏🙏')
        .setImage('https://cdn.discordapp.com/attachments/961985895811133520/1316813735750275162/image.png?ex=675c69db&is=675b185b&hm=4da7dac47c7aa78243e292faa8f534b9253e2f189cb9bb3d7711c9fec4616ed7&')

    await welcomeChannel.send({ embeds: [welcomeEmbed] });
}