module.exports = {
    aliases: ["buy"],
    run: async (msg, args) => {
        const userID = msg.author.id
        const comprarItem = async (itemID, cantidad) => {
            const itemSnap = client.items.get(itemID)
            
            //Revisar si el item existe
            if(!itemSnap) return

            const userSnap = client.jugadores.get(userID)

            //Revisar si tiene suficiente dinero
            if(itemSnap.tipo != "Consumibles"){
                if(userSnap.dinero < itemSnap.precio) return msg.channel.send("No tienes suficiente dinero para comprar ese item.")
            }else{
                if(userSnap.dinero < itemSnap.precio * cantidad) return msg.channel.send("No tienes suficiente dinero para comprar ese item.") 
            }

            //Revisar si no es consumible y si ya lo tiene
            if(itemSnap.tipo != "Consumibles"){
                if(userSnap.items.hasOwnProperty(itemID)) return msg.channel.send("Ya tienes ese item.")
                client.jugadores.get(userID).incrementarItems(itemID)
                client.jugadores.get(userID).incrementarDinero(-itemSnap.precio)
                msg.channel.send(`Has comprado el item: ${itemSnap.nombre} ${itemSnap.emoji}`)
                msg.channel.send(`${itemSnap.precio} social credits han sido restados de tu cuenta.`)
                return
            }
            if(cantidad <= 0) return msg.channel.send("No puedes comprar por esa cantidad.")
            client.jugadores.get(userID).incrementarConsumibles(itemID, cantidad)
            client.jugadores.get(userID).incrementarDinero(-itemSnap.precio * cantidad)
            msg.channel.send(`Has comprado el consumible ${itemSnap.nombre} (x${cantidad})`)
            msg.channel.send(`${itemSnap.precio * cantidad} social credits han sido restados de tu cuenta.`)
        }

        comprarItem(args[0], parseInt(args[1], 10) || 1)
    }
}