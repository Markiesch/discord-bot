module.exports = {
    guildOnly: true,
    description: "Send your own embeds using JSON!",
    execute(message, args) {
        if (!args[0]) return message.channel.send(`I can't do math with thin air?`);

        message.channel.send(eval(args.join(" ").replaceAll(",", ".")));
    },
};
