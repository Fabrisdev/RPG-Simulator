module.exports = {
    data: new SlashCommands.SlashCommandBuilder()
        .setName("top")
        .setDescription("Ve los mejores jugadores del juego."),
    async execute(interaction){
        await interaction.deferReply()
        const usersSnap = await db.collection("usuarios").get()
        const jugadores = []
        usersSnap.forEach(doc => {
            jugadores.push({ id: doc.id, dinero: doc.data().dinero })
        })
        jugadores.sort(utils.obtenerOrdenInverso("dinero")).slice(0,10)
        const embedMensaje = new Discord.MessageEmbed()
            .setTitle(":star: __Top 10 jugadores con más dinero__ :star:")
            .setColor("#EC50DA")

        for(i = 0; i < jugadores.length; i++){
            const obtenerJugador = await client.users.fetch(jugadores[i].id)
            embedMensaje.addField(`#${i+1} Nombre: ${obtenerJugador.tag}`, `:moneybag:: ${jugadores[i].dinero}`)
        }
        interaction.editReply({ embeds: [embedMensaje] })
    }
}