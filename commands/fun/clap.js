module.exports = {
    args: true,
    description: "Gives you a member's avatar in different formats",
    execute(message, args) {
        if (args.length == 1) return message.channel.send("1 arg");

        message.channel.send(args.join(" :clap: "));
    },
};
