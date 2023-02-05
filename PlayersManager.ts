import { createClient } from '@supabase/supabase-js'
import { Database, Json } from './types/database.types'
import { log_error } from './utils/log.js'
const { SUPABASE_SERVICE_ROLE, SUPABASE_URL } = process.env
import { Collection } from 'discord.js'

function setupSupabase(){
    if(!SUPABASE_SERVICE_ROLE || !SUPABASE_URL) throw log_error('Mmmh. Parece que estan faltando las claves de supabase o son incorrectas.')

    return createClient<Database>(
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE
    )
}

async function getPlayersData(){
    const supabase = setupSupabase()
    const { data, error } = await supabase
        .from('players')
        .select('*')
    if(error){
        log_error('Ay no. Ocurrió un error al obtener la información de los jugadores')
        throw error
    }
    return data
}

export class Player{
    private id: string
    private health: number
    private items: Json
    private level: number

    constructor(data: Database['public']['Tables']['players']['Row']){
        this.id = data.id
        this.health = data.health
        this.items = data.items
        this.level = data.level
    }

    getId(){
        return this.id
    }

    getHealth(){
        return this.health
    }
}

export class PlayersManager extends Collection<string, Player>{
    constructor(){
        super()
        this.setPlayersData()
    }

    private async setPlayersData(){
        const playersData = await getPlayersData()
        playersData.map(playerData => {
            this.set(playerData.id, playerData)
        })
    }
}