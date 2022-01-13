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
            new MessageButton()
                .setCustomId("mazmorras")
                .setLabel("MAZMORRAS")
                .setStyle("PRIMARY"),
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
            for(let i = 0; i < row.components.length; i++){
                row.components[i].setDisabled(false).setStyle("PRIMARY")
            }
            if(buttonID === "armas"){
                row.components[0].setDisabled(true).setStyle("SUCCESS")
                return messageSent.edit({ embeds: [await embedsTienda.armas()], components: [row] })
            }
            if(buttonID === "armadura"){
                row.components[1].setDisabled(true).setStyle("SUCCESS")
                return messageSent.edit({ embeds: [await embedsTienda.armaduras()], components: [row] })
            }
            if(buttonID === "consumibles"){
                row.components[2].setDisabled(true).setStyle("SUCCESS")
                return messageSent.edit({ embeds: [await embedsTienda.consumibles()], components: [row] })
            }
            if(buttonID === "mazmorras"){
                row.components[3].setDisabled(true).setStyle("SUCCESS")
                return messageSent.edit({ embeds: [await embedsTienda.mazmorras()], components: [row] })
            }
        })

    }
}