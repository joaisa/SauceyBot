function onMessage(client, msg, args) {
    msg.channel.send('Pong!');
}

module.exports = { onMessage }