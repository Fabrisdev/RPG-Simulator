module.exports = {
    aliases: ["diario"],
    run: async (msg, args) => {
        const userID = msg.author.id
        const userSnap = client.jugadores.get(userID)
        const tiempoAhora = Math.ceil(Date.now() / 1000)

        //Revisar si no ha usado el comando antes o ya ha pasado el tiempo
        if(userSnap.ultimoDaily === undefined || tiempoAhora - userSnap.ultimoDaily >= 86400){
            const dineroDado = utils.generarNumeroRandom(50, 300)
            const xpDada = utils.generarNumeroRandom(10, 30)
            msg.react("<a:checkmark:930793535718961153>")
            const embedRecompenzas = new Discord.MessageEmbed()
                .setTitle("<:waaa:931291213531865098> Recompenzas diarias recibidas <:waaa:931291213531865098>")
                .setColor(0x00AE86)
                .setFooter("¡Disfruta tus recompenzas!", client.user.avatarURL())
                .setTimestamp()
                .setDescription(`Has recibido: +${xpDada} XP y +$${dineroDado}`)
            client.jugadores.get(userID).incrementarDinero(dineroDado)
            client.jugadores.get(userID).incrementarXP(xpDada)
            msg.channel.send({ content: "Has reclamado tus recompenzas diarias satisfactoriamente!", embeds: [embedRecompenzas] })
            return client.jugadores.get(userID).ultimoDaily = tiempoAhora
        }

        msg.channel.send("Lo siento, ya has reclamado tus recompenzas diarias. Vuelve mañana!")
    }
}