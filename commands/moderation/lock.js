module.exports = {
    category: "Moderation",
    description: "Makes sure users cant send messages to the mentioned channel",
    expectedArgs: "[channel]",
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message, guild }) => {
        const targetChannel = message.mentions.channels.first() || message.channel;

        const everyoneID = message.guild.roles.everyone.id;

        targetChannel.updateOverwrite(everyoneID, {
            SEND_MESSAGES: false,
        });

        targetChannel.send(`This channel has been locked :lock:`);
    },
};
