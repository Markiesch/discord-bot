const { MessageEmbed } = require("discord.js");

module.exports = {
    guildOnly: true,
    description: "Get information from the guild",
    callback: ({ message, client }) => {
        const { guild } = message;
        const { name, region, memberCount, owner, verificationLevel, id, explicitContentFilter } = guild;
        const icon = guild.iconURL();

        const textChannels = message.guild.channels.cache.filter((channel) => channel.type === "text").size;
        const voiceChannels = message.guild.channels.cache.filter((channel) => channel.type === "voice").size;

        const members = guild.members.cache.filter((member) => !member.user.bot).size;
        const bots = memberCount - members;

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
                    value: `${
                        explicitContentFilter.toUpperCase() == "MEMBERS_WITHOUT_ROLES" ? "<:succes:818800870274891827>" : "<:failed:818800981001240617>"
                    } Scanning Images\nVerification Level: ${verificationLevel.toLowerCase()}`,
                    inline: true,
                },

                {
                    name: "Members",
                    value: `Total: ${memberCount}\nHumans: ${members}\nBots: ${bots}`,
                    inline: true,
                }
            )
            .setFooter(`ID: ${id}`)
            .setTimestamp();

        return message.channel.send(embed);
    },
};
