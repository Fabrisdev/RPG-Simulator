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
                .setCustomId("consumibles")
                .setLabel('CONSUMIBLES')
                .setStyle('PRIMARY'),
        )

        let messageSent = await msg.channel.send({ embeds: [await embedsTienda.armas()], components: [row]})

        const filter = (interaction) => {
            if(interaction.user.id === msg.author.id) return true
            return interaction.reply({ content: "Este no es tu mensaje!", ephemeral: true })  
        }
        
        const collector = msg.channel.createMessageComponentCollector({ filter, time: 30000 })

        collector.on("collect", async (ButtonInteraction) => {
            ButtonInteraction.deferUpdate()
            const buttonID = ButtonInteraction.customId
            if(buttonID === "armas"){
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(false)
                row.components[2].setDisabled(false)
                row.components[0].setStyle("SUCCESS")
                row.components[1].setStyle("PRIMARY")
                row.components[2].setStyle("PRIMARY")
                return messageSent.edit({ embeds: [await embedsTienda.armas()], components: [row] })
            }
            if(buttonID === "armadura"){
                row.components[0].setDisabled(false)
                row.components[1].setDisabled(true)
                row.components[2].setDisabled(false)
                row.components[0].setStyle("PRIMARY")
                row.components[1].setStyle("SUCCESS")
                row.components[2].setStyle("PRIMARY")
                return messageSent.edit({ embeds: [await embedsTienda.armaduras()], components: [row] })
            }
            if(buttonID === "consumibles"){
                row.components[0].setDisabled(false)
                row.components[1].setDisabled(false)
                row.components[2].setDisabled(true)
                row.components[0].setStyle("PRIMARY")
                row.components[1].setStyle("PRIMARY")
                row.components[2].setStyle("SUCCESS")
                return messageSent.edit({ embeds: [await embedsTienda.consumibles()], components: [row] })
            }
        })
    }
}