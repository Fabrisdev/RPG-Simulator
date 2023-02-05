import { Events } from 'discord.js'
import { CustomClientTrue } from '../types/custom_client.js'

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: CustomClientTrue){
        const date = new Date()
        const date_formatted = new Intl.DateTimeFormat('es', {
            timeStyle: 'medium'
        }).format(date)
        console.log(`[${date_formatted}] ¡${client.user.username} está de vuelta en la fiesta!`)
    },
}