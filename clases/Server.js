module.exports = class Server {
    _prefix = 'rpg '
    constructor(serverId){
        this.serverId = serverId
        db.collection("servidores").doc(serverId).get().then(snap => {
            if(snap.exists && snap.data()._prefix) this._prefix = snap.data()._prefix
            else db.collection("servidores").doc(serverId).set({ _prefix: this._prefix })
        })
    }
    
    get guild(){
        return client.guilds.cache.get(this.guildId)
    }

    get prefix(){
        return this._prefix
    }

    set prefix(prefix){
        this._prefix = prefix.toLowerCase()
        db.collection("servidores").doc(this.serverId).update({ prefix: this._prefix })
    }
}