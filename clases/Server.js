const admin = require("firebase-admin")
const db = admin.firestore()

module.exports = class Server {
    _prefix = 'rpg '
    constructor(serverId){
        this.serverId = serverId
        db.collection("servidores").doc(serverId).get().then(snap => {
            if(snap.exists && snap.data().prefix) this._prefix = snap.data().prefix
            else db.collection("servidores").doc(serverId).set({ prefix: this._prefix })
        })
    }
    
    get guild(){
        return client.guilds.cache.get(this.guildId)
    }

    get prefix(){
        return this._prefix
    }

    set prefix(prefix){
        this._prefix = prefix
        db.collection("servidores").doc(this.serverId).update({ prefix: this._prefix })
    }
}