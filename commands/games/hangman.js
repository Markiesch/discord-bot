const { MessageEmbed, MessageCollector } = require("discord.js");
const { words } = require("../../util/fast-type-words.json");

module.exports = {
    category: "games",
    cooldown: "3s",
    guildOnly: true,
    description: "Play Hangman!",
    callback: ({ message, client }) => {
        const player = message.author.username;
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        const randomWord = words[Math.floor(Math.random() * words.length)];
        // const randomWord = "baa";
        const word = [...randomWord];
        let guessedLetters = [];
        let format = [];
        for (let x = 0; x < word.length; x++) {
            format.push("_");
        }
        let wrongs = 0;

        // const ownerIcon = client.guilds.resolve("801905744680452097").members.resolve("462181957078614017").user.avatarURL();

        const gameMessage = new MessageEmbed()
            .setColor(randomColor)
            .setFooter(`Made By: Markiesch`)
            .setDescription(
                "```" +
                    "|‾‾‾‾‾‾|   \n|     " +
                    (wrongs > 0 ? "🎩" : " ") +
                    "   \n|     " +
                    (wrongs > 1 ? "😟" : " ") +
                    "   \n|     " +
                    (wrongs > 2 ? "👕" : " ") +
                    "   \n|     " +
                    (wrongs > 3 ? "🩳" : " ") +
                    "   \n|    " +
                    (wrongs > 4 ? "👞👞" : " ") +
                    "   \n|     \n|__________\n\n" +
                    `${format.join(" ")}` +
                    "```" +
                    `Wrong letters: ${wrongs}` +
                    "\n\n**How To Play**\nType letters after this message to guess a letter!"
            );

        message.channel.send(gameMessage).then((msg) => {
            const max = word.length + 5;
            const filter = (m) => m.content.length == 1;
            // m.author.id == message.author.id &&
            const collector = new MessageCollector(message.channel, filter, {
                max: max,
                time: 1000 * 60 * 10, //10 minutes
            });

            collector.on("collect", (m) => {
                guessedLetters.push(m.content.toLowerCase());
                if (!word.includes(m.content.toLowerCase())) {
                    wrongs++;
                } else {
                    for (let i = 0; i < word.length; i++) {
                        if (m.content.toLowerCase() == word[i]) {
                            format[i] = word[i];
                        }
                    }
                }

                if (wrongs == 5) return collector.stop();
                if (!format.includes("_")) return collector.stop();
                msg.edit(
                    gameMessage.setDescription(
                        "```" +
                            "|‾‾‾‾‾‾|   \n|     " +
                            (wrongs > 0 ? "🎩" : " ") +
                            "   \n|     " +
                            (wrongs > 1 ? "😟" : " ") +
                            "   \n|     " +
                            (wrongs > 2 ? "👕" : " ") +
                            "   \n|     " +
                            (wrongs > 3 ? "🩳" : " ") +
                            "   \n|    " +
                            (wrongs > 4 ? "👞👞" : " ") +
                            "   \n|     \n|__________\n\n" +
                            `${format.join(" ")}` +
                            "```" +
                            `Wrong letters: ${wrongs}` +
                            "\n\n**How To Play**\nType letters after this message to guess a letter!"
                    )
                );
            });

            collector.on("end", (collected) => {
                let message;
                if (wrongs == 5) {
                    message = `**${player}** has lost! \n\n The word was: \n${randomWord.toUpperCase()}`;
                } else {
                    message = `**${player}** won! \n\n The word was: \n${randomWord.toUpperCase()}`;
                }

                msg.edit(
                    gameMessage.setDescription(
                        message +
                            "```" +
                            "|‾‾‾‾‾‾|   \n|     " +
                            (wrongs > 0 ? "🎩" : " ") +
                            "   \n|     " +
                            (wrongs > 1 ? "😟" : " ") +
                            "   \n|     " +
                            (wrongs > 2 ? "👕" : " ") +
                            "   \n|     " +
                            (wrongs > 3 ? "🩳" : " ") +
                            "   \n|    " +
                            (wrongs > 4 ? "👞👞" : " ") +
                            "   \n|     \n|__________\n\n" +
                            `${format.join(" ")}` +
                            "```" +
                            `\nWrong letters: ${wrongs}`
                    )
                );
            });
        });
    },
};
