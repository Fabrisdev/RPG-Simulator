const { Collection } = require('discord.js')
const Player = require("./Player.js")

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