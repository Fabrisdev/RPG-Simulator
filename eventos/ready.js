module.exports = (client) => {
    client.user.setActivity("como mueres una y otra vez", { type: "WATCHING" })

    const Server = require("../Server.js")
    client.guilds.cache.map(g => client.servers.set(g.id, new Server(g.id)))

    client.slashComandos.map(command => {
        client.guilds.cache.map(guild => {
            guild.commands.create(command.data.toJSON())
        })
    })
}