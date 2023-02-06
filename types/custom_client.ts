import { Client, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { PlayersManager } from '../managers/PlayersManager.js'
import { ServersManager } from '../managers/ServersManager.js'

export type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>,
}

export type Event = {
    name: string,
    once?: boolean,
    execute: (...args: unknown[]) => Promise<void>,
}

export interface CustomClient<T extends boolean> extends Client<T>{
    commands?: Collection<string, Command>,
    players?: PlayersManager,
    servers?: ServersManager
}