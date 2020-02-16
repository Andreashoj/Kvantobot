const command = require("./utils.js");

const commands = async msg => {
  if (msg.content === "hvor bor fuglene?") {
    msg.reply("I GENBRUGSBUTIKKEN!");
  }

  if (msg.content === "!bruno") {
    msg.reply("Min Bruno er hård <:omega_bruno:426832042160947211>");
  }

  // Random Quote
  if (msg.content === "!quote") {
    command.getQuote(msg);
  }

  // Help
  if (msg.content === "!help") {
    msg.channel.send(
      "**!quote - random kvanto quote \n!sutbruno - for at sutte brunos 15,5'er!\n!quote - for en random kvanto quote!\n!kvantosnap - for en random kvantosnap\n!image - for en random image search\n!raffle - eksempel -> !raffle komo bruno og så bliver en vinder valgt!**"
    );
  } else if (msg.content === "!sutbruno") {
    // FJERN IGEN HEHEHE
    msg.reply("GWAK GWAK GWAK");
  }

  // penis
  if (msg.content === "!penis") {
    command.getSize(msg);
  }

  // Kvantosnap
  if (msg.content === "!kvantosnap") {
    command.getSnap(msg);
  }

  // Raffle
  if (msg.content.startsWith("!raffle")) {
    command.getRaffle(msg);
  }

  // Search image
  if (msg.content.startsWith("!image")) {
    command.getImage(msg);
  }
};

module.exports = commands;
