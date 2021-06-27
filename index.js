const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const prefix = "!";

const client = new Discord.Client({
    partials: ["MESSAGE", "REACTION"],
});

// features
const files = fs.readdirSync("./features");

for (const file of files) {
    const feature = require(`./features/${file}`);
    feature(client);
}

// Commands
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// const commandFolders = fs.readdirSync("./commands");

// for (const folder of commandFolders) {
//     const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));
//     for (const file of commandFiles) {
//         const command = require(`./commands/${folder}/${file}`);
//         const name = command.name || file.split(".").slice(0, -1).join(".");
//         client.commands.set(name, command);
//     }
// }

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));

            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else {
                const command = require(path.join(__dirname, dir, file));
                const name = command.name || file.split(".").slice(0, -1).join(".");
                client.commands.set(name, command);
            }
        }
    };

    readCommands("commands");
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const text = args.join(" ");

    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === "dm") {
        return message.reply("I can't execute that command inside DMs!");
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply("You do not have permissions to perfrom this action");
        }
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, text);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
});

require("dotenv").config();
client.login(process.env.TOKEN);
