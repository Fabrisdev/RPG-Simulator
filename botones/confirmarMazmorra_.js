module.exports = {
    name: 'confirmarMazmorra_',
    regex: /confirmarMazmorra_(confirmar|cancelar)$/gi,
    run: async (interaction) => {
        await interaction.deferUpdate()
        const msgreply = await interaction.channel.messages.fetch(interaction.message.reference.messageId)
        if (interaction.user.id !== msgreply.author.id) return
        const mensaje = await interaction.message
        const [,opcion] = interaction.customId.split('_')

        if(opcion == "confirmar"){
            await mensaje.edit({ content: "Empezando mazmorra...", components: [] })
            const userSnap = client.jugadores.get(mensaje.mentions.repliedUser.id)
            const Mazmorra = require("../clases/Mazmorra.js")
            return Mazmorra.jugarMazmorra(userSnap.ultimoMundo, [mensaje.mentions.repliedUser], mensaje)
            
        }
        return mensaje.edit({ content: "Mazmorra cancelada.", components: [] })
    }
}
