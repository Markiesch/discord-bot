module.exports = {
    name: "gstart",
    category: "Giveaway",
    guildOnly: true,
    description: "Command to start a giveaway",
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message, args }) => {
        message.delete().then(() => {
            const { guild, channel } = message;

            const firstArg = args[0];

            channel.messages.fetch({ limit: 1 }).then((messages) => {
                message = messages.first();
                if (!message) {
                    channel.send("There are no messages!");
                }

                if (firstArg.includes(":")) {
                    const split = firstArg.split(":");
                    const emojiName = split[1];
                    args = guild.emojis.cache.find((emoji) => {
                        return emoji.name === emojiName;
                    });
                }

                message.react(firstArg);
            });
        });
    },
};
