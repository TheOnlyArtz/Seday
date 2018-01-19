
const initGuild = require('./initGuild.js');


async function guildOrInit (r, id) {
    
    // returns true or initializing the guild
    
    const there = await r.table('Guilds').get(id).run();
    if (there) {
        return;
    }
    
    await initGuild(r, id);
}

module.exports = guildOrInit;