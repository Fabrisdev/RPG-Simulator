import { CommandInteraction, EmbedBuilder } from 'discord.js'
import { CustomClient } from '../../types/custom_client'
import { log_error } from '../../utils/logger.js'

export default async (interaction: CommandInteraction) => {
    const user = interaction.options.getUser('jugador')
    if(!user) throw log_error('La opción jugador en el comando perfil ha sido llamada sin embargo no se ha pasado ningún jugador.')
    const client: CustomClient<true> = interaction.client
    const player = client.players?.get(user.id)
    if (!player) return interaction.reply(`¡${user} no ha empezado a jugar aún!`)
    const sword_equipped = '<:nope:930794572198596619> NINGÚNA'
    const armor_equipped = '<:nope:930794572198596619> NINGÚNA'
    const level = player?.get_level()
    const xp = player.get_xp()
    const max_xp = player.get_max_xp()
    const money = player.get_money()
    const world = player.get_world()
    const health = player.get_health()
    const max_health = player.get_max_health()
    const remaining_level_percentage = player.get_remaining_level_percentage()

    const embed = new EmbedBuilder()
        .setTitle(`Perfil de ${user.tag}:`)
        .setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
        })
        .setColor('#783B9F')
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            {
                name: '__PROGRESO__',
                value: `**Nivel**: ${level} (${remaining_level_percentage}%)\n**XP**: ${xp}/${max_xp}`,
            },
            {
                name: '__ESTADISTICAS__',
                value: `:heart: **SALUD**: ${health}/${max_health}\n:moneybag: **SOCIAL CREDITS**: +${money}\n:map: **MUNDO ACTUAL**: ${world}`,
            },
            {
                name: '__EQUIPO__',
                value: `⚔️ **Arma**: ${sword_equipped}\n🪖 **Armadura**: ${armor_equipped}`,
            }
        )
    await interaction.reply({ embeds: [embed] })
}