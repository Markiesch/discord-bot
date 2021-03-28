const { MessageEmbed } = require("discord.js");

module.exports = {
    category: "Moderation",
    description: "Makes sure users cant send messages to the mentioned channel",
    expectedArgs: "[channel]",
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message }) => {
        const targetChannel = message.mentions.channels.first() || message.channel;
        const failMessage = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> Failed to unlock **<#${targetChannel.id}>**`);
        const lockedMessage = new MessageEmbed().setColor("#43b581").setDescription(`:unlock: **<#${targetChannel.id}>** has been unlocked`);

        // Guild ID is the same as the everyone role ID
        const everyoneID = message.guild.id;

        try {
            targetChannel.updateOverwrite(everyoneID, {
                SEND_MESSAGES: true,
            });
            targetChannel.send(lockedMessage);
        } catch {
            targetChannel.send(failMessage);
        }
    },
};
