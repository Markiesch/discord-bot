module.exports = {
    category: "misc",
    description: "Removes all messages from an Channel",
    guildOnly: true,
    minArgs: 2,
    expextedArgs: "<Channel mention> <JSON>",
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message, args }) => {
        const targetChannel = message.mentions.channels.first() || message.channel;

        if (message.mentions.channels.first()) {
            // Removes mentioned channel from args array
            args.shift();
        }

        try {
            const json = JSON.parse(args.join(" "));
            const { text = "" } = json;

            // Sends the embed
            targetChannel.send(text, {
                embed: json,
            });
        } catch (e) {
            message.reply("Invalid JSON `" + e.message + "`");
        }
    },
};
