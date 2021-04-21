function onMessage(client, msg, args) {
    let userToRate = msg.author;
    
    let mentionCheck = msg.mentions.users.first();
    if(mentionCheck) userToRate = mentionCheck;

    msg.channel.send(`
    ${userToRate} is ${
        Math.floor((Math.random() * 100) + 0.5)
    }% swag
    `);
}

module.exports = { onMessage }