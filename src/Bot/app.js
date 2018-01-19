const r = require('rethinkdbdash')({db: 'Dashcord', servers: [{host: 'localhost', port: 28015}]});

const io = require('socket.io-client')('http://localhost:3000');


const Discord = require('discord.js');
const Client = new Discord.Client();

Client.config = require('./config.json');

// Collection
Client.guildsConfig = new Discord.Collection();

// Whenever ready event is being dispatched
Client.on('ready', async () => {
    const guilds = Client.guilds.array();
    
    for (let guild of guilds) {
        let config = await r.table('Guilds').get(guild.id).run()
        Client.guildsConfig.set(guild.id, config ? config : null);
    }
    
});

io.on('new prefix', async function(prefix, id) {
   let config = Client.guildsConfig.get(id);
   if (!config){
        let newConfig = await r.table('Guilds').get(id).run()
        Client.guildsConfig.set(id, newConfig ? newConfig : null);
   }
    
    config['prefix'] = prefix;
});


Client.on('message', async (message) => {
    const config = Client.guildsConfig.get(message.guild.id)
    
    let prefix = config && config.prefix ? config.prefix : "=";
    
    if (message.content.startsWith(`${prefix}hello`)) {
        const msg = await message.channel.send('Pinging...')
        msg.edit(`Pong! ${msg.createdTimestamp - message.createdTimestamp}ms`);
    }
});

Client.login(Client.config.token);