const Discord = require("discord.js");

module.exports = {
    description: "Gives you a member's avatar in different formats",
    execute(message) {
        const target = message.mentions.users.first() || message.author;
        const avatar = new Discord.MessageEmbed()
            .setTitle(`Avatar for ${target.username}`)
            .setColor("RANDOM")
            .addField(
                `Link as`,
                `[png](${target.avatarURL({ format: "png" })}?size=1024) | [jpg](${target.avatarURL({ format: "jpg" })}?size=1024) | [webp](${target.avatarURL({ format: "webp" })}?size=1024)`
            )
            .setImage(target.displayAvatarURL({ dynamic: true }));

        return message.channel.send(avatar);
    },
};
