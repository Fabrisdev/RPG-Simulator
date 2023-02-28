import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('setnivel')
    .addIntegerOption(option => 
        option
            .setName('nivel')    
            .setMinValue(1)
            .setMaxValue(50)
            .setRequired(true)
            .setDescription('El nivel al cual cambiar.')
    )
    .setDescription('Cambia tu nivel fácilmente [SOLO PARA TESTERS]')