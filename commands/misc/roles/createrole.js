const { MessageEmbed } = require("discord.js");

module.exports = {
    guildOnly: true,
    description: "Create a role",
    permissions: "ADMINISTRATOR",
    execute(message, args) {
        const notFound = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> I couldn't find the role **${args[0]}**`);

        if (!role) return message.channel.send(notFound);

        const errMessageOrder = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> Make sure my highest role is above ${role.name}`);
        const cancelled = new MessageEmbed().setColor("#43b581").setDescription(`<:succes:818800870274891827> Cancelled deletion of ${role.name}`);
        const succesMessage = new MessageEmbed().setColor("#43b581").setDescription(`<:succes:818800870274891827> Deleted role **${role.name}**`);
        const errMessage = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> An error accured while trying to delete ${role.name}`);
        if (role.position >= message.guild.me.roles.highest.position) return message.channel.send(errMessageOrder);

        const botMessage = await message.channel.send(`Are you sure you want to delete **${role.name}**?`);

        botMessage.react("✅");

        const filter = (reaction, user) => {
            return reaction.emoji.name === "✅" && user.id === message.author.id;
        };

        botMessage
            .awaitReactions(filter, { max: 1, time: 10000, errors: ["time"] })
            .then(() => {
                try {
                    role.delete();
                    message.channel.send(succesMessage);
                } catch (err) {
                    message.channel.send(errMessage);
                }
            })
            .catch(() => {
                message.channel.send(cancelled);
            });
    },
};
