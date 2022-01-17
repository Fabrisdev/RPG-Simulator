const { Collection } = require('discord.js')
const Player = require("./Player.js")
const admin = require("firebase-admin")
const db = admin.firestore()

module.exports = class ItemsManager extends Collection{
    constructor(){
        super();
        db.collection("usuarios").get().then(usersSnap => {
            usersSnap.forEach(doc => {
                this.set(doc.id, new Player(doc.id, doc.data()))
            })
        })
    }
}