async function initGuild(r, id) {
    const table = r.table('Guilds')
    await table.insert({id}).run();
}

module.exports = initGuild;