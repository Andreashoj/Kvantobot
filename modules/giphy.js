const giphy = require('giphy-api')(process.env.GIPHY_API_KEY);
const utils = require('../commands/utils')

module.exports = function (bot) {
    let module = {}

    module.search = function () {
        bot.on('message', (msg) => {
            if (msg.author.username === process.env.BOT_USERNAME || msg.content[0] === '!') {
                return;
            }

            const odds = utils.randomNum(0, 100)

            if (odds < 5) {
                const typeOfGiphy = utils.randomNum(0, 100);
                const search = typeOfGiphy > 50 ? 'YOU SUCK' : 'YOURE AWESOME';

                msg.channel.send(`Hey ${msg.author}!`)

                giphy.search({
                    q: search,
                    limit: 15,
                }).then(function (res) {
                    msg.channel.send(res.data[utils.randomNum(0, 14)].url)
                
                }).catch(e => console.log(e))
            } 
        })
    }

    return module
}