const { MessageEmbed, MessageCollector } = require("discord.js");

module.exports = {
    category: "Moderation",
    description: "Bans a user",
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message, args }) => {
        // const questions = ["Who needs to be banned", "What is the reason for the ban", "How long?"];
        // let counter = 0;
        // let user;
        // let reason;
        // let time;

        // const filter = (m) => m.author.id === message.author.id;

        // const collector = new MessageCollector(message.channel, filter, {
        //     max: questions.length,
        //     time: 1000 * 15,
        // });

        // message.channel.send(questions[counter++]);
        // collector.on("collect", (m) => {
        //     if (counter < questions.length) {
        //         m.channel.send(questions[counter++]);
        //     }
        // });
        // collector.on("end", (collected) => {
        //     console.log(`Collected ${collected.size} messages`);

        //     if (collected.size < questions.length) return message.channel.send(`You did not answer the questions in time!`);

        //     let counter = 0;

        //     collected.forEach((value) => {
        //         console.log(questions[counter++], value.content);
        //     });
        // });

        message.guild.members.fetch(args[0]).then((member) => {
            member.ban({ days: 0.1, reason: "your reason here" });
        });
    },
};
