const schedule = require('node-schedule');

module.exports = function (bot) {
    schedule.scheduleJob({ hour: 8, minute: 0 }, () => {
        const channel = bot.channels.cache.get('687204415563628602');

        channel.send(`Godmorgen kvanto, lad os se hvad dagens meloner byder på`);

        setTimeout(() => {
            channel.send(`!image boobs`);
        }, 3000);
    });

    return module
} 