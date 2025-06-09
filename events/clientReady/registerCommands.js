const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Collection, Routes } = require('discord.js');
const { token, clientID } = require('../../cfg.json');
const { log } = require("../../util/util");

module.exports = { registerCommands };

function registerCommands(bot) {
    const rest = new REST({ version: '10' }).setToken(token);
    bot.commands = new Collection();
    const reqBody = [];
    const commandsPath = path.join(__dirname,'../../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
    	const filePath = path.join(commandsPath, file);
    	const command = require(filePath);
    	reqBody.push(command.data.toJSON());
        bot.commands.set(command.data.name, command);
    }

    rest.put(Routes.applicationCommands(clientID), { body: reqBody })
    	.then(async() => {
            await log(bot, {
                title: "registered commands",
                message: "DONE !!!",
            })
            console.log('registered commands')
        })
    	.catch(console.error);
}
