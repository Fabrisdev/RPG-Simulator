module.exports = {
    name: 'tienda_',
    regex: /tienda_(armas|armaduras|consumibles|mazmorras)$/gi,
    run: async (interaction) => {
        await interaction.deferUpdate()
        const msgreply = await interaction.channel.messages.fetch(interaction.message.reference.messageId)
        if (interaction.user.id !== msgreply.author.id) return
        const mensaje = await interaction.message
        const [,opcion] = interaction.customId.split('_')
        const embedsTienda = require("../clases/embedsAEnviar.js")
        const botones = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId('tienda_armas')
                .setLabel('ARMAS')
                .setStyle(opcion=="armas"?'SUCCESS':'PRIMARY')
                .setDisabled(opcion=='armas'),
            new Discord.MessageButton()
                .setCustomId('tienda_armaduras')
                .setLabel('ARMADURA')
                .setStyle(opcion=="armaduras"?'SUCCESS':'PRIMARY')
                .setDisabled(opcion=='armaduras'),
            new Discord.MessageButton()
                .setCustomId('tienda_consumibles')
                .setLabel('CONSUMIBLES')
                .setStyle(opcion=="consumibles"?'SUCCESS':'PRIMARY')
                .setDisabled(opcion=='consumibles'),
            new Discord.MessageButton()
                .setCustomId("tienda_mazmorras")
                .setLabel("MAZMORRAS")
                .setStyle(opcion=="mazmorras"?'SUCCESS':'PRIMARY')
                .setDisabled(opcion=='mazmorras'),
        )
        mensaje.edit({ embeds: [opcion == 'armas'
            ? await embedsTienda.armas()
            : opcion == 'armaduras'
                ? await embedsTienda.armaduras()
                : opcion == 'consumibles'
                    ? await embedsTienda.consumibles()
                    : await embedsTienda.mazmorras()
            ], components: [botones] })
    }
}
