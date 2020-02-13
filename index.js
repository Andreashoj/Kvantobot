require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const commands = require("./commands");

const environment = process.env.NODE_ENV;

const token =
  environment === "development"
    ? process.env.DISCORD_TOKEN
    : process.env.DC_TOKEN;

bot.on("ready", () => {
  console.log("Kvantobot online");
});

bot.on("message", msg => commands(msg));

bot.login(token).catch(e => console.log(e));
