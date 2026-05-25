const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

// ده سيرفر صغير عشان الرندر يفضل مشغل البوت
app.get('/', (req, res) => res.send('البوت شغال!'));
app.listen(3000);

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.on('ready', () => {
  console.log(`البوت شغال: ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!تجربة') {
    message.reply('البوت شغال 100% يا وحش!');
  }
});

client.login(process.env.DISCORD_TOKEN);
