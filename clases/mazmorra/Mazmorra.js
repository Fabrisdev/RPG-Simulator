const { MessageActionRow, MessageButton, MessageAttachment, MessageSelectMenu, Collection } = require('discord.js')
const { registerFont, createCanvas, loadImage } = require("canvas")
const datosDragon = require("./datosDragon")
const EventEmitter = require('events')
const { crearTarjeta } = require("./mazmorraFunctions")

module.exports = class Mazmorra extends EventEmitter {
    turn;
    nivel;
    msg;
    dragon;
    users = new Collection()
    id = utils.getRandomId()
    buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId(`mmr_${this.id}_atacar`)
                .setLabel('ATACAR')
                .setStyle('PRIMARY'), 
            new MessageButton()
                .setCustomId(`mmr_${this.id}_comer`)
                .setLabel('COMER')
                .setStyle('PRIMARY'), 
            new MessageButton()
                .setCustomId(`mmr_${this.id}_magia`)
                .setLabel('MAGIA')
                .setStyle('PRIMARY'), 
            new MessageButton()
                .setCustomId(`mmr_${this.id}_proteger`)
                .setLabel("PROTEGER")
                .setStyle('PRIMARY'),
        )    

    constructor(nivel, users, msg) {
        super()
        this.nivel = nivel
        this.msg = msg
        this.dragon = {
            ...datosDragon[nivel],
            vida: datosDragon[nivel].maxVida,
            dormido: false,
            contador: 0
        }
        users.forEach(user => this.users.set(user.id, {
            id: user.id,
            username: user.username,
            avatar: user.avatarURL(),
            muerto: false,
            toString: function() {
                return `<@${this.id}>`
            }
        }))
        this.turn = this.users.first()
        client.mazmorras.set(this.id, this)
        
        msg.react("<a:checkmark:930793535718961153>")

        registerFont("fonts/Dankduck.ttf", { family: "Dankduck" })
        registerFont("fonts/Daddy Day.ttf", { family: "Daddy Day" })

        msg.channel.send(`¡Ha aparecido el dragón ${this.dragon.nombre}! VIDA: ${this.dragon.vida}`)

        for (let i = 0; i < users.length; i++) {
            client.jugadores.get(users[i].id).enMazmorra = true
            client.jugadores.get(users[i].id).eliminarItem('5')
            client.jugadores.get(users[i].id).mana = 0
        }

        //init
        await this.crearRepuesta()

        //--------- EVENTOS --------- 
        this.on('atacarClicked', async interaction => {
            if(this.turn.id !== interaction.user.id) return interaction.reply({ content: "¡No es tu turno!", ephemeral: true})

            const userSnap = client.jugadores.get(interaction.user.id)
            if(!this.dragon.dormido) {
                const ataqueRecibido = Math.floor(userSnap.defenderse(utils.generarNumeroRandom(10, 70)))
                userSnap.incrementarSalud(-ataqueRecibido)
            }
            this.dragon.vida -= userSnap.atacar()
            if (this.dragon.vida <= 0) vidaDragon = 0
            const archivoAEnviar = await crearTarjeta(`!${interaction.user.username} ataca!`, interaction.user, this.dragon, userSnap)
            const attachment = new MessageAttachment(archivoAEnviar, "dungeon-image.png")
            await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: "\u200B", components: [], files: [attachment] })
            
            await this.realizarRevisiones(interaction)
        })
        
        this.on("comerClicked", async interaction => {
            if(this.turn.id !== interaction.user.id) return interaction.reply({ content: "¡No es tu turno!", ephemeral: true})

            //Logica

            await this.realizarRevisiones(interaction)
        })

        this.on("magiaClicked", async interaction => {
            if(this.turn.id !== interaction.user.id) return interaction.reply({ content: "¡No es tu turno!", ephemeral: true})

            //Logica

            await this.realizarRevisiones(interaction)
        })

        this.on("protegerClicked", async interaction => {
            if(this.turn.id !== interaction.user.id) return interaction.reply({ content: "¡No es tu turno!", ephemeral: true})

            //Logica
            await this.realizarRevisiones(interaction)
        })
    }

    async realizarRevisiones(interaction) {
        await this.cambiarTurno(interaction.user.id)
        await this.revisarJugadoresMuertos()
        const muertos = await this.revisarTodosMuertos()
        if(muertos) return
        const victoria = await this.revisarVictoria()
        if (!victoria) this.crearRepuesta()
        await interaction.deferUpdate()
    }

    async realizarRevisionesSinJugar(id){
        await this.cambiarTurno(id)
        await this.revisarJugadoresMuertos()
        const muertos = await this.revisarTodosMuertos()
        if(muertos) return
        const victoria = await this.revisarVictoria()
        if (!victoria) this.crearRepuesta()
    }

    cambiarTurno(id) {
        return new Promise(resolve => {
            //Si solo una persona está jugando la mazmorra, no cambiar turno
            if(this.users.size === 1) return resolve()

            //Si hay una persona muerta, no cambiar el turno
            if(this.users.filter(user => !user.muerto).size === 1) return resolve()

            //Cambiar turno
            this.turn = this.users.find(user => user.id !== id) 
            resolve()
        })
    }

    revisarJugadoresMuertos(){
        return Promise.all(this.users.filter(user => !user.muerto).map(user => {
            const userSnap = client.jugadores.get(user.id)
            if(userSnap.salud <= 0){
                this.msg.channel.send(`¡${user} ha muerto!`)
                user.muerto = true
            }
        }))
    }

    revisarTodosMuertos(){
        return new Promise(async resolve => {
            const vivos = this.users.filter(user => !user.muerto)
            if(vivos.size === 0){
                await Promise.all(this.users.map(user => {
                    const userSnap = client.jugadores.get(user.id)
                    userSnap.enMazmorra = false
                    userSnap.incrementarNivel(userSnap.nivel <= 0 ? 0 : -1)
                    userSnap.salud = 40 + userSnap.nivel * 5
                }))
                await this.msg.channel.send("¡TODOS LOS JUGADORES HAN MUERTO!\nFIN DEL JUEGO.")
                client.mazmorras.delete(this.id)
                return resolve(true)
            }
            resolve(false)
               
        })
    }

    revisarVictoria(){
        return new Promise(async resolve => {
            if (this.dragon.vida <= 0) {
                this.msg.channel.send("El dragón ha muerto!")
                this.msg.channel.send(`¡TODOS LOS JUGADORES HAN DESBLOQUEADO EL MUNDO ${nivelMazmorra + 1}!`)
                this.msg.channel.send("**PUEDEN USAR `rpg viajar " + (nivelMazmorra + 1) + "` PARA IR ALLÍ**")
                this.users.map(user => {
                    const userSnap = client.jugadores.get(user.id)
                    userSnap.enMazmorra = false
                    userSnap.incrementarUltimoMundo(1)
                    if(user.muerto) userSnap.salud = 1
                })
                client.mazmorras.delete(this.id)
                return resolve(true)
            }
            resolve(false)
        })
    }

    async crearRepuesta() {
        const respuesta = this.msg.channel.send({ content: `${this.turn} ¿Qué haras?`, components: [this.buttons] })
        setTimeout(() => {
            //Si no ha respondido
            if(respuesta.content.includes("¿Qué haras?")){
                await enviarMensajeInactivo()
            }
        }, 5000)
    }

    async enviarMensajeInactivo(){
        const userSnap = client.jugadores.get(this.turn.id)
        const archivoAEnviar = await crearTarjeta(`${this.turn.username} se queda quieto.`, this.turn, vidaDragon, vidaDragonTotal, userSnap)
        const attachment = new MessageAttachment(archivoAEnviar, "dungeon-image.png")
        await interaction.channel.messages.cache.get(interaction.message.id)?.edit({ content: "\u200B", components: [], files: [attachment] })

        await realizarRevisionesSinJugar(this.turn.id)
    }
}