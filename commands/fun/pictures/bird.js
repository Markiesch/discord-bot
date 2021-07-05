const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    description: "Displays a random picture of a cat",
    async execute(message) {
        axios
            .get("https://some-random-api.ml/img/birb")
            .then((res) => {
                const image = res.data.link;
                const catEmbed = new MessageEmbed().setColor("randomColor").setTitle(`🦅 Fly..`).setURL(image).setImage(image);
                message.channel.send(catEmbed);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
