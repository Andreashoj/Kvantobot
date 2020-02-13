const data = require("../data/index.js");
const CronJob = require("cron").CronJob;

const DailyForecast = new CronJob(
  "******",
  () => {
    console.log("works");
  },
  null,
  true,
  "Europe/Copenhagen"
);

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

const commands = msg => {
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
      "!quote - random kvanto quote \n!sutbruno - for at sutte brunos 15,5'er!"
    );
  } else if (msg.content === "!sutbruno") {
    // FJERN IGEN HEHEHE
    msg.reply("GWAK GWAK GWAK");
  }

  // penis
  if (msg.content === "!penis") {
    const randomDe = Math.floor(Math.random() * (9 - 1 + 1) + 1);
    const penisSize = Math.floor(Math.random() * (25.0 - 5.0 + 1) + 5);

    msg.reply(
      `Din penis er ${penisSize}.${randomDe} cm. ${penisComment(penisSize)}`
    );
  }

  DailyForecast.start();
};

module.exports = commands;
