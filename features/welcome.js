const channels = {
    // Testing server
    "801905744680452097": {
        id: "858758788965990421",
        msg: "Welcome {user.name} to {guild}, your are the #{guild.members} member",
    },
};

module.exports = (client) => {
    client.on("guildMemberAdd", (member) => {
        if (!channels[member.guild.id]) return;

        const guild = member.guild.name;
        const guildId = member.guild.id;
        const guildOwner = `<@${member.guild.ownerID}>`;
        const guildOwnerId = member.guild.ownerID;
        const guildRegion = member.guild.region;
        const members = member.guild.memberCount;

        const userId = member.user.id;
        const userName = member.user.username;
        const discriminator = member.user.discriminator;
        const userIdName = `${userName}#${discriminator}`;

        const channel = member.guild.channels.cache.find((c) => c.id === channels[guildId].id);

        let message = channels[guildId].msg;

        message = message.replaceAll("{guild}", guild);
        message = message.replaceAll("{guild.name}", guild);
        message = message.replaceAll("{guild.id}", guildId);
        message = message.replaceAll("{guild.owner}", guildOwner);
        message = message.replaceAll("{guild.owner_id}", guildOwnerId);
        message = message.replaceAll("{guild.region}", guildRegion);
        message = message.replaceAll("{guild.members}", members);
        message = message.replaceAll("{user}", member);
        message = message.replaceAll("{user.mention}", member);
        message = message.replaceAll("{user.id}", userId);
        message = message.replaceAll("{user.name}", userName);
        message = message.replaceAll("{user.discriminator}", discriminator);
        message = message.replaceAll("{user.idname}", userIdName);
        channel.send(message);
    });
};
