module.exports = {
    aliases: ["ayuda"],
    run: (msg, args) => {
        if(args.length <= 1) return

        if(args[0] == "item"){
            const itemSnap = client.items.get(args[1])

            //Revisar que el item exista
            if(!itemSnap) return msg.channel.send("Ese item no existe!")
            
            const embedAyuda = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor(16738740)
                .setTitle(itemSnap.nombre)
                .setFooter("¿Necesitas más ayuda? Usa `rpg help`", client.user.avatarURL())

            if(itemSnap.tipo == "Armas"){
                embedAyuda.setTitle(itemSnap.nombre)
                embedAyuda.setDescription(`
                    **ID**: ${args[1]}
                    **Tipo**: ${itemSnap.tipo}
                    **Emoji**: ${itemSnap.emoji}
                    **Uso**: Te entrega ${itemSnap.ataque} AT
                    `)
            }
            if(itemSnap.tipo == "Armaduras"){
                embedAyuda.setTitle(itemSnap.nombre)
                embedAyuda.setDescription(`
                    **ID**: ${args[1]}
                    **Tipo**: ${itemSnap.tipo}
                    **Emoji**: ${itemSnap.emoji}
                    **Uso**: Te entrega ${itemSnap.defensa} DEF
                    `)

            }
            if(itemSnap.tipo == "Consumibles"){
                embedAyuda.setTitle(itemSnap.nombre)
                embedAyuda.setDescription(`
                    **ID**: ${args[1]}
                    **Tipo**: ${itemSnap.tipo}
                    **Emoji**: ${itemSnap.emoji}
                    **Uso**: Regenera ${itemSnap.curacion} HP
                    `)
            }
            msg.channel.send({ embeds: [embedAyuda] })
        }
    }
}