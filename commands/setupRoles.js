const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { selfroles } = require('../cfg.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setuproles')
		.setDescription('setup self roles in current channel')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		await interaction.deferReply();
		await interaction.deleteReply();

		for(let i = 0; i < selfroles.length; i++) {
			let description = selfroles[i].description + '\n';
			for(let j = 0; j < selfroles[i].roles.length; j++) {
				let role = await interaction.guild.roles.cache.find(r => r.name === selfroles[i].roles[j][1])
				description += '\n' + selfroles[i].roles[j][0] + ` ⇢ ${role}\n`; 
			}
			let embed = new EmbedBuilder()
    			.setColor(selfroles[i].color)
    			.setTitle(selfroles[i].title)
    			.setDescription(description)

			let message = await interaction.channel.send({ embeds: [embed] });
			for(let j = 0; j < selfroles[i].roles.length; j++) await message.react(selfroles[i].roles[j][0]);
		}
	},
};