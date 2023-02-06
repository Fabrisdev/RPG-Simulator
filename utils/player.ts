import { CommandInteraction, EmbedBuilder } from 'discord.js'
import { Player } from '../managers/PlayersManager.js'
import { CustomClient } from '../types/custom_client.js'
import { log_error } from './logger.js'
import { setup_supabase } from './supabase_helper.js'

async function add_player(interaction: CommandInteraction) {
    const { id } = interaction.user
    const supabase = setup_supabase()
    const { data, error } = await supabase
        .from('players')
        .insert({
            id
        })
        .select()
        .single()
    if(error){
        log_error(`Ocurrió un error al intentar añadir la tabla del jugador ${id}.`)
        return console.log(error)
    }
    const client: CustomClient<true> = interaction.client
    client.players?.set(id, new Player(data))
}

export function setup_player(interaction: CommandInteraction) {
    add_player(interaction)
    const embed = new EmbedBuilder()
        .setTitle(
            `¡Hey ${interaction.user.username}! ¡Bienvenido a RPG Simulator!`
        )
        .setColor(0x00ae86)
        .setDescription(
            'El propósito del juego es luchar, mejorar tus armas y avanzar de mundo a nuevos más dificiles pero con más recursos.\nHay un total de **10** mundos (tú empiezas en el #1).'
        )
        .addFields(
            {
                name: '__COMO JUGAR__',
                value: `
            :star: Obten XP y monedas luchando contra enemigos para mejorar tu armadura y avanzar en el juego. Puedes revisar tus estádisticas con \`perfil\`.
            :warning: **Si mueres, perderás un nivel**. Compra comida en la \`tienda\` para recuperar tu vida.`,
            },
            {
                name: '__TIENDA Y MONEDAS__',
                value: `
            :star: Gasta tus <:coin:929204039697195018> monedas conseguidas en la \`tienda\`.
            :star: En ella puedes comprar desde comida hasta **espadas y armadura legendaria**.
            :star: O elabora tus propias herramientas con \`elaborar\``,
            },
            {
                name: '__DUNGEONS Y MUNDOS__',
                value: `
            :star: Cuando creas estar preparado, compra un **portal** en la \`tienda\` el cual te llevará hacia tu próxima **dungeon con un jefe**.
            :star: Si logras vencerlo, desbloquearás un **nuevo mundo** al que podrás ir, con muchos mayores recursos :palm_tree:, nuevas herramientas :axe: y nuevos enemigos!`,
            },
            {
                name: '__MÁS__',
                value: `
            :star: Revisa todos los comandos usando \`ayuda\`. Te será de gran utilidad.
            :star: Si tienes dudas, puedes revisar consultar a mi creador Fabri :pleading_face:`,
            }
        )
    interaction.reply({
        content:
            '¡Hey! Parece que eres nuevo aquí. Deja que te explique como funcionan las cosas por aquí...',
        embeds: [ embed ],
    })
}