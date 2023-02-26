import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { CustomClient } from '../types/custom_client.js'

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('🏓'),
    
    async execute(interaction: CommandInteraction){
        await interaction.reply('Ping')
        await interaction.editReply('Pong!')
        const client = interaction.client as CustomClient<true>
        console.log(client.super_commands)
    },
}