const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(3000, () => console.log('Server is running on port 3000'));

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content === '!شغل') message.reply('جاري العمل...');
    if (message.content === '!بنك') message.reply('رصيدك هو 0 ｍ حالياً.');
});

client.login(process.env.DISCORD_TOKEN);
