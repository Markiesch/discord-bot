const path = require("path");
const { MessageEmbed } = require("discord.js");

module.exports = {
    guildOnly: true,
    permissions: "MANAGE_GUILD",
    execute(message) {
        const image = message.attachments.first();
        if (!image) return message.channel.send("Please attach a image to your message!");

        const validFiles = [".png", ".jpeg", ".webp", ".jpg", ".gif"];
        if (!validFiles.includes(path.parse(image.name).ext.toLocaleLowerCase())) {
            return message.channel.send("Please upload a `PNG`, `JPEG`, `WEBP`, `JPG` or `GIF` file");
        }

        message.guild.setIcon(image.url);
        message.channel.send(new MessageEmbed().setColor("#43b581").setDescription(`<:succes:818800870274891827> Succesfully changed the icon of ${message.guild.name}`));
    },
};
