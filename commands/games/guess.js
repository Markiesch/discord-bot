const { MessageEmbed, MessageCollector } = require("discord.js");

module.exports = {
    category: "Fun",
    cooldown: "3s",
    callback: ({ message, args }) => {
        let maxNumber = 20;
        let maxGuesses = 4;
        let maxHints = 2;
        let number = Math.floor(Math.random() * maxNumber);
        let latestNumber;

        message.channel
            .send(
                `You have 4 attempts to try and guess my random number between 1 and ${maxNumber}. Type your answer in the chat as a valid number.\nYou can type\`end\` at anytime to stop, or type\`hint\` to know how high or low your last number was`
            )
            .then((msg) => {
                const filter = (m) => m.author.id == message.author.id;

                const collector = new MessageCollector(message.channel, filter, {
                    time: 1000 * 60 * 5,
                });

                let interval = setInterval(function () {
                    collector.stop();
                }, 1000 * 60 * 1); // 1 minute untill the game will end automaticly

                collector.on("collect", (m) => {
                    if (m.content.toLowerCase() == "stop") collector.stop("userStop");
                    if (!maxGuesses) return collector.stop();

                    clearInterval(interval);
                    attempts++;

                    if (isNaN(m.content)) return m.channel.send(`**${m.content}** is not a valid number :rolling_eyes:`);

                    if (m.content > maxNumber)
                        return m.channel.send(
                            `Listen buddy, it's gotta be a number between **1** and **${maxNumber}**. No higher, no lower **${maxGuesses}** attempts left and ${maxHints} hints left.`
                        );

                    maxGuesses--;
                });

                collector.on("end", (collected, reason) => {
                    if (attempts == 0) return message.channel.send(`alright looks like we're not playing the game, whatever`);
                });
            });
    },
};
