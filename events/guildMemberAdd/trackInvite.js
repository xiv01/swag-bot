const { log } = require('../../util/util.js');
const color = require('../../colors.json');
module.exports = { trackInvite };

async function trackInvite(bot, member) {
    const invites = await member.guild.invites.fetch();
    const inviteUsed = invites.find(invite => {
        const inviteUsageBefore = bot.inviteUsageCounts.get(invite.code) ?? 0;
        const inviteUsageAfter = invite.uses;
        if (inviteUsageAfter > inviteUsageBefore) {
            bot.inviteUsageCounts.set(invite.code, inviteUsageAfter);
            return true;
        }
    });

    try {
        await log(bot, {
            channel: "member",
            title: "MEMBER JOINED !!!!",
            message: `<@${member.id}> joined the server\n>>> **invite code:** \`\`${inviteUsed.code} (${inviteUsed.uses})\`\`\n**inviter**: <@${inviteUsed.inviter.id}>`,
            color: color.success,
            member: member
        });
    } catch {
        await log(bot, {
            channel: "member",
            title: "MEMBER JOINED !!!!",
            message: `<@${member.id}> joined the server\n>>> **invite code:** not trackable`,
            color: color.success,
            member: member
        });
    }
}