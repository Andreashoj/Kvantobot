const { Configuration, OpenAIApi } = require("openai");
const emotes = require('../data/emotes')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async function (bot) {
    bot.on('message', async (msg) => {
        if (msg.content.includes('!kvantoAI')) {
            let question = msg.content.replace('!kvantoAI', '')

            msg.channel.send(`Arh yes, a fools request.. ${emotes.brandtSmart}`)

            const completion = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: question,
                max_tokens: 150,
            });

            console.log(completion.data.choices[0].text)

            msg.channel.send(completion.data.choices[0].text)
        }
    })
}