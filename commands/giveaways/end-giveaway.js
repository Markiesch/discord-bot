module.exports = {
    name: "gend",
    category: "Giveaway",
    callback: ({ message }) => {
        message.delete().then(() => {
            const { channel } = message;

            channel.messages.fetch({ limit: 1 }).then(async (messages) => {
                message = messages.first();
                if (!message) {
                    channel.send("There are no messages!");
                    return;
                }

                const { users } = await message.reactions.cache.first().fetch();
                const reactionUsers = await users.fetch();

                // Filters out the bots so they can't win the giveaway
                const possibleWinners = reactionUsers.array().filter((user) => {
                    return !user.bot;
                });

                const winner = possibleWinners[Math.floor(Math.random() * possibleWinners.length)];

                console.log(winner);
                message.channel.send(`${winner.username} Won the giveaway!`);
            });
        });
    },
};
