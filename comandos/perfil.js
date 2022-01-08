module.exports = {
    aliases: ["p"],
    run: async (msg, args) => {
        let usuarioSeleccionado = msg.mentions.users.first()
        if(!usuarioSeleccionado) usuarioSeleccionado = msg.author
        const usuarioID = usuarioSeleccionado.id
        const userSnap = await db.collection("usuarios").doc(usuarioID).get()
        if(!userSnap.exists) return msg.channel.send("Esa persona no ha empezado a jugar aún!")

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
            .addFields(
                { name: "__PROGRESO__", value: `**Nivel**: ${nivel} (${Math.round((100 * xp)/maxXP)}%)\n**XP**: ${xp}/${maxXP}` },
                { name: "__ESTADISTICAS__", value: `:heart: **SALUD**: ${salud}/${40+(nivel*5)}\n:moneybag: **SOCIAL CREDITS**: +${dinero}`}
            )
        msg.channel.send({ embeds: [embedMensaje] })
    }
}