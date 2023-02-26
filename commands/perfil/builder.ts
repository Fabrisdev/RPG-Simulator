import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('perfil')
    .setDescription('Revisa tus estadísticas')
    .addUserOption(option => 
        option
            .setName('jugador')    
            .setDescription('El jugador que quieres revisar su perfil')
    )