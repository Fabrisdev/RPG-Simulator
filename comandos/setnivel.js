module.exports = {
    run: (msg, args) => {
            const nivelAPoner = parseInt(args[0], 10)
            if(!isNaN(nivelAPoner)){
                if(!(msg.member.roles.cache.some(role => role.name === "debug"))) return 
                if(nivelAPoner >= 0){
                    const userID = msg.author.id  
                    client.jugadores.get(userID).nivel = nivelAPoner
                    msg.channel.send(`Tu nivel ha sido cambiado a ${nivelAPoner} satisfactoriamente!`)
                }     
            }
    }
}  