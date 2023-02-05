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
        }
        Insert: {
          health?: number
          id: string
          items?: Json
          level?: number
        }
        Update: {
          health?: number
          id?: string
          items?: Json
          level?: number
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

