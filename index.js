Discord = require("discord.js")
utils = require("./clases/utils.js")
require("dotenv").config()
SlashCommands = require('@discordjs/builders')
require("dotenv").config()

//Inicializar Firebase
const admin = require("firebase-admin")
const serviceAccount = JSON.parse(process.env.TOKEN_FIREBASE)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

db = admin.firestore()
FieldValue = require("firebase-admin").firestore.FieldValue

client = new Discord.Client({ 
    intents: [
      'GUILDS',
      'GUILD_MESSAGES'
    ],
    ws: { 
      properties: { 
        $browser: "Discord iOS" 
      }
    } 
  })

client.servers = new Discord.Collection()

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

const fs = require('fs');

client.slashComandos = new Discord.Collection()
const commandFiles = fs.readdirSync('./comandosSlash').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./comandosSlash/${file}`);
	client.slashComandos.set(command.data.name, command);
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

//PROPIEDAD LOGIN

const timeH = new Date().getHours()
const timeM = new Date().getMinutes()
const timeS = new Date().getSeconds()

client.login(process.env.TOKEN)
    .then(() => {
        console.log(`[${timeH}:${timeM}:${timeS} INFO]: RPG-S ha sido iniciado satisfactoriamente!`)
        console.log(`[${timeH}:${timeM}:${timeS} INFO]: Actualmente se encuentra conectado en: ${client.guilds.cache.size} servidores\n`)
    })
    .catch((err) => {
        console.error(`[${timeH}:${timeM}:${timeS} ERROR]: Error al iniciar sesión: ${err}`)
    })