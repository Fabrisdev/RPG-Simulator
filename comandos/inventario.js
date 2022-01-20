module.exports = {
    aliases: ["i", "inventory"],
    run: (msg, args) => {
        const userID = msg.author.id
        const userSnap = client.jugadores.get(userID)
        const items = userSnap.items
        let fieldArmas = "" || "\u200B"
        let fieldArmaduras = "" || "\u200B"
        let fieldConsumiblesYMazmorras = "" || "\u200B"

        Object.keys(items).forEach((key) => {
            const itemSnap = client.items.get(key)

            if(itemSnap.tipo === "Armas"){
                fieldArmas+=`${key}. ${itemSnap.emoji} ${itemSnap.nombre}\n`
            }
            if(itemSnap.tipo === "Armaduras"){
                fieldArmaduras+=`${key}. ${itemSnap.emoji} ${itemSnap.nombre}\n`
            }
            if(itemSnap.tipo === "Consumibles" || itemSnap.tipo === "Mazmorras"){
                fieldConsumiblesYMazmorras+=`${key}. ${itemSnap.emoji} ${itemSnap.nombre}\n`
            }
        })

        const embedInventario = new Discord.MessageEmbed()
            .setTitle("INVENTARIO")
            .setColor(0x00AE86)
            .setTimestamp()
            .setFooter(`Inventario de ${msg.author.username}`, client.user.avatarURL())
            .addField("ARMAS", fieldArmas, true)
            .addField("ARMADURAS", fieldArmaduras, true)
            .addField("CONSUMIBLES Y MAZMORRAS", fieldConsumiblesYMazmorras, true)

        msg.channel.send({ embeds: [embedInventario] })
    }
}