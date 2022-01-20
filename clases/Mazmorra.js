module.exports.jugarMazmorra = async (nivelMazmorra, users, msg) => {
    switch(nivelMazmorra){
        case 1:
            let vidaDragon = 2500
            msg.channel.send("¡Ha aparecido el dragón Minidann! VIDA: "+vidaDragon)
            const usersCopia = [...users]
            for(let i = 0; i < users.length; i++){
                client.jugadores.get(users[i].id).enMazmorra = true
            }

            const { MessageActionRow, MessageButton } = require('discord.js')
            let done = false
            let i = 0
            await pedirRespuesta()
            await esperarRepuesta()
            async function esperarRepuesta(){
                if(users.length <= 0){
                    msg.channel.send("¡Todos los jugadores han muerto! ¡Mazmorra perdida!")
                    for(let i = 0; i < usersCopia.length; i++){
                        client.jugadores.get(usersCopia[i].id).enMazmorra = false
                    }
                    return
                }
                if(vidaDragon <= 0) return msg.channel.send("El dragón ha muerto!") 
                if(done === false){
                    return setTimeout(esperarRepuesta, 250)
                }
                await pedirRespuesta()
                await esperarRepuesta()
            }

            async function pedirRespuesta(){
                    i++
                    if(i >= users.length) i = 0
                    if(vidaDragon <= 0) return
                    done = false
                    const getRandomId = () => (Math.random() * 100).toString(36).replace('.','')
                    const AtacarIDRandom = getRandomId()
                    const ComerIDRandom = getRandomId()
                    const MagiaIDRandom = getRandomId()
                    const ProtegerIDRandom = getRandomId()
                    const botones = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId(AtacarIDRandom)
                            .setLabel('ATACAR')
                            .setStyle('PRIMARY'),
                        new MessageButton()
                            .setCustomId(ComerIDRandom)
                            .setLabel('COMER')
                            .setStyle('PRIMARY'),
                        new MessageButton()
                            .setCustomId(MagiaIDRandom)
                            .setLabel('MAGIA')
                            .setStyle('PRIMARY'),
                        new MessageButton()
                            .setCustomId(ProtegerIDRandom)
                            .setLabel("PROTEGER")
                            .setStyle('PRIMARY'),
                    )

                    const filter = interaction => interaction.user.id == users[i].id

                    const collector = msg.channel.createMessageComponentCollector({ filter, time: 15000 })

                    collector.on('collect', async interaction => {
                        switch(interaction.customId){
                            case AtacarIDRandom:
                                const ataqueRecibido = utils.generarNumeroRandom(10,70)
                                const ataqueAlDragon = utils.generarNumeroRandom(150,320)
                                vidaDragon -= ataqueAlDragon
                                client.jugadores.get(users[i].id).incrementarSalud(-ataqueRecibido)
                                const userSnap = client.jugadores.get(users[i].id)
                                const userNivel = userSnap.nivel
                                const userHPMax = 40+userNivel*5
                                let userVida = client.jugadores.get(users[i].id).salud
                                if(vidaDragon <= 0) vidaDragon = 0
                                if(userVida <= 0) userVida = 0
                                await interaction.update({ content: `¡${users[i].username} ha atacado al dragón inflingiendole ${ataqueAlDragon} AT! VIDA DEL DRAGÓN: ${vidaDragon}/2500\nEl dragón lo ataca a él de vuelta inflingiendole ${ataqueRecibido} AT. VIDA RESTANTE: ${userVida}/${userHPMax}`, components: [] })
                                break
                            case ComerIDRandom:
                                break
                            case MagiaIDRandom:
                                break
                            case ProtegerIDRandom:
                                break
                        }

                        collector.stop()
                    })
                    collector.on("end", collected => {
                        if(collected.size === 0){
                            const ataqueRecibido = utils.generarNumeroRandom(10,70)
                            client.jugadores.get(users[i].id).incrementarSalud(-ataqueRecibido)
                            const userSnap = client.jugadores.get(users[i].id)
                            const userNivel = userSnap.nivel
                            const userHPMax = 40+userNivel*5
                            let userVida = client.jugadores.get(users[i].id).salud
                            if(userVida <= 0) userVida = 0
                            msg.channel.send(`${users[i].username}: has perdido tu tiempo. El dragón ataca infligiendote ${ataqueRecibido} AT. VIDA RESTANTE: ${userVida}/${userHPMax}`)
                        }
                        const userSnap = client.jugadores.get(users[i].id)
                        const userSalud = userSnap.salud
                        if(userSalud <= 0){
                            let userNivel = client.jugadores.get(users[i].id).nivel
                            if(userNivel - 1 <= 0){
                                client.jugadores.get(users[i].id).nivel = 0
                            }else{
                                client.jugadores.get(users[i].id).incrementarNivel(-1)
                            }
                            userNivel = client.jugadores.get(users[i].id).nivel
                            const userHPMax = 40+userNivel*5
                            client.jugadores.get(users[i].id).salud = userHPMax
                            msg.channel.send(`¡${users[i].username} ha muerto!`)
                            users.splice(i, 1)
                        }
                        done = true
                    })
                    await msg.channel.send({ content:`${users[i].username}: ¿Qué haras?`, components: [botones] })
            }
        
            break
        default:
            msg.channel.send("Ha ocurrido un grave error. Por contacta a mi creador Fabri D:")
    }
}