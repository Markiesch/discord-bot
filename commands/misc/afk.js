module.exports = {
    category: "misc",
    guildOnly: true,
    description: "Moves the mentioned user to the servers AFK Voice Channel",
    callback: ({ message, args }) => {
        message.delete();
        let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;

        // Converts tagged user into author if he does not have the permssion to move members
        if (!message.member.hasPermission("MOVE_MEMBERS")) {
            target = message.member;
        }

        // Convert Target into UserID
        const targetID = target.id;
        const afk = message.guild.members.cache.get(targetID);

        if (afk.voice.channel) {
            if (afk.voice.channel.id == message.guild.afkChannelID) {
                message.channel.send(`${afk.user.username} is already connected to the AFK voicechannel`);
            }
            afk.voice.setChannel(message.guild.afkChannel);
        } else {
            message.channel.send(`${afk.user.username} is not connected to an voiceChannel`);
        }
    },
};
