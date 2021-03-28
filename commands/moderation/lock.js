const { MessageEmbed } = require("discord.js");

module.exports = {
    category: "Moderation",
    description: "Makes sure users cant send messages to the mentioned channel",
    expectedArgs: "[channel]",
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message }) => {
        const targetChannel = message.mentions.channels.first() || message.channel;
        const failMessage = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> Failed to lock **<#${targetChannel.id}>**`);
        const lockedMessage = new MessageEmbed().setColor("#43b581").setDescription(`:lock: **<#${targetChannel.id}>** has been locked`);

        // Guild ID is the same as the everyone role ID
        const everyoneID = message.guild.id;

        try {
            targetChannel.updateOverwrite(everyoneID, {
                SEND_MESSAGES: false,
            });
            targetChannel.send(lockedMessage);
        } catch {
            targetChannel.send(failMessage);
        }
    },
};
