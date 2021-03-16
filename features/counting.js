// module.exports = (client) => {
//     client.on("message", (message) => {
//         if (message.author.bot) return;
//         if (message.channel.id != "818487183530393681") return;

//         message.channel.messages.fetch({ limit: 2 }).then((res) => {
//             let lm = res.last();
//             // console.log(lm);

//             const prevNumber = parseInt(lm.content);
//             const userNumber = parseInt(message.content);

//             if (userNumber - prevNumber == 1) {
//                 message.react("✅");
//             } else {
//                 message.delete();
//             }
//         });
//     });
// };
