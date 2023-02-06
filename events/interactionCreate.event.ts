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
        if(!command) return log_error(`Uh oh. Parece que no hay un comando para poder ejecutar el slash command: ${interaction.commandName}`)
        await command.execute(interaction)
    }
}

//For the love of god, this needs refactoring.
//Don't hate this too much, it was made quickly with a lot of pressure.
//Please?
//Thanks :)