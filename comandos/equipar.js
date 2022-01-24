module.exports = {
    aliases: ["equipo"],
    run: (msg, args) => {
        const userID = msg.author.id
        const tipoEquipo = args[0]
        const equipo = args[1]
        const itemSnap = client.items.get(equipo)

        //Si el item no existe
        if(!itemSnap) return

        //Si no tiene el item
        if(!client.jugadores.get(userID).items[equipo]) return msg.channel.send("¡No tienes ese item!")

        if(tipoEquipo === "arma"){
            if(itemSnap.tipo !== "Armas") return msg.channel.send("¡Eso no es un arma!")
            msg.channel.send("Te has equipado este arma satisfactoriamente.")
            client.jugadores.get(userID).equiparItem("Arma", equipo)
        }
        if(tipoEquipo === "armadura"){
            if(itemSnap.tipo !== "Armaduras") return msg.channel.send("¡Eso no es una armadura!")
            msg.channel.send("Te has equipado esta armadura satisfactoriamente.")
            client.jugadores.get(userID).equiparItem("Armadura", equipo)
        }
    }
}