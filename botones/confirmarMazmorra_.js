module.exports = {
    name: 'confirmarMazmorra_',
    regex: /confirmarMazmorra_(confirmar|cancelar)$/gi,
    run: async (interaction) => {
        await interaction.deferUpdate()
        const msgreply = await interaction.channel.messages.fetch(interaction.message.reference.messageId)
        if (interaction.user.id !== msgreply.author.id) return
        const mensaje = await interaction.message
        const [,opcion] = interaction.customId.split('_')
        const embedsAEnviar = require("../clases/embedsAEnviar.js")

        if(opcion == "confirmar"){
            mensaje.edit({ content: "Empezando mazmorra...", components: [] })
            Mazmorra.jugar()
        }
        return mensaje.edit({ content: "Mazmorra cancelada.", components: [] })
    }
}
