require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const commands = require("./commands");

bot.on("ready", () => {
  console.log("Kvantobot online");
});

bot.on("message", msg => commands(msg));

bot.login(process.env.DC_TOKEN).catch(e => console.log(e));
