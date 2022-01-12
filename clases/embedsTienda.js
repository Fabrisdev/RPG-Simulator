const coin = "<:coin:929204039697195018>"

module.exports.armas = async () => {
    const embedTienda = new Discord.MessageEmbed()
        .setTitle("OBJETOS A LA VENTA:")
        .setColor(0x00AE86)
        .setDescription("Utilice `rpg comprar {item}` para comprar.")
        .setTimestamp()
    embedTienda.setFooter("Sección de armas", client.user.avatarURL())
    const itemsSnap = client.items
    let mensaje = ""
    itemsSnap.forEach((item, itemID) => {
        if(item.tipo != "Armas") return
        mensaje = mensaje+`${itemID}. ${item.emoji} Precio: ${item.precio} ${coin}: +${item.ataque} AT\n`
    })
    embedTienda.addField("ARMAS", mensaje)
    return embedTienda
}

module.exports.armaduras = async () => {
    const embedTienda = new Discord.MessageEmbed()
        .setTitle("OBJETOS A LA VENTA:")
        .setColor(0x00AE86)
        .setDescription("Utilice `rpg comprar {item}` para comprar.")
        .setTimestamp()
    embedTienda.setFooter("Sección de armaduras", client.user.avatarURL())
    const itemsSnap = client.items
    let mensaje = ""
    itemsSnap.forEach((item, itemID) => {
        if(item.tipo != "Armaduras") return
        mensaje = mensaje+`${itemID}. ${item.emoji} Precio: ${item.precio} ${coin}: +${item.defensa} DEF\n`
    })
    embedTienda.addField("ARMADURAS", mensaje)
    return embedTienda
}

module.exports.consumibles = async () => {
    const embedTienda = new Discord.MessageEmbed()
        .setTitle("OBJETOS A LA VENTA:")
        .setColor(0x00AE86)
        .setDescription("Utilice `rpg comprar {item}` para comprar.")
        .setTimestamp()
    embedTienda.setFooter("Sección de consumibles", client.user.avatarURL())
    const itemsSnap = client.items
    let mensaje = ""
    itemsSnap.forEach((item, itemID) => {
        if(item.tipo != "Consumibles") return
        mensaje = mensaje+`${itemID}. ${item.emoji} Precio: ${item.precio} ${coin}: +${item.curacion} HP\n`
    })
    embedTienda.addField("CONSUMIBLES", mensaje)
    return embedTienda
}