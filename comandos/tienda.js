module.exports = {
    aliases: ["shop"],
    run: async (msg, args) => {
        if(args.length > 1) return

        /*switch(args[0]){
            case "2":
                msg.channel.send({ content: "Aquí puede ver los objetos a la venta", embeds: [embedsTienda.pagina2] }); break
            default:
                msg.channel.send({ content: "Aquí puede ver los objetos a la venta", embeds: [embedsTienda.pagina1] }); break
        }*/
        const embedTienda = new Discord.MessageEmbed()
            .setTitle("OBJETOS A LA VENTA:")
            .setColor(0x00AE86)
            .setDescription("Utilice `rpg comprar {item}` para comprar.")
            .setTimestamp()
            .setFooter("Página 1/2", client.user.avatarURL())

        const itemsSnap = await db.collection("items").get()
        let mensaje = ""
        const coin = "<:coin:929204039697195018>"
        itemsSnap.forEach(doc => {
            mensaje = mensaje+`${doc.id}. ${doc.data().emoji} Precio: ${doc.data().precio} ${coin}: +${doc.data().ataque} AT\n`
        })
        embedTienda.addField("ARMAS", mensaje)
        msg.channel.send({ embeds: [embedTienda] })
    }
}