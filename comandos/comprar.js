module.exports = {
    aliases: ["buy"],
    run: async (msg, args) => {
        const userID = msg.author.id
        const comprarItem = async itemID => {
            const itemSnap = client.items.get(itemID)
            
            //Revisar si el item existe
            if(!itemSnap) return

            const userSnap = client.jugadores.get(String(userID))

            //Revisar si tiene suficiente dinero
            if(userSnap.dinero < itemSnap.precio) return msg.channel.send("No tienes suficiente dinero para comprar ese item.")

            //Revisar si tiene el item
            if(userSnap.items.hasOwnProperty(String(itemID))) return msg.channel.send("Ya tienes ese item.")

            client.jugadores.get(String(userID)).incrementarDinero(-itemSnap.precio)
            client.jugadores.get(String(userID)).incrementarItems(itemID)

            msg.channel.send(`Has comprado el item: ${itemSnap.nombre} ${itemSnap.emoji}`)
            msg.channel.send(`${itemSnap.precio} social credits han sido restados de tu cuenta.`)
        }

        if(args.length != 1) return
        comprarItem(args[0])
    }
}