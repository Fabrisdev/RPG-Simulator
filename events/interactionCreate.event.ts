import { Events, Interaction } from 'discord.js'
import { CustomClient } from '../types/custom_client.js'
import { log_error } from '../utils/log.js'

export default {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction){
        if(!interaction.isChatInputCommand()) return
        const client: CustomClient = interaction.client
        const command = client.commands?.get(interaction.commandName)
        if(!command) return log_error(`Uh oh. Parece que no hay un comando para poder ejecutar el slash command: ${interaction.commandName}`)
        await command.execute(interaction)
    }
}