const { Collection } = require('discord.js')

module.exports = class ItemsManager extends Collection{
    constructor(){
        super();
        db.collection("items").get().then(itemsSnap => {
            itemsSnap.forEach(doc => {
                this.set(doc.id, doc.data())
            })
        })
    }
}