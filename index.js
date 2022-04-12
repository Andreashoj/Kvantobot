require('dotenv').config();
const fs = require('fs');
const schedule = require('node-schedule');
const commands = require('./commands');
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });
const cloudinary = require('cloudinary').v2


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./modules/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./modules/${file}`);

  if (command && command.name) {
    bot.commands.set(command.name, command);
  }
}

const token = process.env.DC_TOKEN

bot.on('ready', async () => {
  console.log('Kvantobot ready for service')
});

bot.on('message', (msg) => commands(msg));

// // Music player
const prefix = "!"

bot.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const acceptedArgs = ['skip', 'play', 'dj', 'stop']
  const hasArgs = acceptedArgs.some(word => msg.content.includes(word))

  if (!hasArgs) {
    return;
  }

  const args = msg.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = bot.commands.get(cmd) || bot.commands.find(a => a.aliases && a.aliases.includes(cmd));

  try {
    command.execute(msg, args, cmd, bot, Discord);
  } catch (err) {
    msg.reply("There was an error")
    console.log(err)
  }
})

// // CRON jobs

// // Scheduled gaming forecast
// schedule.scheduleJob('00 00 9 * * *', () => {
//   randomForecast = parseInt(
//     Math.random() * Math.floor(data.gamingForecast.length)
//   );
//   const channel = bot.channels.cache.get('228187454182522881');
//   channel.send(
//     `Dagens gaming horoskop lyder således..\n **${data.gamingForecast[randomForecast]}**`
//   );
// });

schedule.scheduleJob({ hour: 9, minute: 0 }, () => {
  const channel = bot.channels.cache.get('687204415563628602');

  channel.send(`Godmorgen kvanto, lad os se hvad dagens meloner byder på`);

  setTimeout(() => {
    channel.send(`!image boobs`);
  }, 3000);
});

bot.login(token).catch((e) => console.log('error logging:', e));
