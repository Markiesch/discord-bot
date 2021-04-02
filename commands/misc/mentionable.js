const { MessageEmbed } = require("discord.js");

module.exports = {
    category: "Utility",
    description: "Sets the number of messages you can post each second in a specific channel",
    minArgs: 1,
    expectedArgs: "<role>",
    syntaxError: `Incorrect Usage! Use {PREFIX}{COMMAND} {ARGUMENTS}`,
    aliases: ["toggle-mentionable"],
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message }) => {
        const role = message.mentions.roles.first();
        const errMessage = "<:failed:818800981001240617> I couldn't make changes to that role.";

        if (!role) {
            return message.channel.send("Please specify a role to be changed!");
        }

        if (role.position >= message.guild.me.roles.highest.position) return message.channel.send(errMessage);

        try {
            if (role.mentionable) {
                role.setMentionable(false);
                return message.channel.send(new MessageEmbed().setColor("#43b581").setDescription(`<:succes:818800870274891827> Made the **${role.name}** role unmentionable`));
            } else {
                role.setMentionable(true);
                return message.channel.send(new MessageEmbed().setColor("#43b581").setDescription(`<:succes:818800870274891827> Made the **${role.name}** role mentionable`));
            }
        } catch (err) {
            console.log(err);
            message.channel.send(errMessage);
        }
    },
};
