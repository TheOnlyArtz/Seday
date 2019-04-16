
const updators = require('./updators')
async function updator (rethinkDB, eventName, value, guildID) {

    switch (eventName) {
      case "new prefix":
        await updators.updatePrefix(rethinkDB, value, guildID);
        break;
    }
}

module.exports = updator;
