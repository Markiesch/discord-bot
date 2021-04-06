const Discord = require("discord.js");

module.exports = {
    category: "Fun",
    cooldown: "3s",
    description: "Gives you a member's avatar in different formats",
    callback: ({ message, args }) => {
        if (args.length == 0) return message.channel.send("Please provide text which i can clap.");

        if (args.length == 1) return message.channel.send("1 arg");

        message.channel.send(args.join(" :clap: "));
    },
};
