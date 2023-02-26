import { Client, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { PlayersManager } from '../managers/PlayersManager.js'
import { ServersManager } from '../managers/ServersManager.js'

export type Executor = (interaction: CommandInteraction) => Promise<void>

export type Command = {
    data: SlashCommandBuilder,
    execute: Executor,
}

export type Event = {
    name: string,
    once?: boolean,
    execute: (...args: unknown[]) => Promise<void>,
}

type SuperOptions = Collection<string, Executor>

export interface CustomClient<T extends boolean> extends Client<T>{
    commands?: Collection<string, Command>,
    players?: PlayersManager,
    servers?: ServersManager,
    super_commands?: Collection<string, SuperOptions>
}