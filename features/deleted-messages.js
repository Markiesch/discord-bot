const Discord = require("discord.js");
const ignoredChannels = ["800722874045300763", "800722874045300765"];

module.exports = (client) => {
    client.on("messageDelete", async (messageDelete) => {
        if (messageDelete.guild.id != "800722873576587285") return;
        if (ignoredChannels.includes(messageDelete.channel.id)) return;

        const channelID = "800722874045300765";
        const channel = messageDelete.guild.channels.cache.get(channelID);
        const deleteEmbed = new Discord.MessageEmbed()
            .setColor("#fc3c3c")
            .setAuthor(messageDelete.author.tag, `${messageDelete.author.displayAvatarURL({ format: "png", dynamic: true })}`)
            .setDescription(`**🗑️ Bericht verzonden door ${messageDelete.author} verwijderd in ${messageDelete.channel}** \n${messageDelete.content}`)
            .setFooter(`Bericht ID: ${messageDelete.id} `)
            .setTimestamp();
        channel.send(deleteEmbed);
    });
};
