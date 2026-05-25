const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
app.listen(3000);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// محاكاة لقاعدة بيانات (عشان تحفظ الفلوس)
const bankDB = {}; 

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    const uid = message.author.id;
    if (!bankDB[uid]) bankDB[uid] = { money: 0, job: 'عاطل' };

    const args = message.content.split(' ');

    // أمر الرصيد
    if (args[0] === '!بنك') {
        message.reply(`💳 **حسابك البنكي:**\n💰 الرصيد: ${bankDB[uid].money} ｍ\n💼 الوظيفة: ${bankDB[uid].job}`);
    }

    // أمر الشغل
    if (args[0] === '!شغل') {
        const reward = Math.floor(Math.random() * 100) + 50;
        bankDB[uid].money += reward;
        bankDB[uid].job = 'موظف بنك';
        message.reply(`✅ اشتغلت وربحت ${reward} ｍ! رصيدك: ${bankDB[uid].money}`);
    }

    // أمر البورصة
    if (args[0] === '!بورصة') {
        const win = Math.random() > 0.5;
        if (win) {
            bankDB[uid].money += 100;
            message.reply(`📈 مبروك! البورصة ارتفعت، ربحت 100 ｍ. رصيدك: ${bankDB[uid].money}`);
        } else {
            bankDB[uid].money = Math.max(0, bankDB[uid].money - 50);
            message.reply(`📉 خساير! البورصة نزلت، خسرت 50 ｍ. رصيدك: ${bankDB[uid].money}`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
  
