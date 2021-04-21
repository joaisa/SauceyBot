const MANAGER = require('../server-data-manager.js').MANAGER;

function onMessage(client, msg, args, fullMsg) {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
    const pingedUser = msg.mentions.members.first();

    if (!pingedUser) {
        msg.channel.send("You need to mention a user!");
        return;
    }
    
    let warning = fullMsg.replace(`<@!${pingedUser.id}>`, "");

    if (warning.substring(0, 1) == ' ') {
        warning = warning.substring(1, warning.length);
    }

    MANAGER.warnUserInServer(msg.guild.id, pingedUser.id, warning);
}

module.exports = { onMessage }