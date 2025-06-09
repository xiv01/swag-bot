const {log} = require("../../util/util");
module.exports = { logVoiceActivity };

async function logVoiceActivity(bot, oldState, newState) {
    if(newState.channel === oldState.channel) return;
    if(newState.channel && oldState.channel != null) {
        await log(bot, {
            channel: 'vc',
            title: '🔊 VC Switch',
            message: `>>> **member**: <@${newState.member.id}>\n**old channel**: <#${oldState.channel.id}>\n**new channel**: <#${newState.channel.id}>`,
            member: newState.member
        });
    } else if(newState.channel) {
        await log(bot, {
            channel: 'vc',
            title: '🔊 VC Join',
            message: `>>> **member**: <@${newState.member.id}>\n**channel**: <#${newState.channel.id}>`,
            member: newState.member
        });
    } else if (oldState.channel) {
        await log(bot, {
            channel: 'vc',
            title: '🔇 VC Leave',
            message: `>>> **member**: <@${newState.member.id}>\n**channel**: <#${oldState.channel.id}>`,
            member: oldState.member
        });
    }
}