module.exports = {
    run: (msg, args) => {
        const serverID = msg.guild.id
        const cmd = args[0]
        if(cmd === "set"){
            const nuevaPrefix = args[1]
            client.servers.get(serverID).setPrefix(nuevaPrefix)
            return msg.channel.send(`La prefix ha sido cambiada a ${nuevaPrefix} satisfactoriamente!`)
        }
        if(cmd === "reset"){
            client.servers.get(serverID).setPrefix("rpg ")
            return msg.channel.send("La prefix ha sido devuelta a la por defecto satisfactoriamente!")
        }
    }
}