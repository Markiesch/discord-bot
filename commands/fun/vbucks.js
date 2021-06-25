const responses = ["virus activated!", "Still trying this?", "https://media.discordapp.net/attachments/751868547491430424/781193784154259466/image0-5.gif"];

module.exports = {
    execute(message, args) {
        message.channel.send("Press ✅ for free V-Bucks!").then((msg) => {
            msg.react("✅");
            const filter = (reaction, user) => reaction.emoji.name === "✅" && user.id != msg.author.id;

            const collector = msg.createReactionCollector(filter, { max: 1, time: 15000 });

            collector.on("collect", () => {
                message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
            });
        });
    },
};
