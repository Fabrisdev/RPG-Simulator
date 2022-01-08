module.exports = {
    run: (msg, args) => {
            const nivelAPoner = parseInt(args[0], 10)
            if(!isNaN(nivelAPoner)){
                if(!(msg.member.roles.cache.some(role => role.name === "debug"))) return
                const userID = msg.author.id   
                if(nivelAPoner >= 0){
                    db.collection("usuarios").doc(userID).update({ nivel: nivelAPoner })
                    msg.channel.send(`Tu nivel ha sido cambiado a ${nivelAPoner} satisfactoriamente!`)
                }     
            }
    }
}  