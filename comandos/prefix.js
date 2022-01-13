module.exports = {
    run: (msg, args) => {
        const serverID = msg.guild.id
        const cmd = args[0]
        if(!msg.member.permissions.has("MANAGE_GUILD"))
            return msg.channel.send("No puedes ejecutar ese comando ya que no tienes el permiso necesario. (`MANAGE_GUILD`)")
        
        if(cmd === "set"){
            const nuevaPrefix = args[1].toLowerCase()
            client.servers.get(serverID).prefix = nuevaPrefix
            return msg.channel.send(`La prefix ha sido cambiada a ${nuevaPrefix} satisfactoriamente!`)
        }
        if(cmd === "reset"){
            client.servers.get(serverID).prefix = "rpg "
            return msg.channel.send("La prefix ha sido devuelta a la por defecto satisfactoriamente!")
        }
    }
}