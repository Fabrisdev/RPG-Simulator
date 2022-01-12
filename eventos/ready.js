module.exports = async (client) => {
    client.user.setActivity("como mueres una y otra vez", { type: "WATCHING" })

    const Server = require("../clases/Server.js")
    client.guilds.cache.map(g => client.servers.set(g.id, new Server(g.id)))

    client.slashComandos.map(command => {
        client.guilds.cache.map(guild => {
            guild.commands.create(command.data.toJSON())
        })
    })
    
    const ItemsManager = require("../clases/ItemsManager.js")
    client.items = new ItemsManager()

    const PlayerManager = require("../clases/PlayerManager.js")
    client.jugadores = new PlayerManager()
}