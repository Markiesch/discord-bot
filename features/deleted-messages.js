const Discord = require("discord.js");

const ignoredChannels = ["800722874045300763"];

module.exports = (client, instance, guild) => {
    client.on("messageDelete", async (messageDelete) => {
        if (ignoredChannels.includes(messageDelete.channel.id)) {
            return console.log("Ignored channel");
        }

        const channelID = "800722874045300765";
        const channel = messageDelete.guild.channels.cache.get(channelID);
        const DeleteEmbed = new Discord.MessageEmbed()
            .setColor("#fc3c3c")
            .addField(`**${messageDelete.guild.name}** `, `**🗑️ Bericht verzonden door ${messageDelete.author} verwijderd in ${messageDelete.channel}** \n${messageDelete.content}`, true)
            .setFooter(`Bericht ID: ${messageDelete.id} • Author ID: ${messageDelete.author.id}`);
        channel.send(DeleteEmbed);

        console.log(messageDelete.author.id);
    });
};
