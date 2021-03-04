module.exports = {
    category: "Utility",
    description: "Sets the number of messages you can post each second in a specific channel",
    minArgs: 1,
    expectedArgs: "<duration> [reason]",
    syntaxError: `Incorrect Usage! Use {PREFIX}{COMMAND} {ARGUMENTS}`,
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message, args }) => {
        const channel = message.mentions.channels.first() || message.channel;

        if (!args) {
            message.reply("Please provide a duration and a reason");
            return;
        }

        let duration = args.shift().toLowerCase();
        if (duration === "off") {
            duration = 0;
        }

        if (isNaN(duration)) {
            return message.reply('Please provide either a number of seconds or the word "off"');
        }

        channel.setRateLimitPerUser(duration, args.join(" "));
        channel.send(`The slowmode for this channel has been set to ${duration}`);
    },
};
