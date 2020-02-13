require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const data = require("./data/index.js");
const commands = require("./commands");

const token = process.env.DISCORD_TOKEN;

bot.on("ready", () => {
  console.log("Kvantobot online");
});

bot.on("message", msg => commands(msg));

bot.login(token).catch(e => console.log(e));
