const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('displays server info'),
	async execute(interaction) {
        const serverInfoEmbed = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} info`)
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(`\n**members**: \`${interaction.guild.memberCount}\` \n **created**: \`${interaction.guild.createdAt.toString().slice(0, -40)}\`\n`)
            .setTimestamp()
            .setFooter({ text: 'developed by 03max', iconURL: 'https://cdn.discordapp.com/avatars/709098824253177859/4b00003de1780fcf41b50c2b41249811.webp?size=32' });
        
        await interaction.reply({ embeds: [serverInfoEmbed] });
	},
}