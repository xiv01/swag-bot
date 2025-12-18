const { CHANNEL_SELFROLES, selfroles } = require('../../cfg.json');
const { getRoleByName, getChannelById } = require('../../util/util.js');
const {log} = require("../../util/util");
module.exports = { selfRoles };

async function selfRoles(bot, reaction, user, type) {
    if(user.bot) return;
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(!reaction.message.guild) return;
    console.log(reaction.message.channelId)

    if(reaction.message.channelId === CHANNEL_SELFROLES) {
        for(let i = 0; i < selfroles.length; i++) {
            for(j = 0; j < selfroles[i].roles.length; j++) {
                if(selfroles[i].roles[j][0].includes(reaction.emoji.name)) {
                    let roleName = selfroles[i].roles[j][1];
                    if(type) {
                        await reaction.message.guild.members.fetch(user.id).then(async member => {
                            await log(bot, {
                                title: "👥 self role removed",
                                message: `<@${user.id}> removed self role: \`${roleName}\``,
                                member: member
                            });
                            await member.roles.remove(await getRoleByName(reaction.message.guild, selfroles[i].roles[j][1]));
                        })
                    } else {
                        await reaction.message.guild.members.fetch(user.id).then(async member => {
                            await member.roles.add(await getRoleByName(reaction.message.guild, selfroles[i].roles[j][1]));
                            await log(bot, {
                                title: "👥 self role added",
                                message: `<@${user.id}> added self role: \`${roleName}\``,
                                member: member
                            });
                        })
                    }
                }
            }
        }
    }
}