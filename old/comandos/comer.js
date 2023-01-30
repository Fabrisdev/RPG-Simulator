module.exports = {
    aliases: ["eat"],
    run: async (msg, args) => {
        const userID = msg.author.id
        const userSnap = client.jugadores.get(userID)
        const userConsumibles = userSnap.consumibles
        const comidaSeleccionada = args[0]
        let cantidad = args[1]

        if(!comidaSeleccionada) return
        if(cantidad)
            if(cantidad != "max")
                //Revisar si no es entero
                if(cantidad % 1 != 0) return
        const consumibleSnap = client.items.get(comidaSeleccionada)

        //Revisar si tiene esa comida
        if(userConsumibles[comidaSeleccionada]){
            if(cantidad){
                if(cantidad === "max"){
                    const saludMaxima = 40 + userSnap.nivel * 5
                    const saludSinRellenar = saludMaxima - userSnap.salud
                    cantidad = Math.ceil(saludSinRellenar / consumibleSnap.curacion)
                    if(cantidad <= 0){
                        return msg.reply("Estás lleno.")
                    }
                    if(userConsumibles[comidaSeleccionada].cantidad < cantidad){
                        msg.reply(`Intentaste comer hasta llenarte pero no tenías suficiente comida.\nHas comido ${consumibleSnap.emoji} ${consumibleSnap.nombre} (x${cantidad}).\nHas regenerado ${consumibleSnap.curacion * cantidad} HP.`)
                        msg.react("<a:checkmark:930793535718961153>")
                        client.jugadores.get(userID).incrementarSalud(consumibleSnap.curacion * cantidad)
                        client.jugadores.get(userID).incrementarConsumibles(comidaSeleccionada, -cantidad)
                        return
                    }
                    msg.reply(`Has comido ${consumibleSnap.emoji} ${consumibleSnap.nombre} (x${cantidad}).\nHas regenerado toda tu vida.`)
                    msg.react("<a:checkmark:930793535718961153>")
                    client.jugadores.get(userID).incrementarSalud(consumibleSnap.curacion * cantidad)
                    client.jugadores.get(userID).incrementarConsumibles(comidaSeleccionada, -cantidad)
                    return
                }
                if(userConsumibles[comidaSeleccionada].cantidad < cantidad){
                    msg.reply("¡No tienes tanta comida!")
                    return msg.react("<:nope:930794572198596619>")
                }
                if(cantidad <= 0){
                    msg.reply("¡No puedes comer algo que no existe!")
                    return msg.react("<:nope:930794572198596619>")
                }
                const saludMaxima = 40 + userSnap.nivel * 5
                const saludSinRellenar = saludMaxima - userSnap.salud
                const cantidadNecesitada = Math.ceil(saludSinRellenar / consumibleSnap.curacion)
                if(cantidad > cantidadNecesitada){
                    if(cantidadNecesitada <= 0){
                        return msg.reply("Estás lleno.")
                    }
                    msg.reply(`Has intentado comer más de lo que necesitabas. Por lo que te hemos puesto a dieta.\nHas comido ${consumibleSnap.emoji} ${consumibleSnap.nombre} (x${cantidadNecesitada}).\nHas regenerado toda tu vida.`)
                    client.jugadores.get(userID).incrementarSalud(consumibleSnap.curacion * cantidadNecesitada)
                    client.jugadores.get(userID).incrementarConsumibles(comidaSeleccionada, -cantidadNecesitada)
                    return msg.react("<a:checkmark:930793535718961153>")
                }
                client.jugadores.get(userID).incrementarSalud(consumibleSnap.curacion * cantidad)
                client.jugadores.get(userID).incrementarConsumibles(comidaSeleccionada, -cantidad)
                msg.reply(`Has comido ${consumibleSnap.emoji} ${consumibleSnap.nombre} (x${cantidad}).\nHas regenerado ${consumibleSnap.curacion * cantidad} HP.`)
                msg.react("<a:checkmark:930793535718961153>")
                return
            }
            if(userConsumibles[comidaSeleccionada].cantidad < 1){
                msg.reply("¡No tienes tanta comida!")
                return msg.react("<:nope:930794572198596619>")
            }
            const saludMaxima = 40 + userSnap.nivel * 5
            const saludSinRellenar = saludMaxima - userSnap.salud
            const cantidadNecesitada = Math.ceil(saludSinRellenar / consumibleSnap.curacion)
            if(cantidadNecesitada <= 0){
                return msg.reply("Estás lleno.")
            }
            client.jugadores.get(userID).incrementarSalud(consumibleSnap.curacion)
            client.jugadores.get(userID).incrementarConsumibles(comidaSeleccionada, -1)
            msg.reply(`Has comido ${consumibleSnap.emoji} ${consumibleSnap.nombre} (x1).\nHas regenerado ${consumibleSnap.curacion} HP.`)
            msg.react("<a:checkmark:930793535718961153>")
            return
        }
        msg.reply("¡No tienes esa comida!")
        msg.react("<:nope:930794572198596619>")
    }
}
