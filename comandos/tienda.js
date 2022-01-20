module.exports = {
    aliases: ["shop"],
    run: async (msg, args) => {
        const { MessageActionRow, MessageButton } = require('discord.js')
        if(args.length > 1) return
        const embedsTienda = require("../clases/embedsAEnviar.js")
        const botones = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('tienda_armas')
                .setLabel('ARMAS')
                .setStyle('SUCCESS')
                .setDisabled(true),
            new MessageButton()
                .setCustomId('tienda_armaduras')
                .setLabel('ARMADURA')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('tienda_consumibles')
                .setLabel('CONSUMIBLES')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId("tienda_mazmorras")
                .setLabel("MAZMORRAS")
                .setStyle("PRIMARY"),
        )

        msg.reply({ embeds: [await embedsTienda.armas()], components: [botones]})
    }
}

