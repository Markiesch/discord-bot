module.exports = {
    guildOnly: true,
    description: "Send your own embeds using JSON!",
    execute(message, args) {
        let roleList = "";
        message.guild.roles.cache.forEach((role) => {
            roleList += `<@&${role.id}>\n`;
            console.log(role);
        });

        message.channel.send(roleList);
    },
};
