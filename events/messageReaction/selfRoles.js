const { CHANNEL_SELFROLES, selfroles } = require('../../cfg.json');
const { getRoleByName, getChannelById } = require('../../util/util.js');
module.exports = { selfRoles };

async function selfRoles(reaction, user, type) {
    if(user.bot) return;
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(!reaction.message.guild) return;

    if(await getChannelById(reaction.message.guild, CHANNEL_SELFROLES)) {
        for(var i = 0; i < selfroles.length; i++) {
            for(j = 0; j < selfroles[i].roles.length; j++) {
                if(selfroles[i].roles[j][0].includes(reaction.emoji.name)) {
                    // for log | let roleName = selfroles[i].roles[j][1];
                    if(type) {
                        await reaction.message.guild.members.fetch(user.id).then(async member => {
                            console.log(selfroles[i].roles[j][1]);
                            await member.roles.remove(await getRoleByName(reaction.message.guild, selfroles[i].roles[j][1]));
                        })
                    } else {
                        await reaction.message.guild.members.fetch(user.id).then(async member => {
                            await member.roles.add(await getRoleByName(reaction.message.guild, selfroles[i].roles[j][1]));
                        })
                    }
                }
            }
        }
    }
}