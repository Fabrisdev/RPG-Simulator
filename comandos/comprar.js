module.exports = {
    aliases: ["buy"],
    run: async (msg, args) => {
        const comprarItem = async itemID => {
            if(itemID < 1 || itemID > 2) return
            const userID = msg.author.id
            const userSnap = await db.collection("usuarios").doc(userID).get()
            const dinero = userSnap.data().dinero
        }
        comprarItem(args[0])
    }
}