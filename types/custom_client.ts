import { Client, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { Player } from '../PlayersManager.js'

export type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>,
}

export type Event = {
    name: string,
    once?: boolean,
    execute: (...args: any[]) => Promise<void>,
}

export interface CustomClient extends Client{
    commands?: Collection<string, Command>,
    players?: Collection<string, Player>
}

export interface CustomClientTrue extends Client<true>{
    commands?: Collection<string, Command>,
    players?: Collection<string, Player>
}