module.exports = {
    category: "Moderation",
    description: "Makes sure users cant send messages to the mentioned channel",
    expectedArgs: "[channel]",
    guildOnly: true,
    requiredPermissions: ["MANAGE_CHANNELS"],
    callback: ({ message }) => {
        const targetChannel = message.mentions.channels.first() || message.channel;

        targetChannel.setName("lol");
    },
};
