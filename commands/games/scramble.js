const { MessageCollector } = require("discord.js");
const { words } = require("../../util/fast-type-words.json");

module.exports = {
    category: "Fun",
    cooldown: "3s",
    description: "Try guessing a word in the wrong order",
    callback: ({ message }) => {
        let attempts = 0;
        const word = words[Math.floor(Math.random() * words.length)];
        const shuffled = word
            .split("")
            .sort(() => {
                return 0.5 - Math.random();
            })
            .join("");

        message
            .reply(
                `You've got 4 attempts to try and guess my random word, the letters are mixed up your word is \`${shuffled}\`.\nType your answer in the chat underneath. You can type \`stop\` at anytime to stop.`
            )
            .then((msg) => {
                const filter = (m) => m.author.id == message.author.id;
                const collector = new MessageCollector(message.channel, filter, {
                    max: word.length + 5,
                    time: 1000 * 60 * 5, //10 minutes
                });

                let interval = setInterval(function () {
                    collector.stop();
                }, 1000 * 60 * 1); // 1 minute untill the game will end automaticly

                collector.on("collect", (m) => {
                    if (m.content.toLowerCase() == "stop") collector.stop("userStop");

                    clearInterval(interval);
                    attempts++;

                    if (m.content == word) collector.stop("win");
                });

                collector.on("end", (m, reason) => {
                    if (reason == "win") return message.channel.send(`Good stuff, you got the correct word. The word was \`${word}\``);
                    if (reason == "userStop") return message.channel.send(`Stopped playing scramble, The word was \`${word}\``);
                    if (attempts == 0) return message.channel.send(`alright looks like we're not playing the game, whatever`);
                });
            });
    },
};
