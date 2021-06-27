// const discord = require("discord.js");

// module.exports = {
//     guildOnly: true,
//     description: "Send your own embeds using JSON!",
//     execute(message, args, text) {
//         let items = text.split(",");

//         for (let i = 0; i < items.length; i++) {
//             items[i] = items[i].trim();
//         }

//         const question = items[0].shift();

//         const poll = new discord.MessageEmbed().setTitle(question).setDescription(items.map(item => `${}`));
//         console.log(items);
//     },
// };
