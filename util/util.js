const { EmbedBuilder, Collection } = require('discord.js');
module.exports = { getChannelById, getRoleById, getRoleByName, getChannelByName, setConfig, log }

async function getChannelById(guild, channelId) {
    let channel = guild.channels.cache.get(channelId);

    if (!channel) {
        try {
            channel = await guild.channels.fetch(channelId);
        } catch (error) {
            console.error(`error fetching channel: ${error}`);
        }
    }

    return channel;
}

async function getRoleById(guild, roleId) {
    let role = guild.roles.cache.get(roleId);

    if (!role) {
        try {
            role = await guild.roles.fetch(roleId);
        } catch (error) {
            console.error(`error fetching role: ${error}`);
        }
    }

    return role;
}

async function getRoleByName(guild, roleName) {
    let role = guild.roles.cache.find(role => role.name === roleName);

    if (!role) {
        try {
            const roles = await guild.roles.fetch();
            role = roles.find(role => role.name === roleName);
        } catch (error) {
            console.error(`error fetching roles: ${error}`);
        }
    }

    return role;
}

async function getChannelByName(guild, channelName) {
    let channel = guild.channels.cache.find(channel => channel.name.includes(channelName));

    if (!channel) {
        try {
            const channels = await guild.channels.fetch();
            channel = channels.find(channel => channel.name.includes(channelName));
        } catch (error) {
            console.error(`error fetching channel: ${error}`);
        }
    }

    return channel;
}

async function setConfig(bot) {
    bot.guild = bot.guilds.cache.first();

    const firstInvites = await bot.guild.invites.fetch();
    bot.inviteUsageCounts = new Collection(firstInvites.map((invite) => [invite.code, invite.uses]));

    bot.cfgChannels = [
        { systemlogs: await getChannelByName(bot.guild, 'system-logs') },
        { memberlogs: await getChannelByName(bot.guild, 'member-logs') },
        { vclogs: await getChannelByName(bot.guild, 'vc-logs') },
        { welcome: await getChannelByName(bot.guild, 'welcome') }];

    await log(bot, {
        title: "YEEEES",
        message: "swag bot online"
    });
    await log(bot, {
        title: "Config",
        message: "systemlogs channel set to <#" + bot.cfgChannels.find(channel => channel.systemlogs)?.systemlogs.id + ">"
    });
    await log(bot, {
        title: "Config",
        message: "memberlogs channel set to <#" + bot.cfgChannels.find(channel => channel.memberlogs)?.memberlogs.id + ">"
    });
    await log(bot, {
        title: "Config",
        message: "vclogs channel set to <#" + bot.cfgChannels.find(channel => channel.vclogs)?.vclogs.id + ">"
    });
    await log(bot, {
        title: "Config",
        message: "welcome channel set to <#" + bot.cfgChannels.find(channel => channel.welcome)?.welcome.id + ">"
    });
}

async function log(bot, options) {
    const {
        channel,
        title = " ",
        message,
        color = '333333',
        member = null
    } = options;

    const cleanMessage = typeof message === "string" ? message.replace(/\r?\n/g, " ") : message;
    console.log(`[${title}] | ${cleanMessage}`);

    const logEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(message)
        .setTimestamp();

    if (member && member.user) {
        logEmbed.setFooter({
            text: `${member.user.username}`,
            iconURL: member.displayAvatarURL()
        });
    }

    const channelMap = {
        system: 'systemlogs',
        member: 'memberlogs',
        vc: 'vclogs',
    };

    const targetChannelName = channelMap[channel] || 'systemlogs';
    const targetChannelConfig = bot.cfgChannels.find(ch => ch[targetChannelName]);

    if (targetChannelConfig && targetChannelConfig[targetChannelName]) {
        try {
            await targetChannelConfig[targetChannelName].send({ embeds: [logEmbed] });
        } catch (error) {
            console.error(`failed to send log to '${channel}' channel`, error);
        }
    } else {
        console.warn(`log channel configuration for '${channel}' not found`);
    }
}