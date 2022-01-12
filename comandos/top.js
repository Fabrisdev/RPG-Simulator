module.exports = {
    run: async (msg, args) => {
        const topTipo = args[0]
        if(topTipo === "socialcredits" || topTipo === "sc" || topTipo === "credits"){
            await msg.channel.send("Por favor, espera un momento. Esto puede llevar un tiempo...")
            msg.channel.sendTyping()
            const usersSnap = client.jugadores
            const jugadores = []
            usersSnap.forEach(player => {
                jugadores.push({ id: player.id, dinero: player.dinero })
            })
            jugadores.sort(utils.obtenerOrdenInverso("dinero")).slice(0,10)
            const embedDatos = new Discord.MessageEmbed()
                .setTitle(":star: __Top 10 jugadores con más social credits__ :star:")
                .setColor("#EC50DA")

            let mensaje = ""
            for(i = 0; i < jugadores.length; i++){
                const obtenerJugador = await client.users.fetch(jugadores[i].id)
                mensaje = mensaje+`**#${i+1}** ${obtenerJugador.tag}: :moneybag: +${jugadores[i].dinero}\n`
            }
            embedDatos.addField("\u200B", mensaje)
            msg.channel.send({ embeds: [embedDatos] })
            msg.channel.messages.fetch({ limit: 10 }).then(collected => {
                collected.forEach(msg => {
                    if(msg.content == "Por favor, espera un momento. Esto puede llevar un tiempo..." && msg.author.id == client.user.id){
                        msg.delete()
                    }
                })
            })
            return
        }

        if(topTipo === "nivel" || topTipo === "lvl" || topTipo === "level" || !topTipo){
            await msg.channel.send("Por favor, espera un momento. Esto puede llevar un tiempo...")
            msg.channel.sendTyping()
            const usersSnap = client.jugadores
            const jugadores = []
            usersSnap.forEach(player => {
                jugadores.push({ id: player.id, nivel: player.nivel })
            })
            jugadores.sort(utils.obtenerOrdenInverso("nivel")).slice(0,10)
            const embedDatos = new Discord.MessageEmbed()
                .setTitle(":star: __Top 10 jugadores con más niveles__ :star:")
                .setColor("#EC50DA")

            let mensaje = ""
            for(i = 0; i < jugadores.length; i++){
                const obtenerJugador = await client.users.fetch(jugadores[i].id)
                mensaje = mensaje+`**#${i+1}** ${obtenerJugador.tag}: NIVEL ${jugadores[i].nivel}\n`
            }
            embedDatos.addField("\u200B", mensaje)
            msg.channel.send({ embeds: [embedDatos] })
            msg.channel.messages.fetch({ limit: 10 }).then(collected => {
                collected.forEach(msg => {
                    if(msg.content == "Por favor, espera un momento. Esto puede llevar un tiempo..." && msg.author.id == client.user.id){
                        msg.delete()
                    }
                })
            })
            return
        }
        msg.channel.send("Ese subcomando de top no existe! Revisa los comandos con rpg help.")
    }
}
