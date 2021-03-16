const Discord = require("discord.js");
const validSymbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

module.exports = {
    category: "Fun",
    cooldown: "3s",
    description: "Makes emoji text, thanks I hate it",
    callback: ({ message, args }) => {
        if (args.includes("--delete")) {
            const index = args.indexOf("--delete");
            args.splice(index, 1);
            message.delete();
        }

        let emojiText = "";
        let text = args.join(" ").toLowerCase();
        for (const char of text) {
            if (char === " ") {
                emojiText += " ";
            } else if (!isNaN(char)) {
                if (char == "1") {
                    emojiText += `:one:`;
                } else if (char == "2") {
                    emojiText += `:two:`;
                } else if (char == "3") {
                    emojiText += `:three:`;
                } else if (char == "4") {
                    emojiText += `:four:`;
                } else if (char == "5") {
                    emojiText += `:five:`;
                } else if (char == "6") {
                    emojiText += `:six:`;
                } else if (char == "7") {
                    emojiText += `:seven:`;
                } else if (char == "8") {
                    emojiText += `:eight:`;
                } else if (char == "9") {
                    emojiText += `:nine:`;
                } else if (char == "0") {
                    emojiText += `:zero:`;
                }
            } else if (validSymbols.includes(char)) {
                emojiText += `:regional_indicator_${char}:`;
            } else {
                emojiText += char;
            }
        }
        const EmojiEmbed = new Discord.MessageEmbed().setDescription(emojiText);

        return message.channel.send(EmojiEmbed);
    },
};
