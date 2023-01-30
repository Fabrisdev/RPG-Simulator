Discord = require("discord.js")
utils = require("./clases/utils.js")
require("dotenv").config()
//hacer .SlashCommandBuilder
SlashCommands = require('@discordjs/builders')
require("dotenv").config()

//Inicializar Firebase
const admin = require("firebase-admin")
const serviceAccount = JSON.parse(process.env.TOKEN_FIREBASE)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

//Inicializar client
client = new Discord.Client({ 
    intents: [
      'GUILDS',
      'GUILD_MESSAGES',
      'GUILD_MESSAGE_REACTIONS'
    ],
    ws: { 
      properties: { 
        $browser: "Discord iOS" 
      }
    } 
  })

  client.servers = new Discord.Collection()
  client.mazmorras = new Discord.Collection()

let { readdirSync } = require("fs")
client.comandos = new Discord.Collection()

//CONTROLADOR DE COMANDOS

for(const file of readdirSync("./comandos/")){
    if(file.endsWith(".js")){
        //Elimina los últimos tres caracteres nombre del archivo para
        //deshacerse de la extensión .js y solo quedarnos con el nombre del comando:
        let filename = file.substring(0, file.length - 3)

        //Define una nueva varible 'fileContents' de la exportación del comando 
        //dentro de la carpeta comandos:
        let fileContents = require(`./comandos/${file}`)

        //Agrega el nombre del comando a la colección client.commands con un 
        //valor de sus exportaciones respectivas.
        client.comandos.set(filename, fileContents)
   }
}

//CONTROLADOR DE SLASH COMMANDS

client.slashComandos = new Discord.Collection()
const commandFiles = readdirSync('./comandosSlash').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./comandosSlash/${file}`)
	client.slashComandos.set(command.data.name, command)
}

//CONTROLADOR DE BOTONES

client.botones = new Discord.Collection()
for (const file of readdirSync('./botones').filter(file => file.endsWith('.js'))) {
	const boton = require(`./botones/${file}`)
	client.botones.set(boton.name, boton)
}

//CONTROLADOR DE EVENTOS

for(const file of readdirSync("./eventos/")){
    if(file.endsWith(".js")){
        let fileName = file.substring(0, file.length - 3)
        let fileContents = require(`./eventos/${file}`)

        // Cuando el evento se activa o es solicitada exportamos la función con 
        // el nombre del evento vinculada y tambien el parametro client.
        client.on(fileName, fileContents.bind())

        // Elimina la memoria caché del archivo requerido para facilitar la recarga y no 
        // tener más memoria de la necesaria.
        delete require.cache[require.resolve(`./eventos/${file}`)]
    }
}

//LOGIN
client.login(process.env.TOKEN)
    .then(() => {
        console.log(`[INFO]: RPG-S ha sido iniciado satisfactoriamente!`)
        console.log(`[INFO]: Actualmente se encuentra conectado en: ${client.guilds.cache.size} servidores\n`)
    })
    .catch((err) => {
        console.error(`[ERROR]: Error al iniciar sesión: ${err}`)
    })