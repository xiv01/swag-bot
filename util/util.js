module.exports = { getChannelById, getRoleById, getRoleByName }

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