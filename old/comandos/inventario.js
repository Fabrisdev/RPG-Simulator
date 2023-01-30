module.exports = {
    aliases: ["i", "inventory"],
    run: (msg, args) => {
        const userMencionado = msg.mentions.users.first() ?? msg.author
        const userID = userMencionado.id
        const userSnap = client.jugadores.get(userID)
        if(!userSnap) return msg.channel.send("Esa persona no ha empezado a jugar aún!")
        let fieldArmas = "\u200B"
        let fieldArmaduras = "\u200B"
        let fieldConsumiblesYMazmorras = "\u200B"

        Object.keys(userSnap.items).forEach(key => {
            const itemSnap = client.items.get(key)

            switch(itemSnap.tipo){
                case "Armas":
                    fieldArmas+=`${key}. ${itemSnap.emoji} ${itemSnap.nombre}\n`
                    break
                case "Armaduras":
                    fieldArmaduras+=`${key}. ${itemSnap.emoji} ${itemSnap.nombre}\n`
                    break
                case "Mazmorras":
                    fieldConsumiblesYMazmorras+=`${key}. ${itemSnap.emoji} ${itemSnap.nombre}\n`
                    break
            }
        })

        Object.keys(userSnap.consumibles).forEach(key => {
            const consumibleSnap = client.items.get(key)
            const cantidadConsumible = userSnap.consumibles[key].cantidad
            fieldConsumiblesYMazmorras+=`${key}. ${consumibleSnap.emoji} ${consumibleSnap.nombre} x${cantidadConsumible}\n`
        })


        const embedInventario = new Discord.MessageEmbed()
            .setTitle("INVENTARIO")
            .setColor(0x00AE86)
            .setTimestamp()
            .setFooter(`Inventario de ${userMencionado.username}`, client.user.avatarURL())
            .addField("ARMAS", fieldArmas, true)
            .addField("ARMADURAS", fieldArmaduras, true)
            .addField("CONSUMIBLES Y MAZMORRAS", fieldConsumiblesYMazmorras, true)

        msg.channel.send({ embeds: [embedInventario] })
    }
}