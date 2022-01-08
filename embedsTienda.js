const coin = "<:coin:929204039697195018>"

module.exports.pagina1 = new Discord.MessageEmbed()
    .setTitle("OBJETOS A LA VENTA:")
    .setColor(0x00AE86)
    .setDescription("Utilice `rpg comprar {item}` para comprar.")
    .setTimestamp()
    .addField("ARMAS", "1. <:espadamadera:929207102109532211> Precio: `500`"+coin+": +2 AT\n2. <:hachamadera:929211502332882984> Precio: `700`"+coin+": 3 AT", true)
    .addField("ARMADURAS", "sexo", true)
    .setFooter("Página 1/2", client.user.avatarURL())

module.exports.pagina2 = new Discord.MessageEmbed()
    .setTitle("OBJETOS A LA VENTA:")
    .setColor(0x00AE86)
    .setDescription("Utilice `rpg comprar {item}` para comprar.")
    .setTimestamp()
    .addField("\u200B", "**ARMAS**\n1- **Espada de madera** => 5 AT\n2- **Hacha de madera** => 3 AT")
    .addField("\u200B", "**ARMADURAS**")
    .setFooter("Página 2/2", client.user.avatarURL())