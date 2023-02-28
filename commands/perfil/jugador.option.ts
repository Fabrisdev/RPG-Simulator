import { ChatInputCommandInteraction } from 'discord.js'
import { log_error } from '../../utils/logger.js'
import show_profile from './show_profile.js'

export default async (interaction: ChatInputCommandInteraction) => {
    const user = interaction.options.getUser('jugador')
    if(!user) throw log_error('La opción jugador en el comando perfil ha sido llamada sin embargo no se ha pasado ningún jugador.')
    show_profile({
        user,
        interaction,
    })
}