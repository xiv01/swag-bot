const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./cfg.json');

const { judgeMusic } = require('./events/presenceUpdate/judgeMusic.js');
const { handleInteraction } = require('./events/interactionCreate/handleInteraction.js');
const { selfRoles } = require('./events/messageReaction/selfRoles.js');
const { registerCommands } = require('./events/clientReady/registerCommands.js');
const { addJoinRole } = require('./events/guildMemberAdd/addJoinRole.js');
const { checkBlacklist } = require('./events/messageCreate/checkBlacklist.js');
const { sendWelcomeMessage } = require('./events/guildMemberAdd/sendWelcomeMessage.js');

const bot = new Client({ intents: 
    [ GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildModeration, 
    GatewayIntentBits.GuildMessageReactions, 
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences
    ],
    partials: 
    [
    Partials.Message, 
    Partials.Channel, 
    Partials.Reaction,
    Partials.GuildMember
    ], 
})

bot.once(Events.ClientReady, readyClient => {
	console.log(`started ${readyClient.user.tag}`);
    registerCommands(bot);
})

bot.on(Events.GuildMemberAdd, async member => {
    addJoinRole(member);
    sendWelcomeMessage(member);
})

bot.on(Events.MessageCreate, async message => {
    checkBlacklist(message);
})

bot.on(Events.PresenceUpdate, async (oldPresence, newPresence) => {
    judgeMusic(newPresence);
})

bot.on(Events.MessageReactionAdd, async (reaction, user) => {
    selfRoles(reaction, user, false);
})

bot.on(Events.MessageReactionRemove, async (reaction, user) => {
    selfRoles(reaction, user, true);
})

bot.on(Events.InteractionCreate, async interaction => {
    handleInteraction(bot, interaction);
})

bot.login(token);