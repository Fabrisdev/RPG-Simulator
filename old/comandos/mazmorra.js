module.exports = {
    aliases: ["dungeon"],
    run: async (msg, args) => {
        const { MessageActionRow, MessageButton } = require('discord.js')
        const userID = msg.author.id
        const userSnap = client.jugadores.get(userID)

        //Revisar si tiene la llave
        if(!userSnap.items.hasOwnProperty('5')){
            msg.channel.send("¿Crees que tienes lo necesario para luchar contra el dragón de tu mundo?")
            msg.channel.send("Equipate y vuelve aquí con una llave para abrir el portal.")
            return
        }

        //Revisar si está en el mundo correcto para hacer mazmorra
        if(userSnap.mundo !== userSnap.ultimoMundo){
            return msg.channel.send("¡Uy! Parece que no te encuentras en el mundo en el que te corresponde luchar. Muevete a él usando `rpg viajar`")
        }
        
        const amigo = msg.mentions.users.first()

        //Revisar si tiene un amigo
        if(!amigo || amigo == msg.author){
            const getRandomId = () => (Math.random() * 100).toString(36).replace('.','')
            const confirmarMazmorraRandom = getRandomId()

            const botones = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId(confirmarMazmorraRandom)
                    .setLabel('CONFIRMAR')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId("cancelar")
                    .setLabel('CANCELAR')
                    .setStyle('DANGER'),
            )
            client.jugadores.get(msg.author.id).enMazmorra = true
            let mensaje = await msg.reply({ content: "Puedes traer a un amigo para luchar juntos. ¿Estas seguro que deseas continuar solo?", components: [botones] })
            
            const filter = interaction => {
                return interaction.user.id == msg.author.id
            }

            const collector = mensaje.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 30000 })

            collector.on("collect", i => {
                if(i.customId === confirmarMazmorraRandom){
                    mensaje.edit({ content: "Empezando mazmorra...", components: [] })
                    const userSnap = client.jugadores.get(msg.author.id)
                    const Mazmorra = require("../clases/mazmorra/Mazmorra.js")
                    return new Mazmorra(userSnap.ultimoMundo, [msg.author], mensaje)
                }
                mensaje.edit({ content: "Mazmorra cancelada.", components: [] })
                client.jugadores.get(msg.author.id).enMazmorra = false
            })

            collector.on("end", collected => {
                if(collected.size === 0){
                    client.jugadores.get(msg.author.id).enMazmorra = false
                    mensaje.edit({ content: "Se te ha acabado el tiempo. Mazmorra cancelada.", components: [] })
                }
            })
            return
        }

        const amigoID = amigo.id
        const amigoSnap = client.jugadores.get(amigoID) 

        //Revisar si el amigo ya ha jugado
        if(!amigoSnap) return msg.channel.send("¡Uy! Parece que tu amigo nunca ha jugado. ¡Invitale a jugar!")

        //Revisar si el amigo tiene una llave
        if(!amigoSnap.items.hasOwnProperty('5')){
            return msg.channel.send("¡Uy! Parece que tu amigo no tiene una llave para abrir su portal. Dile que se compre una.")
        }

        //Revisar si su amigo está en el mundo correcto para hacer mazmorra
        if(amigoSnap.mundo !== amigoSnap.ultimoMundo){
            return msg.channel.send("¡Uy! Parece que tu amigo no se encuentra en el mundo en el que le correspondería luchar. Dile que se mueva a él usando `rpg viajar`")
        }

        //Revisar si están en el mismo mundo
        if(amigoSnap.ultimoMundo != userSnap.ultimoMundo){
            return msg.channel.send("¡Uy! Parece que tu amigo está en un mundo distinto al tuyo o ya lo ha superado.")
        }

        msg.channel.send("¿ESTÁN TODOS LOS JUGADORES LISTOS?")
        msg.channel.send("REACCIONEN A ESTE MENSAJE PARA CONFIRMAR")
        await msg.react("<a:checkmark:930793535718961153>")

        const filter = (reaction, user) => {
            return reaction.emoji.name === "checkmark" && (user.id == msg.author.id || user.id == amigoID)
        }

        const collector = msg.createReactionCollector({ filter, time: 30000 })
        const usersReaccion = new Set()

         collector.on('collect', (reaction, user) => {
            usersReaccion.add(user)
            if(usersReaccion.size == 2) return collector.stop()
        })

        collector.on('end', (collected, reason) => {
            if(usersReaccion.size != 2) return msg.channel.send("Ha pasado el limite de tiempo y ambos jugadores no han reaccionado. Mazmorra cancelada.")
            
            msg.channel.send("Empezando mazmorra...")
            const Mazmorra = require("../clases/mazmorra/Mazmorra.js")
            const datosDragon = require("../clases/mazmorra/datosDragon.json")
            if(!datosDragon[userSnap.ultimoMundo]) msg.channel.send("¡Uy! Parece que aún no está lista esta mazmorra. Por favor, espere a que mi creador Fabri la termine :pleading_face:").then(()=>msg.react("<:nope:930794572198596619>"))
            else new Mazmorra(userSnap.ultimoMundo, Array.from(usersReaccion), msg)
        })
    }
}