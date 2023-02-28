import { ChatInputCommandInteraction } from 'discord.js'
import { CustomClient } from '../../types/custom_client'
import { setup_player } from '../../utils/player.js'
import show_profile from './show_profile.js'

export default async (interaction: ChatInputCommandInteraction) => {
    const client: CustomClient<true> = interaction.client
    const { user } = interaction
    const player = client.players?.get(user.id)
    if (!player) return setup_player(interaction)
    show_profile({
        user, 
        interaction
    })
}