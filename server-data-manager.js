const fs = require('fs')
const path = './server-data.json'

function getData() {
    return require(path);
}

function fileWriteError(err) {
    //console.log(`Error writing to file: ${err}`)
}

function rewriteData() {
    let data = getData();
    fs.writeFile(path, JSON.stringify(data, null, 4), fileWriteError);
}

const MANAGER = {

    addServer: (serverId) => {
        console.log(serverId);

        let data = getData();

        const tableToParse = {
            id: serverId,

            users: []
        }

        data.servers.push(tableToParse)

        rewriteData();

        return tableToParse;
    },

    addUserToServer: (serverId, userId) => {
        let data = getData();

        let server = data.servers.find(s => s.id == serverId);

        if (!server) server = MANAGER.addServer(serverId);

        if (!server) return;
        if (server.users.find(u => u.id == userId)) return;

        const tableToParse = {
            id: userId,

            warns: []
        }

        server.users.push(tableToParse);

        rewriteData();

        return tableToParse;
    },

    warnUserInServer: (serverId, userId, warning) => {
        let data = getData();

        let server = data.servers.find(s => s.id == serverId);
        if (!server) return;

        let user = server.users.find(u => u.id == userId);
        if (!user) user = MANAGER.addUserToServer(serverId, userId);
        
        user.warns.push(warning);

        rewriteData();

        return user;
    },

    getUserDataInServer: (serverId, userId) => {
        let data = getData();

        let server = data.servers.find(s => s.id == serverId);
        if (!server) return;

        let user = server.users.find(u => u.id == userId);
        if (!user) user = MANAGER.addUserToServer(serverId, userId);

        return user;
    },

    onReady: (__, client) => {
        let guilds = client.guilds.cache;

        guilds.forEach(guild => {
            let users = guild.members.cache;
            
            users.forEach(user => {
                MANAGER.addUserToServer(guild.id, user.id);
            })
        })
    }

}

module.exports = { MANAGER };