module.exports = {
    aliases: ["eat"],
    run: async (msg, args) => {
        const userID = msg.author.id
        const comidaDiccionario = ["salchipapa", "hamburguesa :hamburger:", "pizza :pizza:", "loli :flushed:", "lechepapu :milk:"]
        const userSnap = await db.collection("usuarios").doc(userID).get()
        const nivel = userSnap.data().nivel
        const salud = userSnap.data().salud
        const vidaRegenerada = utils.generarNumeroRandom(10, 23)

        if(salud >= 40+(nivel*5)) return msg.channel.send("Estás lleno.")

        if(salud + vidaRegenerada > 40+(nivel*5)){
            db.collection("usuarios").doc(userID).update({ salud: 40+(nivel*5) })
            msg.react("👌")
            msg.channel.send(`Te comiste una ${utils.elegirRandom(comidaDiccionario)} y recuperaste toda tu vida.`)
            return
        }

        db.collection("usuarios").doc(userID).update({
            salud: FieldValue.increment(vidaRegenerada)
        })
        msg.react("👌")
        msg.channel.send(`Te comiste una ${utils.elegirRandom(comidaDiccionario)} y recuperaste ${vidaRegenerada} puntos de vida.`)
    }
}
