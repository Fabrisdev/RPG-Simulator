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

/*    const canal = client.channels.cache.get("932454471680819271")
    const embedMapa = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle("❯ MAPA DE CITYCORD ❮")
        .setColor(0x00AE86)
        .setDescription(`
        ━━━━━━━━━━━━━━━⊱✿⊰━━━━━━━━━━━━━━━━
        ¡Bienvenido a la ciudad! ¿Acaso estás perdido? ¡No te preocupes!
        Abajo se encuentra un mapa de todos los lugares de la ciudad:
        ━━━━━━━━━━━━━━━⊱✿⊰━━━━━━━━━━━━━━━━
        `)
        .addFields(
            { name: "Bienvenida", value: "<#928743770948771850>", inline: true },
            { name: "Mapa de la ciudad", value: "<#932454471680819271>", inline: true },
            { name: "Reglas", value: "<#928743734617722940>", inline: true },
            { name: "Anuncios", value: "<#928748616691114054>", inline: true },
            { name: "Auto-roles", value: "<#928749085635252314>", inline: true },
            { name: "Tickets", value: "<#928747597659775026>", inline: true },
            { name: "Reportes", value: "<#928746279503274004>", inline: true },
            { name: "Mod-log", value: "<#928745052421910558>", inline: true },
            { name: "Sugerencias", value: "<#928747124785553408>", inline: true },
            { name: "Sugerencias-emojis-stickers", value: "<#928767480690782259>", inline: true },
            { name: "General", value: "<#925439755112550462>", inline: true },
            { name: "Memes", value: "<#928758551420207196>", inline: true },
            { name: "Comandos", value: "<#928743497190735934>", inline: true },
            { name: "Spam", value: "<#928758704663298149>", inline: true },
            { name: "Anime", value: "<#928743565016830042>", inline: true },
            { name: "Programación", value: "<#928749850823131157>", inline: true },
            { name: "Arte", value: "<#928743510432165968>", inline: true },
            { name: "Biblioteca", value: "<#928753464861925407>", inline: true },
            { name: "Hydra-song-requests", value: "<#928752182717710336>", inline: true },
            { name: "Cafetería", value: "<#928752754535596032>", inline: true },
            { name: "Juegos", value: "<#928743538940862525>", inline: true },
            { name: "RPG", value: "<#928777833503916072>", inline: true },
            { name: "Mining simulator", value: "<#928777968807968828>", inline: true },
            { name: "Dank memer", value: "<#928778010180608050>", inline: true },
            { name: "Taquilla", value: "<#928743631479783455>", inline: true },
        )
        .setFooter("Mapa de la ciudad", client.user.avatarURL())
    canal.send({ embeds: [embedMapa] })
*/
}