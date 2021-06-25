const { MessageEmbed } = require("discord.js");

module.exports = {
    args: true,
    guildOnly: true,
    description: "Change nicknames",
    execute(message, args) {
        let target = message.mentions.members.first() || message.guild.members.cache.find((m) => m.name == args[0]) || message.guild.members.cache.get(args[0]);

        if (target) {
            args.shift();
        } else {
            target = message.author;
        }

        const member = message.guild.members.cache.get(target.id);
        const errMessageOrder = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> Make sure my highest role is above ${member.roles.highest.name}`);
        const errMessageOwner = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> I can't change nicknames of the serverowner`);
        if (target.id == message.guild.ownerID) {
            return message.channel.send(errMessageOwner);
        }
        if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send(errMessageOrder);

        const nickname = args.join(" ");
        return member.setNickname(nickname);
    },
};
