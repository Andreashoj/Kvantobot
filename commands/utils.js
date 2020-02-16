const data = require("../data/index.js");
const fetch = require("node-fetch");

// Util functions
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

function handleImage(args) {
  return fetch(`https://reddit.com/r/${args}.json`)
    .then(data => data.json())
    .catch(e => console.log(e));
}

// Command functions

const getQuote = msg => {
  const randomQuote = Math.floor(
    Math.random() * Math.floor(data.quotes.length)
  );
  msg.channel.send(
    `"${data.quotes[randomQuote].quote}" - ${data.quotes[randomQuote].quoteson}`
  );
};

const getSize = msg => {
  const randomDe = Math.floor(Math.random() * (9 - 1 + 1) + 1);
  const penisSize = randomNum(5, 25);

  msg.reply(
    `Din penis er ${penisSize}.${randomDe} cm. ${penisComment(penisSize)}`
  );
};

const getSnap = msg => {
  const randomPic = randomNum(1, 128);

  msg.channel
    .send("", {
      files: [`assets/dc_snap/kvanto_${randomPic}.jpeg`]
    })
    .catch(e => console.log(e));
};

const getRaffle = msg => {
  const args = msg.content.split(" ").slice(1);
  var item = args[Math.floor(Math.random() * args.length)];

  msg.channel.send(`Throwing the dice..`);

  setTimeout(() => {
    msg.channel.send(`Winner is: ${item}!`);
  }, 3000);
};

const getImage = async msg => {
  const args = msg.content.split(" ").slice(1);
  const image = await handleImage(args[0]);
  let filteredImages = [];
  if (!image.error) {
    filteredImages = image.data.children.filter(image => {
      const types = ["jpg", "jpeg", "gif", "png", "gifv"];
      return types.indexOf(image.data.url.split(".").pop(-1)) !== -1;
    });
  }
  const num = randomNum(0, filteredImages.length);
  if (filteredImages.length === 0) {
    return msg.channel.send(
      "Ingen billeder fra bot <:pepehands:538114405838225409>"
    );
  } else {
    const img = filteredImages[num].data.url;
    return msg.channel.send(img);
  }
};

exports.getQuote = getQuote;
exports.getSize = getSize;
exports.getSnap = getSnap;
exports.getRaffle = getRaffle;
exports.getImage = getImage;
