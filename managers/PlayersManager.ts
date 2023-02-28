import { Database, Json } from '../types/database.types'
import { log_error } from '../utils/logger.js'
import { Collection } from 'discord.js'
import { setup_supabase } from '../utils/supabase_helper.js'

async function getPlayersData() {
    const supabase = setup_supabase()
    const { data, error } = await supabase.from('players').select('*')
    if (error) {
        log_error(
            'Ay no. Ocurrió un error al obtener la información de los jugadores'
        )
        throw error
    }
    return data
}

export class Player {
    private id: string
    private health: number
    private items: Json
    private level: number
    private world: number
    private xp: number
    private money: number

    constructor(data: Database['public']['Tables']['players']['Row']) {
        this.id = data.id
        this.health = data.health
        this.items = data.items
        this.level = data.level
        this.money = data.money
        this.world = data.world
        this.xp = data.xp
    }

    get_id() {
        return this.id
    }

    get_health() {
        return this.health
    }

    get_max_health() {
        return 40 + this.level * 5
    }

    get_items() {
        return this.items
    }

    get_level() {
        return this.level
    }

    get_remaining_level_percentage() {
        return Math.round((100 * this.xp) / this.get_max_xp())
    }

    get_world() {
        const world_names = [
            'Isla de danoninos (#1)',
        ]

        return world_names[this.world] ?? 'Desconocido'
    }

    get_raw_world(){
        return this.world
    }

    get_xp() {
        return this.xp
    }

    get_max_xp() {
        return Math.round(1.2 ** this.level * 100)
    }

    get_money() {
        return this.money
    }

    set_level(level: number){
        this.level = level
        const supabase = setup_supabase()
        supabase
            .from('players')
            .update({
                level,
            })
            .eq('id', this.id)
    }
}

export class PlayersManager extends Collection<string, Player> {
    constructor() {
        super()
        this.setPlayersData()
    }

    private async setPlayersData() {
        const playersData = await getPlayersData()

        playersData.map(playerData => {
            this.set(playerData.id, new Player(playerData))
        })
    }
}
