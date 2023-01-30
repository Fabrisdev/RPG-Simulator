import { Client, Collection } from 'discord.js'

export default interface CustomClient extends Client{
    commands?: Collection<unknown, unknown>
}