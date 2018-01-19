
async function updatePrefix(r, val, guildID) {
    await r.table('Guilds').get(guildID).update({prefix: val.toString()}).run();
}

module.exports = updatePrefix;