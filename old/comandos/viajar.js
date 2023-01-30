module.exports = {
    aliases: ["travel, explorar"],
    run: async (msg, args) => {
        const mundoSeleccionado = parseInt(args[0], 10)
        const userID = msg.author.id
        const userSnap = client.jugadores.get(userID)
        const mundoActual = userSnap.mundo
        if(!mundoSeleccionado) {
            msg.channel.send("Debes seleccionar un mundo a donde viajar.")
            msg.channel.send(`(Te encuentras en el mundo número ${mundoActual})`)
            return
        }

        //Revisar si es un número y si existe
        if(isNaN(mundoSeleccionado) || mundoSeleccionado > 10 || mundoSeleccionado < 1) return msg.channel.send("Ese mundo no existe.")
    
        //Revisar si ya llegó a ese mundo
        if(mundoSeleccionado > userSnap.ultimoMundo){
            return msg.channel.send("¡Aún no has llegado hasta allí! Vence al dragón de ese mundo para poder viajar hacia él.")
        }
        
        //Revisar si ya está en ese mundo
        if(mundoSeleccionado == userSnap.mundo) return msg.channel.send("¡Ya estás ahí!")

        //Viajar
        msg.channel.send(`VIAJANDO A MUNDO ${mundoSeleccionado}...`)
        await utils.sleep(500)
        msg.channel.send("Llegando...")
        await utils.sleep(500)
        msg.channel.send("Aterrizando...")
        await utils.sleep(500)
        msg.channel.send(`¡Has llegado al mundo ${mundoSeleccionado}!`)
        client.jugadores.get(userID).mundo = mundoSeleccionado
    }
}