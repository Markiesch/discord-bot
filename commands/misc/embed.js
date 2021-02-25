module.exports = {
    category: "Utility",
    description: "Removes all messages from an Channel",
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message, args }) => {
        if (!args) {
            message.channel.send
        }
    },
};
