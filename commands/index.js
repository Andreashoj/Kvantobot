const command = require("./utils.js");

const commands = async msg => {
  if (msg.content === "hvor bor fuglene?") {
    msg.reply("I GENBRUGSBUTIKKEN!");
  }

  if (msg.content === "!bruno") {
    command.getBruno(msg);
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

  // Set nickname
  if (msg.content === "!nickname") {
    command.getNickname(msg);
  }

  // WHO ?
  if (msg.content === "!who") {
    command.getWho(msg);
  }

  if (msg.content === "!donate") {
    command.getDonate(msg);
  }

  if (msg.content === "!perc") {
    command.getPercantage(msg);
  }

  if (msg.content === "!shot") {
    command.getShot(msg)
  }

  if (msg.content === "!todo") {
    command.getTodo(msg)
  }

  if(msg.mentions.members.first()) {
    for (let [key, value] of msg.mentions.members) {
      if(value.user.username === 'KvantoBot' || value.user.username === 'Andreas') {
        msg.react('😍')
      }
    }
  }
};

module.exports = commands;
