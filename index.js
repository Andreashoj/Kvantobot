require('dotenv').config();
const token = process.env.DC_TOKEN
const commands = require('./commands');
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });

bot.commands = new Discord.Collection();

require('./modules/giphy')(bot).search();
require('./modules/cloudinary');
require('./modules/schedules.js')(bot);
require('./modules/play.js')(bot);


bot.on('ready', () => console.log('Kvantobot ready for service'));

bot.on('message', (msg) => commands(msg));

bot.login(token).catch((e) => console.log('error logging:', e));
