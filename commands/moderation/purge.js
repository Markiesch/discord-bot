const { MessageEmbed } = require("discord.js");

module.exports = {
    description: "Deletes a specific amount of messages in a channel",
    args: true,
    guildOnly: true,
    permissions: "MANAGE_MESSAGES",
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        const failMessage = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> Failed to clear **<#${amount}>** messages`);

        if (isNaN(amount)) return message.reply("that doesn't seem to be a valid number.");
        if (amount <= 1 || amount > 100) return message.reply("you need to input a number between 1 and 99.");

        message.channel
            .bulkDelete(amount, true)
            .catch((err) => {
                console.error(err);
                message.channel.send(failMessage);
            })
            .then((msg) => {
                const succesMessage = new MessageEmbed().setColor("#43b581").setDescription(`<:succes:818800870274891827> Deleted **${msg.size - 1}** message`);
                message.channel.send(succesMessage).then((msg) => {
                    msg.delete({ timeout: 5000 }).catch((err) => console.log(err));
                });
            });
    },
};
