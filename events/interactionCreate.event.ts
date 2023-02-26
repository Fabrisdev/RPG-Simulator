import { ChatInputCommandInteraction, Events, Interaction } from 'discord.js'
import { CustomClient } from '../types/custom_client.js'
import { log_error } from '../utils/logger.js'

function is_all_channels_allowed(interaction: ChatInputCommandInteraction){
    const client: CustomClient<true> = interaction.client
    const guild_id = interaction.guild?.id
    if(!guild_id) return
    const server = client.servers?.get(guild_id)
    if(!server) return true
    return server.get_all_channels_allowed
}

function is_allowed_channel(interaction: ChatInputCommandInteraction){
    const client: CustomClient<true> = interaction.client
    const guild_id = interaction.guild?.id
    if(!guild_id) return
    const server = client.servers?.get(guild_id)
    if(!server)
        throw log_error(`is_allowed_channel fue llamado aunque no había un servidor en primer lugar. guild_id: ${guild_id}, channel_id: ${interaction.channel?.id}`)
    const channel_id = interaction.channel?.id
    if(!channel_id) return false
    return channel_id === server.get_allowed_channel()
}

export default {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction){
        if(!interaction.isChatInputCommand()) return
        if(!is_all_channels_allowed(interaction)){
            if(!is_allowed_channel(interaction)) return
        }
        const client: CustomClient<true> = interaction.client
        const command = client.commands?.get(interaction.commandName)
        if(command) return await command.execute(interaction)
        const super_command = client.super_commands?.get(interaction.commandName)
        if(!super_command) return log_error(`Uh oh. Parece que no hay un comando para poder ejecutar el slash command: ${interaction.commandName}`)
        for(const [ option_name, executor ] of super_command){
            if(interaction.options.get(option_name)) return executor(interaction)
        }
        const default_executor = super_command.get('DEFAULT')
        if(!default_executor) return log_error(`Parece que se ha usado alguna opción (o ningúna) en el slash command: ${interaction.commandName} sin embargo no había función para ejecutarla ni función por defecto.`)
        default_executor(interaction)
    }
}

//For the love of god, this needs refactoring.
//Don't hate this too much, it was made quickly with a lot of pressure.
//Please?
//Thanks :)