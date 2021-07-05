const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    guildOnly: true,
    description: "Displays a random picture of a cat",
    permissions: ["ADMINISTRATOR", "MANAGE_EMOJIS"],
    async execute(message) {
        axios
            .get("https://api.thecatapi.com/v1/images/search")
            .then((res) => {
                const image = res.data[0].url;
                const catEmbed = new MessageEmbed().setColor("#ffac1c").setTitle(`😸 Meowww..`).setURL(image).setImage(image);
                message.channel.send(catEmbed);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
