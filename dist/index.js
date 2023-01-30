import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
const { DISCORD_TOKEN } = process.env;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ]
});
client.once(Events.ClientReady, c => {
    console.log(`¡${c.user.username} ha llegado a la fiesta!`);
});
