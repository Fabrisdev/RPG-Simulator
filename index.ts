import { Client, Collection, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
const { DISCORD_TOKEN } = process.env
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CustomClient, Command, Event } from './types/custom_client'
import { log_error } from './utils/logger.js'
import { PlayersManager } from './managers/PlayersManager.js'
import { ServersManager } from './managers/ServersManager.js'

const client: CustomClient<boolean> = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
    ws: { 
        properties: { 
            browser: 'Discord iOS'
        }
    } 
})

client.commands = new Collection()
client.players = new PlayersManager()
client.servers = new ServersManager()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const commands_path = path.join(__dirname, 'commands')
const command_file_names = fs.readdirSync(commands_path).filter(file => file.endsWith('.command.ts'))

command_file_names.map(async file_name => {
    const file_path = path.join(commands_path, file_name)
    const command_module = await import(file_path)
    const command: Command = command_module.default
    const { data, execute } = command
    if(!data || !execute)
        return log_error(`¡Uy! Parece que le estan faltando unos parámetros al comando ${file_name}`)

    client.commands?.set(data.name, command)
})

const events_path = path.join(__dirname, 'events')
const event_file_names = fs.readdirSync(events_path).filter(file => file.endsWith('.event.ts'))

event_file_names.map(async file_name => {
    const file_path = path.join(events_path, file_name)
    const event_module = await import(file_path)
    const event: Event = event_module.default
    if(event.once){
        client.once(event.name, (...args) => event.execute(...args))
        return
    }
    client.on(event.name, args => event.execute(args))
})

client.login(DISCORD_TOKEN)