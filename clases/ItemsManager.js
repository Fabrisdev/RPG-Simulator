const { Collection } = require('discord.js')
const admin = require("firebase-admin")
const db = admin.firestore()

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