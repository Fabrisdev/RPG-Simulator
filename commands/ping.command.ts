import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { sleep } from '../utils/utils.js'

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('🏓'),
    
    async execute(interaction: CommandInteraction){
        await interaction.reply('Ping')
        await sleep(3000)
        await interaction.editReply('Pong!')
    },
}