module.exports = class Server {
    prefix = 'rpg '
    constructor(serverId){
        this.serverId = serverId
        db.collection("servidores").doc(serverId).get().then(snap => {
            if(snap.exists && snap.data().prefix) this.prefix = snap.data().prefix
            else db.collection("servidores").doc(serverId).set({ prefix: this.prefix })
        })
    }
    
    get guild(){
        return client.guilds.cache.get(this.guildId)
    }

    setPrefix(prefix){
        this.prefix = prefix.toLowerCase()
        db.collection("servidores").doc(this.serverId).update({ prefix: this.prefix })
    }
}