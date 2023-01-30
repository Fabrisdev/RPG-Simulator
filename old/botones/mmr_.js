module.exports = {
    name: "mmr_", 
    regex: /^mmr_.{10}_(atacar|comer|magia|proteger)$/i,
    run: async interaction => {
        const [,ID, action] = interaction.customId.split('_')
        const mazmorra = client.mazmorras.get(ID)
        if (!mazmorra) return interaction.reply({ content: "¡Esta mazmorra ya ha terminado!", ephemeral: true})
        mazmorra.emit(action+'Clicked', interaction)
    }
}