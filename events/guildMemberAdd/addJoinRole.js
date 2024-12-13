const { ROLE_DEFAULT } = require('../../cfg.json');
const { getRoleById } = require('../../util/util.js');
module.exports = { addJoinRole };

async function addJoinRole(member) {
    const defaultRole = await getRoleById(member.guild, ROLE_DEFAULT);
    await member.roles.add(defaultRole);
}