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
cron.schedule("00 00 10 * * *", () => {
  randomForecast = parseInt(
    Math.random() * Math.floor(data.gamingForecast.length)
  );
  const channel = bot.channels.get("228187454182522881");
  channel.send(
    `Dagens gaming horoskop lyder således..\n **${data.gamingForecast[randomForecast]}**`
  );
});

bot.login(token).catch(e => console.log(e));
