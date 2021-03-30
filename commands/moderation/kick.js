module.exports = {
    category: "misc",
    cooldown: "3s",
    description: "Test command, to test if the bot is running or not",
    callback: ({ message, args }) => {
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!target) return message.channel.send("No target specified");

        message.channel.send("Kicked nobody :D");
    },
};
