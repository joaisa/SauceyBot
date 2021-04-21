const token = require('./token.js').token;
if(!token) return;

const discord = require('discord.js');
const client = new discord.Client();

const prefix = '!';

const COMMAND_LIBRARY = require('./commands.js').commands;

const DATA_MANAGER = require('./server-data-manager').MANAGER;

client.once('ready', () => {

    console.log('SauceyBot is online!');
    DATA_MANAGER.onReady(discord, client);

});


client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.channel.id != message.guild.channels.cache.find(channel => channel.name.toLowerCase().includes('bot-commands')) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const fullMessage = message.content.substring(prefix.length + command.length + 1, message.length);

    let commandSearch = COMMAND_LIBRARY.find(value => value == command)
    if (commandSearch) {
        console.log(`${message.author} ran the command: ${commandSearch}`)
        require(`./commands/${commandSearch}.js`).onMessage(client, message, args, fullMessage)
    }
    

})

client.login(token);