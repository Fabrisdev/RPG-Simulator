module.exports = {
    aliases: ["eat"],
    run: async (msg, args) => {
        const userID = msg.author.id
        const comidaDiccionario = ["salchipapa", "hamburguesa :hamburger:", "pizza :pizza:", "loli :flushed:", "lechepapu :milk:"]
        const userSnap = client.jugadores.get(String(userID))
        const nivel = userSnap.nivel
        const salud = userSnap.salud
        const vidaRegenerada = utils.generarNumeroRandom(10, 23)

        if(salud >= 40+(nivel*5)) return msg.channel.send("Estás lleno.")

        if(salud + vidaRegenerada >= 40+(nivel*5)){
            client.jugadores.get(String(userID)).salud = 40+(nivel*5)
            msg.react("👌")
            return msg.channel.send(`Te comiste una ${utils.elegirRandom(comidaDiccionario)} y recuperaste toda tu vida.`)
        }

        client.jugadores.get(String(userID)).incrementarSalud(vidaRegenerada)
        msg.react("👌")
        msg.channel.send(`Te comiste una ${utils.elegirRandom(comidaDiccionario)} y recuperaste ${vidaRegenerada} puntos de vida.`)
    }
}
