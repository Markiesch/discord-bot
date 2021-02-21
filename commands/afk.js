module.exports = {
    category: "Utility",
    callback: ({ message }) => {
        message.delete();
        let tagged = false;
        let target = message.mentions.users.first() || message.member;

        // Checks if user tagged another user
        if (message.mentions.users.first()) {
            tagged = true;
        }

        // Converts tagged user into author if he does not have the permssion to move members
        if (tagged && !message.member.hasPermission("MOVE_MEMBERS")) {
            console.log("no permission");
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
