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
        mensaje += `${itemID}. ${item.emoji} Precio: ${item.precio} ${coin}: +${item.ataque} AT\n`
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

module.exports.mazmorras = async () => {
    const embedTienda = new Discord.MessageEmbed()
        .setTitle("OBJETOS A LA VENTA:")
        .setColor(0x00AE86)
        .setDescription("Utilice `rpg comprar {item}` para comprar.")
        .setTimestamp()
    embedTienda.setFooter("Sección de mazmorras", client.user.avatarURL())
    const itemsSnap = client.items
    let mensaje = ""
    itemsSnap.forEach((item, itemID) => {
        if(item.tipo != "Mazmorras") return
        mensaje = mensaje+`${itemID}. ${item.emoji} Precio: ${item.precio} ${coin}\n`
    })
    embedTienda.addField("MAZMORRAS", mensaje)
    return embedTienda
}

module.exports.bienvenida = async (msg) => {
    return new Discord.MessageEmbed()
        .setTitle(`¡Hey ${msg.author.username}! ¡Bienvenido a RPG Simulator!`)
        .setColor(0x00AE86)
        .setDescription("El propósito del juego es luchar, mejorar tus armas y avanzar de mundo a nuevos más dificiles pero con más recursos.\nHay un total de **10** mundos (tú empiezas en el #1).")
        .addFields(
            { name: "__COMO JUGAR__", value: `
            :star: Obten XP y monedas luchando contra enemigos para mejorar tu armadura y avanzar en el juego. Puedes revisar tus estádisticas con \`perfil\`.
            :warning: **Si mueres, perderás un nivel**. Compra comida en la \`tienda\` para recuperar tu vida.` },
            { name: "__TIENDA Y MONEDAS__", value: `
            :star: Gasta tus <:coin:929204039697195018> monedas conseguidas en la \`tienda\`.
            :star: En ella puedes comprar desde comida hasta **espadas y armadura legendaria**.
            :star: O elabora tus propias herramientas con \`elaborar\`` },
            { name: "__DUNGEONS Y MUNDOS__", value: `
            :star: Cuando creas estar preparado, compra un **portal** en la \`tienda\` el cual te llevará hacia tu próxima **dungeon con un jefe**.
            :star: Si logras vencerlo, desbloquearás un **nuevo mundo** al que podrás ir, con muchos mayores recursos :palm_tree:, nuevas herramientas :axe: y nuevos enemigos!` },
            { name: "__MÁS__", value: `
            :star: Revisa todos los comandos usando \`ayuda\`. Te será de gran utilidad.
            :star: Si tienes dudas, puedes revisar consultar a mi creador Fabri :pleading_face:` }
        )
}