const { MessageEmbed } = require("discord.js");

module.exports = {
    category: "Fun",
    cooldown: "3s",
    description: "Gives you a member's avatar in different formats",
    callback: ({ message }) => {
        const gameMessage = new MessageEmbed().setColor("RANDOM").setFooter(`Made By: Markiesch`).setDescription("Test1");

        message.channel.send(gameMessage).then((msg) => {
            msg.edit(gameMessage.setDescription("Test"));
        });
    },
};
