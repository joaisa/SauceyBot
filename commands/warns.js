const MANAGER = require('../server-data-manager.js').MANAGER;

function onMessage(client, msg, args, fullMsg) {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
    const pingedUser = msg.mentions.members.first();

    if (!pingedUser) {
        msg.channel.send("You need to mention a user!");
        return;
    }

    const data = MANAGER.getUserDataInServer(msg.guild.id, pingedUser.id);
    
    msg.channel.send(`${pingedUser.user.username} currently has ${data.warns.length} warnings: ${data.warns}`);
}

module.exports = { onMessage }