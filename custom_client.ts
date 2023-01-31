import { Client, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js'

export type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>,
}

export default interface CustomClient extends Client{
    commands?: Collection<string, Command>
}

