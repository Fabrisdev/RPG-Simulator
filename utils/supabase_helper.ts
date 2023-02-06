import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { Database } from '../types/database.types.js'
import { log_error } from './logger.js'
dotenv.config()
const { SUPABASE_SERVICE_ROLE, SUPABASE_URL } = process.env

export function setup_supabase() {
    if (!SUPABASE_SERVICE_ROLE || !SUPABASE_URL)
        throw log_error(
            'Mmmh. Parece que estan faltando las claves de supabase o son incorrectas.'
        )

    return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE)
}