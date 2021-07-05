const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const prefix = "!";

const client = new Discord.Client({
    partials: ["MESSAGE", "REACTION"],
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Commands
    client.commands = new Discord.Collection();
    client.cooldowns = new Discord.Collection();
    let commandCount = 0;
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
                commandCount++;
            }
        }
    };
    readCommands("commands");
    if (commandCount) {
        console.log(`MiniMarkiesch > Loaded ${commandCount} command${commandCount == 1 ? "" : "s"}`);
    }

    // features
    const files = fs.readdirSync("./features");

    for (const file of files) {
        let fileCount = 0;
        const feature = require(`./features/${file}`);
        try {
            feature(client);
            fileCount++;
        } catch (err) {
            console.warn(`Failed to load feature ${file} - ${err.message}`);
        }
        if (fileCount) {
            console.log(`MiniMarkiesch > Loaded ${fileCount} feature${fileCount == 1 ? "" : "s"}`);
        }
    }
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const text = args.join(" ");
    const member = message.member;

    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    let { expectedArgs = "", permissionError = "You do not have permission to run this command", minArgs = 0, maxArgs = null, permissions = [], requiredRoles = [], guildOnly = false } = command;

    // Check if command has been ran in DM's
    if (guildOnly && message.channel.type === "dm") {
        return message.reply("I can't execute that command inside DMs!");
    }

    // Ensure the user has the correct number of arguments
    if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
        message.reply(`Incorrect syntax! Use ${prefix}${command} ${expectedArgs}`);
    }

    const validatePermissions = (permissions) => {
        const validPermissions = [
            "CREATE_INSTANT_INVITE",
            "KICK_MEMBERS",
            "BAN_MEMBERS",
            "ADMINISTRATOR",
            "MANAGE_CHANNELS",
            "MANAGE_GUILD",
            "ADD_REACTIONS",
            "VIEW_AUDIT_LOG",
            "PRIORITY_SPEAKER",
            "STREAM",
            "VIEW_CHANNEL",
            "SEND_MESSAGES",
            "SEND_TTS_MESSAGES",
            "MANAGE_MESSAGES",
            "EMBED_LINKS",
            "ATTACH_FILES",
            "READ_MESSAGE_HISTORY",
            "MENTION_EVERYONE",
            "USE_EXTERNAL_EMOJIS",
            "VIEW_GUILD_INSIGHTS",
            "CONNECT",
            "SPEAK",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MOVE_MEMBERS",
            "USE_VAD",
            "CHANGE_NICKNAME",
            "MANAGE_NICKNAMES",
            "MANAGE_ROLES",
            "MANAGE_WEBHOOKS",
            "MANAGE_EMOJIS",
        ];

        for (const permission of permissions) {
            if (!validPermissions.includes(permission)) {
                console.warn(`Unkown permission node \`${permission}\``);
            }
        }
    };

    if (permissions.length) {
        if (typeof permissions === "string") {
            permissions = [permissions];
        }

        validatePermissions(permissions);
    }

    // Check if user has required permissions
    for (const permission of permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(permission)) {
            return message.reply(permissionError);
        }
    }

    for (const requiredRole of requiredRoles) {
        const role = guild.roles.cache.find((role) => role.name === requiredRole);

        if (!role || !member.roles.cache.has(role.id)) {
            return message.reply(`You must have the "${requiredRole}" role to use this command`);
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
        command.execute(message, args, text, client);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
});

require("dotenv").config();
client.login(process.env.TOKEN);
