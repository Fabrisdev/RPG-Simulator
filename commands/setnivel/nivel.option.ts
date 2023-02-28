import { ChatInputCommandInteraction, GuildMemberRoleManager } from 'discord.js'
import { CustomClient } from '../../types/custom_client'
import { log_error } from '../../utils/logger.js'

export default async (interaction: ChatInputCommandInteraction) => {
    const level = interaction.options.getInteger('nivel')
    if(!level) throw log_error('La opción nivel en el comando setnivel ha sido llamada sin embargo no se ha pasado ningún nivel.')
    const client = interaction.client as CustomClient<true>
    const user_id = interaction.user.id
    const debug_role_id = '915322151022760017'
    const user_roles = await interaction.member?.roles

    if(!(user_roles instanceof GuildMemberRoleManager)) return interaction.reply('No tienes el rol debug (solo en Miggi).')
    if(!user_roles.cache.has(debug_role_id)) return interaction.reply('No tienes el rol debug (solo en Miggi).')
    
    client.players?.get(user_id)?.set_level(level)
    interaction.reply(`OK. Tu nivel ha sido cambiado a ${level}.`)
}