const { MessageEmbed } = require("discord.js");
const path = require("path");
const maxSize = 256000; // Max file size in bites

module.exports = {
    description: "Add emojis without opening any menu's",
    guildOnly: true,
    permissions: "MANAGE_EMOJIS",
    execute(message, args) {
        const text = args.join(" ");
        const image = message.attachments.first();

        if (!image) return message.channel.send("Please attach a image to your message!");

        const errMessageSize = new MessageEmbed().setDescription(
            `<:failed:818800981001240617> The uploaded file is to big for a emoji \n\nMax Size: ${maxSize}\n[Tinyfy your image](https://tinypng.com/)`
        );
        if (image.size >= maxSize) {
            return message.channel.send(errMessageSize);
        }

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
