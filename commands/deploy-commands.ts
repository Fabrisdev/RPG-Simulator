import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Command } from '../custom_client.js'
import { log_error } from '../utils/log.js'

dotenv.config()

deploy()


async function deploy(){
    const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env
    if(!DISCORD_TOKEN || !GUILD_ID || !CLIENT_ID){
        log_error('¡Uy! Parece que falta alguno de los 3 parametros necesarios para poder subir los comandos en el .env')
        return
    }
    
    const commandsData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
    // Grab all the command files from the commands directory you created earlier
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const command_file_names = fs.readdirSync(__dirname).filter(file => file.endsWith('.command.ts'))
    
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    await Promise.all(command_file_names.map(async command_file_name => {
        const commandModule = await import(path.join(__dirname, command_file_name))
        const command: Command = commandModule.default
        commandsData.push(command.data.toJSON())
    }))
    
    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)
    
    // and deploy your commands!
    try {
        console.log(commandsData)
        console.log(`Started refreshing ${commandsData.length} application (/) commands.`)

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commandsData },
        )
        //@ts-expect-error rest is shit and cant do actual good type definitions
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)

    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.log(error)
    }
}