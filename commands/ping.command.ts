import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('🏓'),
    
    async execute(interaction: CommandInteraction){
        await interaction.reply('asd')
    },
}