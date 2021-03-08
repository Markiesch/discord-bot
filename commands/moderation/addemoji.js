module.exports = {
    category: "Utility",
    description: "Add emojis without opening any menu's",
    guildOnly: true,
    aliases: ["createemoji", "aemoji", "cemoji"],
    requiredPermissions: ["MANAGE_EMOJIS"],
    callback: ({ message, args, text }) => {
        const image = message.attachments.first();

        if (!image) return message.channel.send("Please attach a image to your message!");
        if (!text) {
            message.channel.send("Please provide a name of your new emoji!");
            return;
        }

        message.guild.emojis.create(image.url, args[0]).then((emoji) => {
            message.channel.send(`<:${emoji.name}:${emoji.id}> Created new emoji with name **${emoji.name}**!`);
        });
    },
};
