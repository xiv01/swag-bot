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

    await log(bot, "system", "YEEEESS", "SWAG BOT IS ONLINE !!!")
    await log(bot, "system", "Config", "systemlogs channel set to <#" + bot.cfgChannels.find(channel => channel.systemlogs)?.systemlogs.id + ">");
    await log(bot, "system", "Config", "memberlogs channel set to <#" + bot.cfgChannels.find(channel => channel.memberlogs)?.memberlogs.id + ">");
    await log(bot, "system", "Config", "vclogs channel set to <#" + bot.cfgChannels.find(channel => channel.vclogs)?.vclogs.id + ">");
    await log(bot, "system", "Config", "welcome channel set to <#" + bot.cfgChannels.find(channel => channel.welcome)?.welcome.id + ">");
}

async function log(bot, channel, title, message, color = "333333", member = null) {
    console.log(title + " | " + message);
    let logEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(message)
        .setTimestamp();
    if(member) {
        logEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(message)
            .setFooter({ text: `${member.user.username}`, iconURL: member.displayAvatarURL() })
            .setTimestamp();
    };

    switch (channel) {
        case 'system':
            await bot.cfgChannels.find(channel => channel.systemlogs)?.systemlogs.send({embeds: [logEmbed]});
            break;
        case 'member':
            await bot.cfgChannels.find(channel => channel.memberlogs)?.memberlogs.send({embeds: [logEmbed]});
            break;
        case 'vc':
            await bot.cfgChannels.find(channel => channel.vclogs)?.vclogs.send({embeds: [logEmbed]});
            break;
        default:
            await bot.cfgChannels.find(channel => channel.systemlogs)?.systemlogs.send({embeds: [logEmbed]});
    }
}