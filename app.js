const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { setConfig, log } = require('./util/util.js');
const color = require('./colors.json');
const { token } = require('./cfg.json');

const { judgeMusic } = require('./events/presenceUpdate/judgeMusic.js');
const { handleInteraction } = require('./events/interactionCreate/handleInteraction.js');
const { selfRoles } = require('./events/messageReaction/selfRoles.js');
const { registerCommands } = require('./events/clientReady/registerCommands.js');
const { addJoinRole } = require('./events/guildMemberAdd/addJoinRole.js');
const { checkBlacklist } = require('./events/messageCreate/checkBlacklist.js');
const { sendWelcomeMessage } = require('./events/guildMemberAdd/sendWelcomeMessage.js');
const { trackInvite } = require('./events/guildMemberAdd/trackInvite.js');
const { logVoiceActivity } = require("./events/voiceStateUpdate/logVoiceActivity");
const { bumpReminder } = require("./events/messageCreate/bumpReminder");

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
});

bot.once(Events.ClientReady, async() => {
    await setConfig(bot);
    registerCommands(bot);
});

bot.on(Events.GuildMemberAdd, async member => {
    await addJoinRole(member);
    await sendWelcomeMessage(bot, member);
    await trackInvite(bot, member);
});

bot.on(Events.GuildMemberRemove, async member => {
    await log(bot, {
        channel: "member",
        title: "MEMBER LEFT !!!!",
        message: `<@${member.id}> left the server`,
        color: color.warning,
        member: member
    });
});

bot.on(Events.MessageCreate, async message => {
    await checkBlacklist(message);
    await bumpReminder(bot, message);
});

bot.on(Events.PresenceUpdate, async (oldPresence, newPresence) => {
    await judgeMusic(newPresence);
});

bot.on(Events.MessageReactionAdd, async (reaction, user) => {
    await selfRoles(bot, reaction, user, false);
});

bot.on(Events.MessageReactionRemove, async (reaction, user) => {
    await selfRoles(bot, reaction, user, true);
});

bot.on(Events.InteractionCreate, async interaction => {
    await handleInteraction(bot, interaction);
});

bot.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    await logVoiceActivity(bot, oldState, newState);
});

bot.login(token);