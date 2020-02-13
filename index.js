require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const commands = require("./commands");

console.log(process.env.DC_TOKEN);

const token = process.env.DC_TOKEN;

bot.on("ready", () => {
  console.log("Kvantobot online");
});

bot.on("message", msg => commands(msg));

bot.login(token).catch(e => console.log(e));
