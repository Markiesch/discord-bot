module.exports = {
    category: "Fun",
    cooldown: "3s",
    description: "Gives you a member's avatar in different formats",
    callback: ({ message }) => {
        message.channel.send("Press ✅ for free V-Bucks!").then((msg) => {
            msg.react("✅");
            const filter = (reaction, user) => reaction.emoji.name === "✅" && user.id != msg.author.id;

            const collector = msg.createReactionCollector(filter, { max: 1, time: 15000 });

            collector.on("collect", () => {
                message.channel.send("virus activated!");
            });
        });
    },
};
