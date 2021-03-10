const path = require("path");

module.exports = {
    category: "Utility",
    description: "Add emojis without opening any menu's",
    guildOnly: true,
    aliases: ["createemoji", "aemoji", "cemoji"],
    requiredPermissions: ["MANAGE_EMOJIS"],
    callback: ({ message, args, text }) => {
        const image = message.attachments.first();
        if (!image) return message.channel.send("Please attach a image to your message!");

        const validFiles = [".png", ".jpeg", ".webp", ".jpg", ".gif"];
        if (!validFiles.includes(path.parse(image.name).ext.toLocaleLowerCase())) {
            return message.channel.send("Please upload a `PNG`, `JPEG`, `WEBP`, `JPG` or `GIF` file");
        }

        let fileName = text || image.name;

        if (!text) {
            fileName = path.parse(fileName).name;
        }

        if (fileName == text) {
            fileName = args[0];
        }

        message.guild.emojis.create(image.url, fileName).then((emoji) => {
            message.channel.send(`<:${emoji.name}:${emoji.id}> Created new emoji with name **${emoji.name}**!`);
        });
    },
};
