export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          health: number
          id: string
          items: Json
          level: number
          money: number
          world: number
          xp: number
        }
        Insert: {
          health?: number
          id: string
          items?: Json
          level?: number
          money?: number
          world?: number
          xp?: number
        }
        Update: {
          health?: number
          id?: string
          items?: Json
          level?: number
          money?: number
          world?: number
          xp?: number
        }
      }
      servers: {
        Row: {
          all_channels_allowed: boolean
          allowed_channel: string | null
          id: string
        }
        Insert: {
          all_channels_allowed?: boolean
          allowed_channel?: string | null
          id: string
        }
        Update: {
          all_channels_allowed?: boolean
          allowed_channel?: string | null
          id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

