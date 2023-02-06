import { Collection } from 'discord.js'
import { Database } from '../types/database.types'
import { log_error } from '../utils/logger.js'
import { setup_supabase } from '../utils/supabase_helper.js'

async function get_servers_data(){
    const supabase = setup_supabase()
    const { data, error } = await supabase
        .from('servers')
        .select('*')
    if(error){
        log_error('Ocurrió un error al intentar obtener la información de los servidores')
        throw console.log(error)
    }
    return data
}

class Server{
    private id: string
    private allowed_channel: string | null
    private all_channels_allowed: boolean

    constructor(data: Database['public']['Tables']['servers']['Row']){
        this.id = data.id
        this.all_channels_allowed = data.all_channels_allowed
        this.allowed_channel = data.allowed_channel
    }

    get_id(){
        return this.id
    }

    get_allowed_channel(){
        return this.allowed_channel
    }

    /**
     * 
     * whether or not the bot is allowed to be used in all channels
     */
    get_all_channels_allowed(){
        return this.all_channels_allowed
    }
}

export class ServersManager extends Collection<string, Server>{
    constructor(){
        super()
        this.set_servers()
    }

    private async set_servers(){
        const serversData = await get_servers_data()
        serversData.map(serverData => {
            this.set(serverData.id, new Server(serverData))
        })
    }
}