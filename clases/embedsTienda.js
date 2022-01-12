const coin = "<:coin:929204039697195018>"

module.exports.armas = async () => {
    const pagina = new Discord.MessageEmbed()
        .setTitle("OBJETOS A LA VENTA:")
        .setColor(0x00AE86)
        .setDescription("Utilice `rpg comprar {item}` para comprar.")
        .setTimestamp()
        .setFooter("Sección de armas", client.user.avatarURL())
    const itemsSnap = await db.collection("items").get()
    let armas = ""
    itemsSnap.forEach(doc => {
        armas = armas+`${doc.id}. ${doc.data().emoji} Precio: ${doc.data().precio} ${coin}: +${doc.data().ataque} AT\n`
    })
    pagina.addField("ARMAS", armas)
    return pagina
}


module.exports.armaduras = new Discord.MessageEmbed()
    .setTitle("OBJETOS A LA VENTA:")
    .setColor(0x00AE86)
    .setDescription("Utilice `rpg comprar {item}` para comprar.")
    .setTimestamp()
    .addField("\u200B", "**ARMAS**\n1- **Espada de madera** => 5 AT\n2- **Hacha de madera** => 3 AT")
    .addField("\u200B", "**ARMADURAS**")
    .setFooter("Página 2/2", client.user.avatarURL())