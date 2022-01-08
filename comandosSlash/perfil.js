module.exports = {
    data: new SlashCommands.SlashCommandBuilder()
        .setName("perfil")
        .setDescription("Ve tu perfil o el de un usuario.")
        .addUserOption(opcion => opcion.setName("usuario").setDescription("El usuario de quien quieras ver su perfil")),
    async execute(interaction) {
        await interaction.deferReply()
        const usuarioSeleccionado = interaction.options.getUser("usuario") || interaction.user
        const userSnap = await db.collection("usuarios").doc(usuarioSeleccionado.id).get()
        if(!userSnap.exists) return interaction.editReply({ content: "Esa persona no ha empezado a jugar aún!", ephemeral: true })

        const nivel = userSnap.data().nivel
        const maxXP = Math.round((1.2**nivel)*100)
        const xp = userSnap.data().xp
        const dinero = userSnap.data().dinero
        const salud = userSnap.data().salud
        const embedMensaje = new Discord.MessageEmbed()
            .setTitle(`Perfil de ${usuarioSeleccionado.tag}:`)
            .setAuthor(usuarioSeleccionado.username, usuarioSeleccionado.displayAvatarURL())
            .setColor("#783B9F")
            .setThumbnail(usuarioSeleccionado.displayAvatarURL())
        if(nivel != 50)
            embedMensaje.addField("__PROGRESO__", `**Nivel**: ${nivel} (${Math.round((100 * xp)/maxXP)}%)\n**XP**: ${xp}/${maxXP}`)
        else
            embedMensaje.addField("__PROGRESO__", `**Nivel**: MAX (50)\n**XP**: MAX/MAX`)
        embedMensaje.addField("__ESTADISTICAS__", `:heart: **SALUD**: ${salud}/${40+(nivel*5)}\n:moneybag: **DINERO**: $${dinero}`)
        interaction.editReply({ embeds: [embedMensaje] })
    }
}