module.exports = {
    category: "Utility",
    description: "Moves the mentioned user to the servers AFK Voice Channel",
    minArgs: 1,
    expectedArgs: "<duration> [reason]",
    syntaxError: `Incorrect Usage! Use {PREFIX}{COMMAND} {ARGUMENTS}`,
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message, args }) => {
        const { channel } = message;

        if (!args) {
            message.reply("Please provide a duration and a reason");
            return;
        }

        let duration = args.shift().toLowerCase();
        if (duration === "off") {
            duration = 0;
        }

        if (isNaN(duration)) {
            message.reply('Please provide either a number of seconds or the word "off"');
            return;
        }

        //['testing','hello','world']
        //.join(' ')
        //testing hello world

        channel.setRateLimitPerUser(duration, args.join(" "));
        message.reply(`The slowmode for this channel has been set to ${duration}`);
    },
};
