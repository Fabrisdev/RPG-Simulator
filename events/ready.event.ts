import { Events } from 'discord.js'
import { CustomClient } from '../types/custom_client.js'
import colors from 'colors'

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: CustomClient<true>){
        const date = new Date()
        const date_formatted = new Intl.DateTimeFormat('es', {
            timeStyle: 'medium'
        }).format(date)
        console.log(`[${date_formatted}] ${colors.bold(colors.yellow(`¡${client.user.username} está de vuelta en la fiesta!`))}`)
    },
}