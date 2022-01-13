module.exports = async (msg) => {
    if(!msg.guild) return
    if(msg.author.bot) return
    const serverID = msg.guild.id
    const prefix = client.servers.get(serverID).prefix
    if(msg.content.includes(`<@!${client.user.id}>`)) msg.channel.send(`La prefix actualmente es: ${prefix}`)
    const userID = msg.author.id
    const userSnap = client.jugadores.get(String(userID))
    if(!msg.content.toLowerCase().startsWith(prefix)) return

    //Preparar usuario para el juego
    if(!userSnap){ //El usuario nunca ha jugado
        await msg.channel.send("¡Hey! Parece que eres nuevo aquí. Deja que te explique como funcionan las cosas aquí...")
        msg.channel.sendTyping()
        const embedBienvenida = new Discord.MessageEmbed()
            .setTitle(`¡Hey ${msg.author.username}! ¡Bienvenido a RPG Simulator!`)
            .setColor(0x00AE86)
            .setDescription("El propósito del juego es luchar, mejorar tus armas y avanzar de mundo a nuevos más dificiles pero con más recursos.\nHay un total de **10** mundos (tú empiezas en el #1).")
            .addFields(
                { name: "__COMO JUGAR__", value: ":star: Obten XP y monedas luchando contra enemigos para mejorar tu armadura y avanzar en el juego. Puedes revisar tus estádisticas con `perfil`.\n:warning: **Si mueres, perderás un nivel**. Compra comida en la `tienda` para recuperar tu vida."},
                { name: "__TIENDA Y MONEDAS__", value: ":star: Gasta tus :coin: monedas conseguidas en la `tienda`.\n:star: En ella puedes comprar desde comida hasta **espadas y armadura legendaria**." },
                { name: "__DUNGEONS Y MUNDOS__", value: ":star: Cuando creas estar preparado, compra un **portal** en la `tienda` el cual te llevará hacia tu próxima **dungeon con un jefe**.\n:star: Si logras vencerlo, desbloquearás un **nuevo mundo** al que podrás ir, con muchos mayores recursos :palm_tree:, nuevas herramientas :axe: y nuevos enemigos!" },
                { name: "__MÁS__", value: ":star: Revisa todos los comandos usando `ayuda`. Te será de gran utilidad.\n:star: Si tienes dudas, puedes revisar la :globe_with_meridians: **[página web](https://rpgsimulator.w3spaces.com)**" }
            )
        await utils.sleep(1500)
        msg.channel.send({ embeds: [embedBienvenida] })

        const Player = require("../clases/Player.js")
        const defaultItems = {
            salud: 40,
            dinero: 0,
            nivel: 0,
            xp: 0,
            items: {}
        }
        client.jugadores.set(String(userID), new Player(String(userID), defaultItems))
        db.collection("usuarios").doc(userID).set({ ...defaultItems })
        return
    }

    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    //Manejando eventos
    let cmd = client.comandos.get(command) || client.comandos.find(a => a.aliases && a.aliases.includes(command))
    if(!cmd) return

    // Ejecuta el comando enviando el client, el mensaje y los argumentos.
    try{
        await cmd.run(msg, args)
    }catch(error){
        console.error(`[CMD] Ha ocurrido un error mientras ${msg.author.tag} ejecutaba el comando ${command}. Para más información leer debajo:`)
		console.error(error)
        msg.channel.send("Hubo un error mientras se ejecutaba el comando. Por favor, contacta con Fabri (Fabri#6560).")
    }
}