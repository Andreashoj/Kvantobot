const data = require("../data/index.js");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

// Util functions
function randomNum(min, max) {
  return Math.round(Math.random() * (max - min + 1) + min);
}

function penisComment(penisSize) {
  let comment = '';
  if (penisSize === 1) {
    return (comment =
      "Tillykke! Du har formået det umulige, din penis er officielt 14  gange mindre end komo's, og det siger lidt <:pepelaugh:609080105695838234>");
  } else if (penisSize === 2) {
    return (comment =
      'Selv min nye kikkert har svært ved at få øje på den lille ostereje <:pepelaugh:609080105695838234>');
  } else if (penisSize === 3) {
    return (comment = 'Sikke en sød lille ven du har dig der :)');
  } else if (penisSize === 4) {
    return (comment =
      'SELV ASIATERNE LIGNER HULK I FORHOLD TIL DIG <:omegalul:420997226446323732>');
  } else if (penisSize === 5) {
    return (comment =
      'NURGH EN LIL DVÆRGHAMSTER <:omegalul:420997226446323732>');
  } else if (penisSize <= 7 && penisSize >= 6) {
    return (comment =
      'Damerne ved literally ikke når du enter the cave.. <:pepehands:538114405838225409>');
  } else if (penisSize >= 8 && penisSize <= 14) {
    return (comment = 'oh nonono.. <:pepelaugh:609080105695838234>');
  } else if (penisSize >= 15 && penisSize <= 19) {
    return (comment = 'Respect bro. <:brandt_damer:419964006913277962>');
  } else if (penisSize >= 20 && penisSize <= 24) {
    return (comment = 'UGANDAN BROTHER! <:pog:538106737970905109>');
  } else {
    return (comment = 'DEN DANSKE MANDINGO <:pog:538106737970905109>');
  }
}

function handleImage(args) {
  return fetch(`https://reddit.com/r/${args}.json`)
    .then((data) => data.json())
    .catch((e) => console.log(e));
}

// Command functions

const getQuote = (msg) => {
  const randomQuote = Math.floor(
    Math.random() * Math.floor(data.quotes.length)
  );
  msg.channel.send(
    `"${data.quotes[randomQuote].quote}" - ${data.quotes[randomQuote].quoteson}`
  );
};

const getSize = (msg) => {
  const randomDe = Math.floor(Math.random() * (9 - 1 + 1) + 1);
  const randomLowerNum = randomNum(1, 100);
  let penisSize = '';

  if (randomLowerNum < 5) {
    penisSize = randomNum(0, 5);
    msg.reply(
      `Din penis er ${penisSize}.${randomDe} cm. ${penisComment(penisSize)}`
    );
  } else {
    penisSize = randomNum(5, 26);
    msg.reply(
      `Din penis er ${penisSize}.${randomDe} cm. ${penisComment(penisSize)}`
    );
  }
};

const getSnap = (msg) => {
  const randomPic = randomNum(0, 299);

  const dirPath = path.join(__dirname, '../assets/dc_snap');

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log(err);
    }

    msg.channel
      .send('', {
        files: [`assets/dc_snap/${files[randomPic]}`],
      })
      .catch((e) => console.log(e));
  })
};

const getRaffle = (msg) => {
  const args = msg.content.split(' ').slice(1);
  var item = args[Math.floor(Math.random() * args.length)];

  msg.channel.send(`Throwing the dice..`);

  setTimeout(() => {
    msg.channel.send(`Winner is: ${item}!`);
  }, 3000);
};

const getImage = async (msg) => {
  const args = msg.content.split(' ').slice(1);

  const image = await handleImage(args[0]);

  let filteredImages = [];
  if (!image.error) {
    filteredImages = image.data.children.filter((image) => {
      const types = ['jpg', 'jpeg', 'gif', 'png', 'gifv'];
      return types.indexOf(image.data.url.split('.').pop(-1)) !== -1;
    });
  }
  const num = randomNum(0, filteredImages.length);
  if (filteredImages.length === 0) {
    return msg.channel.send(
      'Ingen billeder fra bot <:pepehands:538114405838225409>'
    );
  } else {
    const img = filteredImages[num].data.url;
    return msg.channel.send(img);
  }
};

const getShot = (msg) => {
  const randomNumber = randomNum(0, 100);
  const kvantoMember = randomNum(0, 4);

  if (randomNumber > 50) {
    msg.reply(`Bare åben den flaske gamle.`);
  } else {
    msg.channel.send(`Nååå, hvem skal ha en lil en...`);
    setTimeout(() => {
      msg.channel.send(`Det blev sgu ${data.members[kvantoMember]}!`);
    }, 3000);
  }
};

const getBruno = (msg) => {
  const decider = randomNum(0, 1);

  if (decider === 0) {
    msg.channel.send(
      data.kvantoMember.bruno[randomNum(0, data.kvantoMember.bruno.length)]
    );
  } else {
    msg.channel.send('who? <:yikes:538112912817127456>');
  }
};

const getNickname = (msg) => {
  msg.member.setNickname(msg.content.replace('changeNick ', ''));
};

const getWho = (msg) => {
  const kvanto = ['ANZ', 'BRANDT', 'BRUNO', 'KOMO', 'NICKU'];
  const num = randomNum(0, 4);
  const comment = `${kvanto[num]} WH<:omegalul:420997226446323732>?`;

  msg.channel.send(comment);
};

const getDonate = (msg) => {
  msg.channel.send(
    'Donate to my creator https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LJ25W37PPK4RU&source=url <3'
  );
};

const getPercantage = (msg) => {
  const perc = randomNum(0, 100);
  msg.channel.send(`Udregner.. <:brandt_smart:419959960839913483>`);

  setTimeout(() => {
    msg.channel.send(`Hmm, procenten er ${perc}%`);
  }, 3000);
};

const getMention = (msg) => {
  console.log(msg.mentions.members);
};

const getTodo = (msg) => {
  const num = randomNum(0, 16);

  const todo = `${data.todo[num]}`;
  console.log(todo)

  msg.channel.send(`Hmm, hvad mon den magiske krystal siger :robot: :crystal_ball:`);
  
  setTimeout(() => {
    msg.channel.send(todo);
  }, 3000);
};

exports.getQuote = getQuote;
exports.getSize = getSize;
exports.getSnap = getSnap;
exports.getRaffle = getRaffle;
exports.getImage = getImage;
exports.getBruno = getBruno;
exports.getNickname = getNickname;
exports.getWho = getWho;
exports.getDonate = getDonate;
exports.getPercantage = getPercantage;
exports.getShot = getShot;
exports.getMention = getMention;
exports.getTodo = getTodo;
