const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    description: "Displays a random picture of a cat",
    async execute(message) {
        axios
            .get("https://dog.ceo/api/breeds/image/random")
            .then((res) => {
                const image = res.data.message;
                const catEmbed = new MessageEmbed().setColor("#94643a").setTitle(`🐶 Woef..`).setURL(image).setImage(image);
                message.channel.send(catEmbed);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
