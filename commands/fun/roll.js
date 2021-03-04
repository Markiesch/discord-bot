module.exports = {
    category: "Fun",
    cooldown: "3s",
    expectedArgs: "!roll [maxAmount]",
    description: "Randomly picks a number between 0-100 if there is no number spicified",
    callback: ({ message, args }) => {
        let maxNumber = 100;

        if (args[0]) {
            maxNumber = parseInt(args[0]);
        }

        if (isNaN(maxNumber)) {
            maxNumber = 100;
        }

        const result = `**${message.author.username}** rolled **${Math.floor(Math.random() * (maxNumber + 1))}** (1-${maxNumber})`;

        if (args.includes("--dm")) {
            message.delete();
            message.channel.send("I sended the result in you DM boss!").then((m) => {
                m.delete({ timeout: 5000 });
            });
            return message.author.send(result);
        } else {
            return message.channel.send(result);
        }
    },
};
