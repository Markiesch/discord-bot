module.exports = {
    category: "Utility",
    description: "Removes all messages from an Channel",
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message, args }) => {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results);
        });
    },
};
