module.exports = { handleInteraction };

async function handleInteraction(bot, interaction) {
    if(interaction.isChatInputCommand()) {
        const command = bot.commands.get(interaction.commandName);
        if(!command) return;
        try {
            console.log('command ' + interaction.commandName + ' used')
            await command.execute(interaction, bot);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'there was an error while executing this command :(', ephemeral: true });
        }
    }
}