const peleoRecientemente = new Set()

module.exports = {
    aliases: ["fight"],
    run: async (msg, args) => {
        const userID = msg.author.id

        if(!(args[0] === "--nocooldown") || !(msg.member.roles.cache.some(role => role.name === "debug"))){ //Si las args no son --nc o no tiene el rol debug (o ambas)
            if(peleoRecientemente.has(userID))
                return msg.channel.send("Por favor espera 30s antes de volver a pelear")
        
            peleoRecientemente.add(userID)
            setTimeout(() => {
                peleoRecientemente.delete(userID)
            }, 30000)
        }

        const userSnap = client.jugadores.get(String(userID))
        const salud = userSnap.salud
        const nivel = userSnap.nivel
        const xp = userSnap.xp
        const personajes = [
            { victoria: "Luchaste contra un seguidor de la grasa y ganaste", derrota: "Luchaste contra un seguidor de la grasa pero esta mañana se había tomado su leche papu por lo que perdiste"},
            { victoria: "Hiciste enojar a Dann y lo terminaron baneando a él", derrota: "Hiciste enojar a Dann y te mató (igual lo banearon más tarde)" },
            { victoria: "Hiciste unos buenos momazos y te donaron tus subs", derrota: "Hiciste unos horribles momazos y todos tus subs te odian ahora >:v" }
        ]
        const dineroDado = utils.generarNumeroRandom(25,65)
        const xpDada = utils.generarNumeroRandom(6, 14)
        const maxXP = Math.round((1.2**nivel)*100)
        const vidaConsumida = utils.generarNumeroRandom(4,17)

        let mensaje = ""
        const embedMensaje = new Discord.MessageEmbed()
            .setColor(0x00AE86)
            .setFooter("RPG-Simulator", client.user.avatarURL())
            .setTimestamp()

        if(salud - vidaConsumida <= 0){
            msg.react("<:nope:930794572198596619>")
            msg.react("☠️")
            embedMensaje.setTitle("<:Ay:930795645885878292> Derrota <:Ay:930795645885878292>")
            embedMensaje.setColor(16717904)
            mensaje = mensaje+"**"+utils.elegirRandom(personajes)["derrota"]+"**\n"
            if(nivel - 1 <= 0){
                mensaje = mensaje+"Tu vida ha sido restaurada. **`Nivel actual`**: `0`\n"
                mensaje = mensaje+"Has muerto, sin embargo no has perdido un nivel ya que estás en el nivel minimo.\n"
                client.jugadores.get(String(userID)).nivel = 0
                client.jugadores.get(String(userID)).salud = 40
            }else{
                mensaje = mensaje+"Tu vida ha sido restaurada. **`Nivel actual`**: `"+(nivel-1)+"`\n"
                client.jugadores.get(String(userID)).incrementarNivel(-1)
                client.jugadores.get(String(userID)).incrementarSalud(40+((nivel-1)*5))
            }
            client.jugadores.get(String(userID)).xp = 0
            embedMensaje.setDescription(mensaje)
            return msg.channel.send({ embeds: [embedMensaje] })
        }

        msg.react("<a:checkmark:930793535718961153>")
        embedMensaje.setTitle("<a:party:930795123531468870> Victoria <a:party:930795123531468870>")
        mensaje = mensaje +"**"+utils.elegirRandom(personajes)["victoria"]+"**\n"
        mensaje = mensaje+"Perdiste "+vidaConsumida+" puntos de vida. **`Vida restante`**: `"+(salud - vidaConsumida)+"`\n"
        mensaje = mensaje+`Conseguiste +$${dineroDado} y +${xpDada} XP\n`
        client.jugadores.get(String(userID)).incrementarDinero(dineroDado)
        client.jugadores.get(String(userID)).incrementarXP(xpDada)
        client.jugadores.get(String(userID)).incrementarSalud(-vidaConsumida)

        embedMensaje.setDescription(mensaje)
        if(!((xp+xpDada) >= maxXP)) return msg.channel.send({ embeds: [embedMensaje] })

        client.jugadores.get(String(userID)).incrementarNivel(1)
        client.jugadores.get(String(userID)).xp = 0
        client.jugadores.get(String(userID)).salud = 40+((nivel+1)*5)
        mensaje = mensaje+`\n**Has subido de nivel! **+5 MAX HP\n**Nivel actual**: ${nivel+1}\n`
        mensaje = mensaje+"Tu vida ha sido restaurada.\n"
        embedMensaje.setDescription(mensaje)
        msg.channel.send({ embeds: [embedMensaje] })
    }
}