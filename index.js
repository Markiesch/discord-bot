const DiscordJS = require("discord.js");
const WOKCommands = require("wokcommands");
require("dotenv").config();

const client = new DiscordJS.Client({
    partials: ["MESSAGE", "REACTION"],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    new WOKCommands(client, {
        commandsDir: "commands",
        featureDir: "features",
        testServers: "801905744680452097",
    })
        .setDefaultPrefix("$")
        .setCategorySettings([
            {
                name: "Fun",
                emoji: "🎮",
            },
            {
                name: "Economy",
                emoji: "💸",
            },
            {
                // You can change the default emojis as well
                name: "Configuration",
                emoji: "🚧",
                // You can also hide a category from the help menu
                // Admins bypass this
                hidden: true,
            },
        ]);
});

client.login(process.env.TOKEN);
