require("dotenv").config();
const cron = require("node-cron");
const Discord = require("discord.js");
const data = require("./data/index.js");
const bot = new Discord.Client();
const commands = require("./commands");
const gamble = require("./gamble/index.js");

const environment = process.env.NODE_ENV;

const token =
  environment === "development"
    ? process.env.DISCORD_TOKEN
    : process.env.DC_TOKEN;

bot.on("ready", async () => {
  console.log("Kvantobot online");

  const guild = await bot.guilds.get("228187454182522881");
  const users = gamble.getUsers(guild);
});

bot.on("message", msg => commands(msg));

// Scheduled gaming forecast
cron.schedule("00 00 9 * * *", () => {
  randomForecast = parseInt(
    Math.random() * Math.floor(data.gamingForecast.length)
  );
  const channel = bot.channels.get("228187454182522881");
  channel.send(
    `Dagens gaming horoskop lyder således..\n **${data.gamingForecast[randomForecast]}**`
  );
});

cron.schedule("00 00 07 * * *", () => {
  const channel = bot.channels.get("687204415563628602");

  channel.send(`Godmorgen kvanto, lad os se hvad dagens meloner byder på`);

  setTimeout(() => {
    channel.send(`!image boobs`);
  }, 3000);
});

bot.login(token).catch(e => console.log(e));
