module.exports = {
    description: "Sets the number seconds you need to wait before users can send a message again",
    args: true,
    guildOnly: true,
    permissions: "MANAGE_CHANNELS",
    execute(message, args) {
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
