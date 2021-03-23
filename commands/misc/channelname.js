const { MessageEmbed } = require("discord.js");

module.exports = {
    category: "misc",
    cooldown: "3s",
    description: "Change the channel name",
    requiredPermissions: ["MANAGE_CHANNELS"],
    callback: ({ message, args }) => {
        const noArgs = new MessageEmbed()
            .setColor("#f14948")
            .setDescription("<:failed:818800981001240617> Please provide a name.\n\nUse `-keepemoji` somewhere in your message to keep the current emoji's!");

        if (args.length == 0) {
            message.channel.send(noArgs);
            return;
        }

        const targetChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

        if (targetChannel == message.mentions.channels.first()) {
            const index = args.indexOf(message.mentions.channels.first());
            args.splice(index - 1, 1);
        }

        if (targetChannel == message.guild.channels.cache.get(args[0])) {
            args.shift();
        }
        const { name } = targetChannel;
        let newName = "";

        if (args.includes("-keepemoji")) {
            for (const char of name) {
                if (!/[0-9a-zA-Z]/.test(char)) newName += char;
            }
            const index = args.indexOf("-keepemoji");
            args.splice(index, 1);
        }

        newName += args.join(" ");

        const changedNameEmbed = new MessageEmbed().setColor("#43b581").setDescription(`<:succes:818800870274891827> Changed **${name}** to **${newName}**`);

        targetChannel.setName(newName);
        message.channel.send(changedNameEmbed);
    },
};
