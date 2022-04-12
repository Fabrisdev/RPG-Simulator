const { registerFont, createCanvas, loadImage } = require("canvas")

module.exports.jugarMazmorra = async (nivelMazmorra, users, msg) => {
    // registerFont("fonts/Dankduck.ttf", { family: "Dankduck" })
    // registerFont("fonts/Daddy Day.ttf", { family: "Daddy Day" })
    
    // const crearMensaje = async (texto, userInteraction, vidaDragon, vidaDragonTotal, userSnap) => {

    //     const userVida = userSnap.salud
    //     const userHPMax = 40 + userSnap.nivel * 5
    //     const userMana = userSnap.mana

    //     const canvas = createCanvas(800, 400)
    //     const context = canvas.getContext("2d")

    //     //BACKGROUND
    //     const background = await loadImage("img/bgmazmorras.png")
    //     context.drawImage(background, 0, 0, canvas.width, canvas.height)

    //     //RECTANGULOS
    //     context.beginPath()
    //     context.rect(32, 115, 16, 55)
    //     context.rect(32, 198, 16, 55)
    //     context.rect(32, 280, 16, 55)
    //     context.fillStyle = "#00B3FF"
    //     context.fill()

    //     context.rect(32, 115, 16, 55)
    //     context.rect(32, 198, 16, 55)
    //     context.rect(32, 280, 16, 55)
    //     context.lineWidth = "2"
    //     context.strokeStyle = "#ffffff"
    //     context.stroke()
    //     context.closePath()

    //     //TEXTO
    //     let fontSize = 90
    //     context.font = `${fontSize}px Dankduck`
    //     while (context.measureText(texto).width > canvas.width) {
    //         fontSize -= 5
    //         context.font = `${fontSize}px Dankduck`
    //     }
    //     context.fillStyle = "#ffffff"
    //     context.fillText(texto, canvas.width / 2 - (context.measureText(texto).width / 2), 100)

    //     context.font = "50px Daddy Day"
    //     context.fillText(`VIDA DEL DRAGON: ${vidaDragon}/${vidaDragonTotal}`, 67, 160)
    //     context.fillText(`VIDA DE ${userInteraction.username}: ${userVida}/${userHPMax}`, 67, 242)
    //     context.fillText(`CARGA DEL MANA: ${userMana}/100%`, 67, 324)

    //     //FOTO DE PERFIL
    //     context.strokeRect(0, 0, canvas.width, canvas.height)
    //     utils.roundRect(context, 601, 137, 177, 177, 25, true);
    //     context.closePath()
    //     context.clip()
    //     const avatar = await loadImage(userInteraction.displayAvatarURL({ format: "jpg" }))
    //     context.drawImage(avatar, 601, 137, 177, 177)
    //     return canvas.toBuffer()
    // }

    async function entrarMazmorra(vidaDragon, nombreDragon) {
        const vidaDragonTotal = vidaDragon
        msg.channel.send(`¡Ha aparecido el dragón ${nombreDragon}! VIDA: ${vidaDragon}`)
        const usersCopia = [...users]
        for (let i = 0; i < users.length; i++) {
            client.jugadores.get(users[i].id).enMazmorra = true
            client.jugadores.get(users[i].id).eliminarItem('5')
            client.jugadores.get(users[i].id).mana = 0
        }

        const { MessageActionRow, MessageButton, MessageAttachment, MessageSelectMenu } = require('discord.js')
        let done = { hecho: false, tipo: "", doble_confirmacion: false }
        let dragon = { dormido: false, contador: 0 }
        let i = 0
        await pedirRespuesta()
        await esperarRepuesta()
        async function esperarRepuesta() {
            if (users.length <= 0) {
                msg.channel.send("¡Todos los jugadores han muerto! ¡Mazmorra perdida!")
                for (let i = 0; i < usersCopia.length; i++) {
                    client.jugadores.get(usersCopia[i].id).enMazmorra = false
                }
                return
            }
            if (vidaDragon <= 0) {
                msg.channel.send("El dragón ha muerto!")
                msg.channel.send(`¡TODOS LOS JUGADORES HAN DESBLOQUEADO EL MUNDO ${nivelMazmorra + 1}!`)
                msg.channel.send("**PUEDEN USAR `rpg viajar " + (nivelMazmorra + 1) + "` PARA IR ALLÍ**")
                for (let i = 0; i < usersCopia.length; i++) {
                    client.jugadores.get(usersCopia[i].id).enMazmorra = false
                    client.jugadores.get(usersCopia[i].id).incrementarUltimoMundo(1)
                }
                return
            }
            if (done.tipo !== "magia") {
                if (done.hecho === false) {
                    return setTimeout(esperarRepuesta, 250)
                }
            }
            if (done.doble_confirmacion === false) {
                return setTimeout(esperarRepuesta, 250)
            }
            await pedirRespuesta()
            await esperarRepuesta()
        }

        async function pedirRespuesta() {
            i++
            if (i >= users.length) i = 0
            if (vidaDragon <= 0) return
            done.tipo = ""
            done.hecho = false
            done.doble_confirmacion = false
            const getRandomId = () => (Math.random() * 100).toString(36).replace('.', '')
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

            const collector = msg.channel.createMessageComponentCollector({ filter, time: 5000 })
            collector.on('collect', async interaction => {
                const ataqueRecibido = Math.floor(client.jugadores.get(users[i].id).defenderse(utils.generarNumeroRandom(10, 70)))
                setTimeout(()=> {
                    interaction.deferUpdate().catch((error) => {})
                }, 2500)
                switch (interaction.customId) {
                    case AtacarIDRandom: { 
                        if(!dragon.dormido){
                            client.jugadores.get(users[i].id).incrementarSalud(-ataqueRecibido)  
                        }
                        const userSnap = client.jugadores.get(users[i].id)
                        const ataqueAlDragon = userSnap.atacar()
                        vidaDragon -= ataqueAlDragon
                        if (vidaDragon <= 0) vidaDragon = 0
                        const archivoAEnviar = await crearMensaje(`!${interaction.user.username} ataca!`, interaction.user, vidaDragon, vidaDragonTotal, userSnap)
                        const attachment = new MessageAttachment(archivoAEnviar, "dungeon-image.png")
                        await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: "\u200B", components: [], files: [attachment] })
                        done.doble_confirmacion = true
                        break
                    }
                    case ComerIDRandom:
                        await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: "¡Ups! Esta habilidad todavía no está disponible.", components: [] })
                        done.doble_confirmacion = true
                        break
                    case MagiaIDRandom:
                        const getRandomId = () => (Math.random() * 100).toString(36).replace('.', '')
                        const selectMenuRandomID = getRandomId()

                        //funciones del menu de magia

                        //-------------------------------------------------
                        const menuFunc = async (interaction) => {
                            if (!interaction.isSelectMenu()) return
                            if (interaction.customId !== selectMenuRandomID) return
                            if (interaction.user.id !== users[i].id) return
                            console.log('menu')
                            await interaction.deferUpdate()
                            await client.removeListener('interactionCreate', menuFunc)

                            if(!dragon.dormido){
                                client.jugadores.get(interaction.user.id).incrementarSalud(-ataqueRecibido)
                                const userVida = client.jugadores.get(interaction.user.id).salud
                                const userNivel = client.jugadores.get(interaction.user.id).nivel
                                const userVidaMax = 40 + userNivel * 5
                                msg.channel.send(`El dragón ataca inflingiendote ${ataqueRecibido} AT. Vida restante: ${userVida}/${userVidaMax}`)
                                if(final()) return;
                            }

                            const userMana = client.jugadores.get(interaction.user.id).mana
                            console.log(interaction.values[0])
                            if (interaction.values[0] === "magia_revivir") {
                                if(userMana >= 100){
                                    client.jugadores.get(interaction.user.id).mana = 0
                                    users.push(usersCopia.find(user => user.id !== users[i].id))
                                    const amigoSaludMax = client.jugadores.get(usersCopia.find(user => user.id !== users[i].id)).salud
                                    const nuevaSalud = Math.floor((amigoSaludMax * 20) / 100)
                                    client.jugadores.get(usersCopia.find(user => user.id !== users[i].id)).salud = nuevaSalud
                                    await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: `¡${interaction.user} ha usado **RESURECCIÓN**!`, components: []})
                                    msg.channel.send(`¡${usersCopia.find(user => user.id !== users[i].id)} ha sido revivido!`)
                                }else{
                                    await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: `¡${interaction.user} ha fallado!`, components: []})
                                    msg.channel.send(`¡No tienes suficiente mana! \`MANA NECESARIO: ${userMana}/100\``)
                                }
                            }
                            if(interaction.values[0] === "magia_curar"){
                                if(userMana >= 25){
                                    client.jugadores.get(interaction.user.id).incrementarMana(-25)
                                    const amigoID = usersCopia.find(user => user.id !== users[i].id)
                                    const amigoNivel = client.jugadores.get(amigoID).nivel
                                    const amigoSaludMax = 40 + amigoNivel * 5
                                    const saludRegenerada = Math.floor((amigoSaludMax * 25) / 100)
                                    client.jugadores.get(usersCopia.find(user => user.id !== users[i].id)).incrementarSalud(saludRegenerada)
                                    await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: `¡${interaction.user} ha usado **CURACIÓN**!`, components: []})
                                    msg.channel.send(`¡La salud de ${usersCopia.find(user => user.id !== users[i].id)} ha sido regenerada en un 25%!`)
                                }else{
                                    await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: `¡${interaction.user} ha fallado!`, components: []})
                                    msg.channel.send(`¡No tienes suficiente mana! \`MANA NECESARIO: ${userMana}/25\``)
                                }
                            }
                            if(interaction.values[0] === "magia_dormir"){
                                if(userMana >= 60){
                                    client.jugadores.get(interaction.user.id).incrementarMana(-60)
                                    await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: `¡${interaction.user} ha usado **CANCIÓN DE CUNA**!`, components: []})
                                    dragon.dormido = true
                                    dragon.contador = 0
                                    msg.channel.send(`¡${interaction.user} ha dormido al dragón! No podrá atacar por las próximas 2 rondas.`)
                                }else{
                                    await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: `¡${interaction.user} ha fallado!`, components: []})
                                    msg.channel.send(`¡No tienes suficiente mana! \`MANA NECESARIO: ${userMana}/60\``)
                                } 
                            }
                            done.tipo = "magia"
                            done.doble_confirmacion = true
                            dobleConfirmacion = true
                        }
                        
                        //-----------------------------------------------

                        const row = new MessageActionRow()
                        if (usersCopia.length === 1) {
                            row.addComponents(
                                new MessageSelectMenu()
                                    .setCustomId(selectMenuRandomID)
                                    .setPlaceholder("Nada seleccionado")
                                    .addOptions([
                                        {
                                            label: "Dormir al dragón",
                                            description: "Lo dormirá por 2 rondas - Consume 60% mana",
                                            value: "magia_dormir"
                                        },
                                    ]),
                            )
                        } else if (usersCopia.length !== users.length) {
                            row.addComponents(
                                new MessageSelectMenu()
                                    .setCustomId(selectMenuRandomID)
                                    .setPlaceholder("Nada seleccionado")
                                    .addOptions([
                                        {
                                            label: "Dormir al dragón",
                                            description: "Lo dormirá por 2 rondas - Consume 60% mana",
                                            value: "magia_dormir"
                                        },
                                        {
                                            label: "Revivir a tu compañero",
                                            description: "Revivirá con 20% HP - Consume 100% mana",
                                            value: "magia_revivir"
                                        },
                                    ]),
                            )
                        } else {
                            row.addComponents(
                                new MessageSelectMenu()
                                    .setCustomId(selectMenuRandomID)
                                    .setPlaceholder("Nada seleccionado")
                                    .addOptions([
                                        {
                                            label: "Curar a tu compañero",
                                            description: "Consume 30% mana",
                                            value: "magia_curar"
                                        },
                                        {
                                            label: "Dormir al dragón",
                                            description: "Lo dormirá por 2 rondas - Consume 60% mana",
                                            value: "magia_dormir"
                                        },
                                    ]),
                            )
                        }
                        client.on("interactionCreate", menuFunc)
                        interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: "Selecciona una habilidad", components: [row] })
                        let dobleConfirmacion = false
                        const revisar = async () => {
                            if (dobleConfirmacion === false) {
                                const ataqueRecibido = Math.floor(client.jugadores.get(users[i].id).defenderse(utils.generarNumeroRandom(10, 70)))
                                client.jugadores.get(users[i].id).incrementarSalud(-ataqueRecibido)
                                const userSnap = client.jugadores.get(users[i].id)
                                let userVida = client.jugadores.get(users[i].id).salud
                                if (userVida <= 0) userVida = 0
                                const archivoAEnviar = await crearMensaje(`${interaction.user.username} se queda quieto.`, interaction.user, vidaDragon, vidaDragonTotal, userSnap)
                                const attachment = new MessageAttachment(archivoAEnviar, "dungeon-image.png")
                                await interaction.editReply({ content: "\u200B", components: [], files: [attachment] })
                                done.doble_confirmacion = true
                                dobleConfirmacion = true
                                final()
                            }
                        }
                        setTimeout(revisar, 15000)
                        break
                    case ProtegerIDRandom: {
                        const ataqueRecibidoReducido = Math.floor((ataqueRecibido * 50) / 100)
                        if(!dragon.dormido){
                            client.jugadores.get(users[i].id).incrementarSalud(-ataqueRecibidoReducido)
                        }
                        const manaConseguido = Math.floor(utils.generarNumeroRandom(10, 30))
                        client.jugadores.get(users[i].id).incrementarMana(manaConseguido)
                        if (client.jugadores.get(users[i].id).mana >= 100) client.jugadores.get(users[i].id).mana = 100
                        const userSnap = client.jugadores.get(users[i].id)
                        const archivoAEnviar = await crearMensaje(`!${users[i].username} se defiende!`, interaction.user, vidaDragon, vidaDragonTotal, userSnap)
                        const attachment = new MessageAttachment(archivoAEnviar, "dungeon-image.png")
                        await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: "\u200B", components: [], files: [attachment] })
                        done.doble_confirmacion = true
                        break
                    }
                }
                final()
                collector.stop()
            })
            if(dragon.dormido){
                dragon.contador++
                if(dragon.contador > 2){
                    dragon.contador = 0
                    dragon.dormido = false
                }
            }
            const msgwbtn = await msg.channel.send({ content: `${users[i]} ¿Qué haras?`, components: [botones] })
            collector.on("end", async (_, reason) => {
                if (reason === "time") {
                    const ataqueRecibido = Math.floor(client.jugadores.get(users[i].id).defenderse(utils.generarNumeroRandom(10, 70)))
                    client.jugadores.get(users[i].id).incrementarSalud(-ataqueRecibido)
                    const userSnap = client.jugadores.get(users[i].id)
                    let userVida = client.jugadores.get(users[i].id).salud
                    if (userVida <= 0) userVida = 0
                    const archivoAEnviar = await crearMensaje(`${users[i].username} se queda quieto.`, users[i], vidaDragon, vidaDragonTotal, userSnap)
                    const attachment = new MessageAttachment(archivoAEnviar, "dungeon-image.png")
                    msgwbtn.edit({ content: "\u200B", components: [], files: [attachment] })
                    done.doble_confirmacion = true

                    //si clickeo un boton ejecute final
                    final()
                }
                const userSalud = client.jugadores.get(users[i]?.id)?.salud
                console.log("En collector end. VIDA DEL USUARIO:", userSalud)

                //ejecuto comando luchar mi vida es 40
                // se ejecuta collector end
                // termino de luchar y el dragon me hace 40 de daño
                // mi vida es 0 sin embargo no morí


 
                
                done.hecho = true
            })

            function final(){
                const userSnap = client.jugadores.get(users[i].id)
                const userSalud = userSnap.salud
                if (userSalud <= 0) {
                    let userNivel = client.jugadores.get(users[i].id).nivel
                    if (userNivel - 1 <= 0) {
                        client.jugadores.get(users[i].id).nivel = 0
                    } else {
                        client.jugadores.get(users[i].id).incrementarNivel(-1)
                    }
                    userNivel = client.jugadores.get(users[i].id).nivel
                    const userHPMax = 40 + userNivel * 5 //problema
                    client.jugadores.get(users[i].id).salud = userHPMax
                    msg.channel.send(`¡${users[i].username} ha muerto!`)
                    users.splice(i, 1)
                    return true
                }
                return false
            }
        }
    }

    switch (nivelMazmorra) {
        case 1:
            msg.react("<a:checkmark:930793535718961153>")
            entrarMazmorra(2500, "Minidann")
            break
        default:
            msg.channel.send("¡Uy! Parece que aún no está lista esta mazmorra. Por favor, espere a que mi creador Fabri la termine :pleading_face:")
            msg.react("<:nope:930794572198596619>")
            for (let i = 0; i < users.length; i++) {
                client.jugadores.get(users[i].id).enMazmorra = false
            }
    }
}