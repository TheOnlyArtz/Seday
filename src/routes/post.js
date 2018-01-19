const express = require('express');


const Router = new express.Router();
const mainFunctions = require('../main.js');
const r = mainFunctions['rethink'];


Router.post('/dashboard/:guildID?', async function(req, res) {
    
    try {
        let stateAndPayload = getUpdateState(req, res)
    } catch (e) {
        
    }
    
//    res.redirect('/dashboard' + '/' + req.params.guildID)
});

module.exports = Router;

function getUpdateState(req, res, state, payload) {
    
    let keyword;
    
    switch (state) {
        case "prefixCtx":
            
            break;
        case "":
            
            break;
    }
}

async function updateDatabase(req, res, keyword, payload) {
    let guildAlive = await GuildExists(req, res); 
    let guild = req.session.user.guilds.find(i => i.id === req.params.guildID);
    if (guildAlive === false) {
        await createGuildDocument(guild);
        
    }
    
    async function update() {
        try {
            await r
                    .table('Guilds')
                    .update({
                        [keyword]: payload
                    })
                    .run();
        } catch (e) {
           console.error(e) 
        }

    }
}

async function GuildExists(req, res) {
    const exists = await r.table('Guilds').get(req.params.guildID).run();
    return exists ? true : false
}

async function createGuildDocument(guild) {
    try {
        await r
                .table('Guilds')
                .insert({
                    id: guild.id,
                    prefix: null
                })
                .run();
    } catch (e) {
        console.error(e);
    }
}