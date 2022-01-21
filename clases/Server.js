const admin = require("firebase-admin")
const db = admin.firestore()

module.exports = class Server {
    _prefix = 'rpg '
    _canalBot = "all"
    constructor(serverId){
        this.serverId = serverId
        db.collection("servidores").doc(serverId).get().then(snap => {
            if(snap.exists){
                if(snap.data().prefix){
                    this._prefix = snap.data().prefix
                }
                if(snap.data().canalBot){
                    this._canalBot = snap.data().canalBot
                }
            }
            else db.collection("servidores").doc(serverId).set({ prefix: this._prefix, canalBot: "all" })
        })
    }
    
    get guild(){
        return client.guilds.cache.get(this.guildId)
    }

    get prefix(){
        return this._prefix
    }

    get canalBot(){
        return this._canalBot
    }

    set canalBot(value){
        this._canalBot = value
        db.collection("servidores").doc(this.serverId).update({ canalBot: this._canalBot })
    }

    set prefix(prefix){
        this._prefix = prefix
        db.collection("servidores").doc(this.serverId).update({ prefix: this._prefix })
    }
}