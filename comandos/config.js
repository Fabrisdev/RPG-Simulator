module.exports = {
    run: (msg, args) => {
        const serverID = msg.guild.id
        const cmd = args[0]
        const arguments = args[1]
        if(!msg.member.permissions.has("MANAGE_GUILD"))
            return msg.channel.send("No puedes ejecutar ese comando ya que no tienes el permiso necesario. (`MANAGE_GUILD`)")
        
        if(cmd === "prefix"){
            if(arguments === "set"){
                const nuevaPrefix = args[2].toLowerCase()
                client.servers.get(serverID).prefix = nuevaPrefix
                return msg.channel.send(`La prefix ha sido cambiada a ${nuevaPrefix} satisfactoriamente!`)
            }
            if(arguments === "reset"){
                client.servers.get(serverID).prefix = "rpg "
                return msg.channel.send("La prefix ha sido devuelta a la por defecto satisfactoriamente!")
            }
        }
        if(cmd === "canal"){
            if(arguments === "set"){
                const canal = args[2]
                const canalID = canal.replace(/\D/g,'')
                client.servers.get(serverID).canalBot = canalID
                return msg.channel.send(`El canal para jugar con el bot ha sido seleccionado como ${canal} satisfactoriamente!`)
            }
            if(arguments === "reset"){
                client.servers.get(serverID).canalBot = "all"
                return msg.channel.send("El canal para jugar con el bot ha sido seleccionado como ALL satisfactoriamente!")
            }
        }
    }
}