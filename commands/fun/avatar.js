const Discord = require("discord.js");

module.exports = {
    category: "Fun",
    cooldown: "3s",
    description: "Test command, to test if the bot is running or not",
    callback: ({ message }) => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        const target = message.mentions.users.first() || message.author;
        const avatar = new Discord.MessageEmbed()
            .setTitle(`Avatar for ${target.username}`)
            .setColor(randomColor)
            .addField(
                `Link as`,
                `[png](${target.avatarURL({ format: "png" })}?size=1024) | [jpg](${target.avatarURL({ format: "jpg" })}?size=1024) | [webp](${target.avatarURL({ format: "webp" })}?size=1024)`
            )
            .setImage(target.displayAvatarURL({ dynamic: true }));

        return message.channel.send(avatar);
    },
};
