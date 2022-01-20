module.exports = {
    aliases: ["p", "profile"],
    run: async (msg, args) => {
        let usuarioSeleccionado = msg.mentions.users.first()
        if(!usuarioSeleccionado) usuarioSeleccionado = msg.author
        const userID = usuarioSeleccionado.id
        const userSnap = client.jugadores.get(String(userID))
        if(!userSnap) return msg.channel.send("Esa persona no ha empezado a jugar aún!")

        const nivel = userSnap.nivel
        const maxXP = Math.round((1.2**nivel)*100)
        const xp = userSnap.xp
        const dinero = userSnap.dinero
        const salud = userSnap.salud
        const embedMensaje = new Discord.MessageEmbed()
            .setTitle(`Perfil de ${usuarioSeleccionado.tag}:`)
            .setAuthor(usuarioSeleccionado.username, usuarioSeleccionado.displayAvatarURL())
            .setColor("#783B9F")
            .setThumbnail(usuarioSeleccionado.displayAvatarURL())
            .addFields(
                { name: "__PROGRESO__", value: `**Nivel**: ${nivel} (${Math.round((100 * xp)/maxXP)}%)\n**XP**: ${xp}/${maxXP}` },
                { name: "__ESTADISTICAS__", value: `:heart: **SALUD**: ${salud}/${40+nivel*5}\n:moneybag: **SOCIAL CREDITS**: +${dinero}`}
            )
        msg.channel.send({ embeds: [embedMensaje] })
    }
}