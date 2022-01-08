module.exports = {
    aliases: ["fight"],
    run: async (msg, args) => {
        const userID = msg.author.id
        const userSnap = await db.collection("usuarios").doc(userID).get()
        const salud = userSnap.data().salud
        const nivel = userSnap.data().nivel
        const xp = userSnap.data().xp
        const personajes = ["seguidor de la grasa"]
        const dineroDado = utils.generarNumeroRandom(25,65)
        const xpDada = utils.generarNumeroRandom(6, 14)
        const maxXP = Math.round((1.2**nivel)*100)
        const vidaConsumida = utils.generarNumeroRandom(4,17)

        if(!(args[0] === "--nocooldown") || !(msg.member.roles.cache.some(role => role.name === "debug"))){ //Si las args no son --nc o no tiene el rol debug (o ambas)
            if(peleoRecientemente.has(userID))
                return msg.channel.send("Por favor espera 30s antes de volver a pelear")
        
            peleoRecientemente.add(userID)
            setTimeout(() => {
                peleoRecientemente.delete(userID)
            }, 30000)
        }

        if(salud - vidaConsumida <= 0){
            msg.react("❌")
            msg.react("☠️")
            msg.channel.send(`Luchaste contra un ${utils.elegirRandom(personajes)} y perdiste.`)
            msg.channel.send("Has muerto, sin embargo no has perdido un nivel ya que estás en el nivel minimo.")
            if(nivel - 1 <= 0){
                msg.channel.send("Tu vida ha sido restaurada. **`Nivel actual`**: `0`")
                db.collection("usuarios").doc(userID).update({
                    nivel: 0,
                    salud: 40
                })
            }else{
                msg.channel.send("Tu vida ha sido restaurada. **`Nivel actual`**: `"+(nivel-1)+"`")
                db.collection("usuarios").doc(userID).update({
                    nivel: FieldValue.increment(-1),
                    salud: FieldValue.increment(40+((nivel-1)*5))
                })
            }
            db.collection("usuarios".doc(userID).update({ xp: 0 }))
            return
        }

        msg.channel.send(`Luchaste contra un ${utils.elegirRandom(personajes)} y ganaste.`)
        msg.channel.send("Perdiste "+vidaConsumida+" puntos de vida. **`Vida restante`**: `"+(salud - vidaConsumida)+"`")
        msg.channel.send(`Conseguiste +$${dineroDado} y +${xpDada} XP`)
        db.collection("usuarios").doc(userID).update({
            dinero: FieldValue.increment(dineroDado),
            xp: FieldValue.increment(xpDada),
            salud: FieldValue.increment(-vidaConsumida)
        })

        if(!((xp+xpDada) >= maxXP)) return
        db.collection("usuarios").doc(userID).update({
            nivel: FieldValue.increment(1),
            xp: 0,
            salud: 40+((nivel+1)*5)
        })
        msg.channel.send(`**Has subido de nivel! **+5 MAX HP. NIVEL ACTUAL: **${nivel+1}**`)
        msg.channel.send("Tu vida ha sido restaurada.")
    }
}