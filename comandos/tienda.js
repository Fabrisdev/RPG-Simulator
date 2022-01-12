const { MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
    aliases: ["shop"],
    run: async (msg, args) => {
        if(args.length > 1) return
        const embedsTienda = require("../clases/embedsTienda.js")
        
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("armas")
                .setLabel('ARMAS')
                .setStyle('SUCCESS')
                .setDisabled(true),
            new MessageButton()
                .setCustomId("armadura")
                .setLabel('ARMADURA')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId("comida")
                .setLabel('COMIDA')
                .setStyle('PRIMARY'),
        )

        let messageSent = msg.channel.send({ embeds: [await embedsTienda.armas()], components: [row]})

        const filter = (interaction) => {
            if(interaction.user.id === msg.author.id) return true
            return interaction.reply({ content: "Este no es tu mensaje!", ephemeral: true })  
        }
        
        const collector = msg.channel.createMessageComponentCollector({ filter, time: 30000 })

        collector.on("collect", async (ButtonInteraction) => {
            ButtonInteraction.deferUpdate()
            const buttonID = ButtonInteraction.customId
            /*if(buttonID === "comprar"){
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(false)
                row.components[0].setStyle("SUCCESS")
                row.components[1].setStyle("PRIMARY")
                return messageSent.edit({ content: "Aquí puede ver los objetos a la venta", embeds: [embedsTienda.pagina1], components: [row] })
            }
            if(buttonID === "vender"){
                row.components[0].setDisabled(false)
                row.components[1].setDisabled(true)
                row.components[0].setStyle("PRIMARY")
                row.components[1].setStyle("SUCCESS")
                return messageSent.edit({ content: "Con qué quieres vender un objeto tuyo, ¿Eh?", embeds: [embedsTienda.paginavender1], components: [row] })
            }
            */
        })
    }
}