module.exports = async (msg) => {
    if(!msg.guild) return
    if(msg.author.bot) return
    const serverID = msg.guild.id
    const prefix = client.servers.get(serverID).prefix
    if(msg.content.includes(`<@!${client.user.id}>`)) msg.channel.send(`La prefix actualmente es: ${prefix}`)
    const userID = msg.author.id
    const userSnap = client.jugadores.get(userID)
    if(!msg.content.toLowerCase().startsWith(prefix)) return

    //Preparar usuario para el juego
    if(!userSnap){ //El usuario nunca ha jugado
        await utils.sleep(1000)
        if(client.jugadores.get(userID)) return //Si el usuario existe una vez que los datos se cargaron retornar
        await msg.channel.send("¡Hey! Parece que eres nuevo aquí. Deja que te explique como funcionan las cosas aquí...")
        msg.channel.sendTyping()
        const embedsAEnviar = require("../clases/embedsAEnviar.js")
        await utils.sleep(1500)
        msg.channel.send({ embeds: [await embedsAEnviar.bienvenida(msg)] })

        const Player = require("../clases/Player.js")
        const defaultItems = {
            salud: 40,
            dinero: 0,
            nivel: 0,
            xp: 0,
            items: {},
            mundo: 1,
            ultimoMundo: 1,
            consumibles: {}
        }        

        client.jugadores.set(userID, new Player(userID, defaultItems))
        const admin = require("firebase-admin")
        const db = admin.firestore()
        return db.collection("usuarios").doc(userID).set({ ...defaultItems })
    }

    if(userSnap.enMazmorra === true) return

    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    //Manejando eventos
    let cmd = client.comandos.get(command) || client.comandos.find(a => a.aliases && a.aliases.includes(command))
    if(!cmd) return

    // Ejecuta el comando enviando el client, el mensaje y los argumentos.
    try{
        await cmd.run(msg, args)
        console.log(client.items)
    }catch(error){
        console.error(`[CMD] Ha ocurrido un error mientras ${msg.author.tag} ejecutaba el comando ${command}. Para más información leer debajo:`)
		console.error(error)
        msg.channel.send("Hubo un error mientras se ejecutaba el comando. Por favor, contacta con Fabri (Fabri#6560).")
    }
}