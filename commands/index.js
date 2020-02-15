const data = require("../data/index.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();

function penisComment(penisSize) {
  let comment = "";
  if (penisSize <= 7) {
    return (comment =
      "Damerne ved literally ikke når du enter the cave.. <:pepehands:538114405838225409>");
  } else if (penisSize >= 8 && penisSize <= 14) {
    return (comment = "oh nonono.. <:pepelaugh:609080105695838234>");
  } else if (penisSize >= 15 && penisSize <= 19) {
    return (comment = "Respect bro. <:brandt_damer:419964006913277962>");
  } else if (penisSize >= 20) {
    return (comment = "UGANDAN BROTHER! <:pog:538106737970905109>");
  }
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function handleImage(args) {
  return fetch(`https://reddit.com/r/${args}.json`).then(data => data.json());
}

const commands = async msg => {
  if (msg.content === "hvor bor fuglene?") {
    msg.reply("I GENBRUGSBUTIKKEN!");
  }

  // Random Quote
  if (msg.content === "!quote") {
    const randomQuote = Math.floor(
      Math.random() * Math.floor(data.quotes.length)
    );
    msg.channel.send(
      `"${data.quotes[randomQuote].quote}" - ${data.quotes[randomQuote].quoteson}`
    );
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
    const randomDe = Math.floor(Math.random() * (9 - 1 + 1) + 1);
    const penisSize = randomNum(5, 25);

    msg.reply(
      `Din penis er ${penisSize}.${randomDe} cm. ${penisComment(penisSize)}`
    );
  }

  // Kvantosnap
  if (msg.content === "!kvantosnap") {
    const randomPic = randomNum(1, 128);

    msg.channel
      .send("", {
        files: [`assets/dc_snap/kvanto_${randomPic}.jpeg`]
      })
      .catch(e => console.log(e));
  }

  // Raffle
  if (msg.content.startsWith("!raffle")) {
    const args = msg.content.split(" ").slice(1);
    var item = args[Math.floor(Math.random() * args.length)];

    msg.channel.send(`Throwing the dice..`);

    setTimeout(() => {
      msg.channel.send(`Winner is: ${item}!`);
    }, 3000);
  }

  // Search image
  if (msg.content.startsWith("!image")) {
    const args = msg.content.split(" ").slice(1);
    const image = await handleImage(args[0]);
    let filteredImages = [];
    if (!image.error) {
      filteredImages = image.data.children.filter(image => {
        const types = ["jpg", "jpeg", "gif", "png"];
        return !types.indexOf(image.data.url.split(".").pop(-1));
      });
    }

    const num = randomNum(1, filteredImages.length);

    if (filteredImages >= 0 || filteredImages === undefined) {
      return msg.channel.send(
        "Ingen billeder fra bot <:pepehands:538114405838225409>"
      );
    } else {
      const img = filteredImages[num].data.url;
      return msg.channel.send(img);
    }
  }
};

module.exports = commands;
