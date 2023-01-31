import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
const { DISCORD_TOKEN } = process.env
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import CustomClient, { Command } from './custom_client'
import { log_error } from './utils/log.js'

const client: CustomClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ]
})

client.commands = new Collection()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const commands_path = path.join(__dirname, 'commands')
const command_files = fs.readdirSync(commands_path).filter(file => file.endsWith('.command.ts'))

command_files.map(async file => {
    const file_path = path.join(commands_path, file)
    const command_module = await import(file_path)
    const command: Command = command_module.default
    const { data, execute } = command
    if(!data || !execute)
        return log_error(`¡Uy! Parece que le estan faltando unos parámetros al comando ${file}`)

    client.commands?.set(data.name, command)
})

client.once(Events.ClientReady, bot => {
    const date = new Date()
    const date_formatted = new Intl.DateTimeFormat('es', {
        timeStyle: 'medium'
    }).format(date)
    console.log(`[${date_formatted}] ¡${bot.user.username} está de vuelta en la fiesta!`)
})

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return
    const command = client.commands?.get(interaction.commandName)
    if(!command) return
    await command.execute(interaction)
})

client.login(DISCORD_TOKEN)