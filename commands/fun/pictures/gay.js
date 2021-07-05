const { MessageEmbed, MessageAttachment } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
    async execute(message, args, text, client) {
        const canvas = createCanvas(1000, 1000);
        const ctx = canvas.getContext("2d");

        const avatar = await loadImage(message.author.displayAvatarURL({ format: "jpg", size: 1024 }));
        ctx.globalAlpha = 1;
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

        const background = await loadImage("https://ak.picdn.net/shutterstock/videos/1056752222/thumb/1.jpg?ip=x480");
        ctx.globalAlpha = 0.5;
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        // ctx.strokeStyle = "#fff";
        // ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // ctx.fillStyle = "#fff";
        // let size1 = 40;
        // let size2 = 30;
        // let size3 = 30;

        // const user = client.users.cache.get(message.author.id);
        // const tag = user.tag;

        // do {
        //     ctx.font = `${(size1 -= 5)}px sans-serif`;
        // } while (ctx.measureText(tag).width > canvas.width - 225);

        // do {
        //     ctx.font = `${(size1 -= 5)}px sans-serif`;
        // } while (ctx.measureText(name).width > canvas.width - 225);

        // do {
        //     ctx.font = `${(size1 -= 5)}px sans-serif`;
        // } while (ctx.measureText(name).width > canvas.width - 225);

        const attachment = new MessageAttachment(canvas.toBuffer(), "info.png");
        message.channel.send(attachment);
    },
};
