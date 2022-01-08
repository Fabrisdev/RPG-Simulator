module.exports = {
    aliases: ["buy"],
    run: async (msg, args) => {
        const userID = msg.author.id
        const comprarItem = async itemID => {
            const itemSnap = await db.collection("items").doc(itemID).get()
            if(!itemSnap.exists) return
            
            const userSnap = await db.collection("usuarios").doc(userID).get()

            //Revisar si tiene suficiente dinero
            if(userSnap.data().dinero < itemSnap.data().precio) return msg.channel.send("No tienes suficiente dinero para comprar ese item.")

            //Revisar si tiene el item
            for(let i = 0; i < userSnap.data().items.length; i++){
                if(userSnap.data().items[i] == itemID) return msg.channel.send("Ya tienes ese item.")
            }

            db.collection("usuarios").doc(userID).update({
                dinero: FieldValue.increment(-itemSnap.data().precio),
                items: FieldValue.arrayUnion(parseInt(itemID, 10))
            })

            msg.channel.send(`Has comprado el item: ${itemSnap.data().nombre} ${itemSnap.data().emoji}`)
            msg.channel.send(`${itemSnap.data().precio} social credits han sido restados de tu cuenta.`)
        }
        comprarItem(args[0])
    }
}