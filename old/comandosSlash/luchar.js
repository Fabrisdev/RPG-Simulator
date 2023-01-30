module.exports = {
    data: new SlashCommands.SlashCommandBuilder()
        .setName("luchar")
        .setDescription("Pelea contra enemigos. Consigue XP y social credits."),
    async execute(interaction) {
        await interaction.deferReply()
        const userID = interaction.user.id
        const userSnap = await db.collection("usuarios").doc(userID).get()
        const salud = userSnap.data().salud
        const nivel = userSnap.data().nivel
        const xp = userSnap.data().xp
        const personajes = ["seguidor de la grasa"]
        const dineroDado = utils.generarNumeroRandom(25,65)
        const xpDada = utils.generarNumeroRandom(6, 14)
        const maxXP = Math.round((1.2**nivel)*100)
        const vidaConsumida = utils.generarNumeroRandom(4,17)
        let mensaje = ""

        if(peleoRecientemente.has(userID))
            return interaction.editReply({ content:"Por favor espera 30s antes de volver a pelear", ephemeral: true })
        
        peleoRecientemente.add(userID)
        setTimeout(() => {
            peleoRecientemente.delete(userID)
        }, 30000)

        if(salud - vidaConsumida <= 0){
            mensaje = mensaje+`Luchaste contra un ${utils.elegirRandom(personajes)} y perdiste.\nHas muerto, sin embargo no has perdido un nivel ya que estás en el nivel minimo.`
            if(nivel - 1 <= 0){
                mensaje = mensaje+"\nTu vida ha sido restaurada. **`Nivel actual`**: `0`"
                db.collection("usuarios").doc(userID).update({
                    nivel: 0,
                    salud: 40
                })

            }else{
                mensaje = mensaje+"\nTu vida ha sido restaurada. **`Nivel actual`**: `"+(nivel-1)+"`"
                db.collection("usuarios").doc(userID).update({
                    nivel: FieldValue.increment(-1),
                    salud: FieldValue.increment(40+((nivel-1)*5))
                })
            }
            db.collection("usuarios".doc(userID).update({ xp: 0 }))
            return interaction.editReply(mensaje)
        }

        mensaje = mensaje+`Luchaste contra un ${utils.elegirRandom(personajes)} y ganaste.`
        mensaje = mensaje+"\nPerdiste "+vidaConsumida+" puntos de vida. **`Vida restante`**: `"+(salud - vidaConsumida)+"`"
        if(nivel == 50){
            db.collection("usuarios").doc(userID).update({
                dinero: FieldValue.increment(dineroDado),
                salud: FieldValue.increment(-vidaConsumida)
            })
            mensaje = mensaje+`\nConseguiste +$${dineroDado}.`
            return interaction.editReply(mensaje)
        }
        db.collection("usuarios").doc(userID).update({
            dinero: FieldValue.increment(dineroDado),
            xp: FieldValue.increment(xpDada),
            salud: FieldValue.increment(-vidaConsumida)
        })
        mensaje = mensaje+`\nConseguiste +$${dineroDado} y +${xpDada} XP`

        if(!((xp+xpDada) >= maxXP)) return interaction.editReply(mensaje)
        db.collection("usuarios").doc(userID).update({
            nivel: FieldValue.increment(1),
            xp: 0,
            salud: 40+((nivel+1)*5)
        })
        mensaje = mensaje+`\n**Has subido de nivel! **+5 MAX HP. NIVEL ACTUAL: **${nivel+1}**`
        mensaje = mensaje+"\nTu vida ha sido restaurada."
        interaction.editReply(mensaje)
    }
}