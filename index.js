require('dotenv').config();
const fs = require('fs');
const cron = require('node-cron');
const data = require('./data/index.js');
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });

const environment = process.env.NODE_ENV;

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./modules/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./modules/${file}`);

  if (command && command.name) {
    bot.commands.set(command.name, command);
  }
}

const token =
  environment === 'development'
    ? process.env.DISCORD_TOKEN
    : process.env.DC_TOKEN;

bot.on('ready', async () => {
  console.log('Kvantobot online');
});

bot.on('message', (msg) => commands(msg));

// Music player
const prefix = "!"

bot.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

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

// CRON jobs

// Scheduled gaming forecast
cron.schedule('00 00 9 * * *', () => {
  randomForecast = parseInt(
    Math.random() * Math.floor(data.gamingForecast.length)
  );
  const channel = bot.channels.get('228187454182522881');
  channel.send(
    `Dagens gaming horoskop lyder således..\n **${data.gamingForecast[randomForecast]}**`
  );
});

cron.schedule('00 00 07 * * *', () => {
  const channel = bot.channels.get('687204415563628602');

  channel.send(`Godmorgen kvanto, lad os se hvad dagens meloner byder på`);

  setTimeout(() => {
    channel.send(`!image boobs`);
  }, 3000);
});

bot.login(token).catch((e) => console.log(e));
