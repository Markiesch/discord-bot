const { MessageEmbed } = require("discord.js");

module.exports = {
    category: "misc",
    cooldown: "3s",
    guildOnly: true,
    description: "Get information from the guild",
    callback: ({ message, client }) => {
        return console.log(message.guild.explicitContentFilter);

        const { guild } = message;
        const { name, region, memberCount, owner, verificationLevel, id, explicitContentFilterLevel } = guild;
        const icon = guild.iconURL();

        const textChannels = message.guild.channels.cache.filter((channel) => channel.type === "text").size;
        const voiceChannels = message.guild.channels.cache.filter((channel) => channel.type === "voice").size;

        const embed = new MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: "Owner",
                    value: owner.user.tag,
                    inline: true,
                },
                {
                    name: "Region",
                    value: region,
                    inline: true,
                },
                {
                    name: "Channels",
                    value: `<:voice_channel:821449647326494750> ${voiceChannels}\n<:text_channel:821449670759809035> ${textChannels}`,
                    inline: true,
                },
                {
                    name: "Info",
                    value: `${explicitContentFilterLevel} ${verificationLevel}`,
                },

                {
                    name: "AFK Timeout",
                }
            )
            .setFooter(`ID: ${id}`)
            .setTimestamp();

        return message.channel.send(embed);
    },
};
