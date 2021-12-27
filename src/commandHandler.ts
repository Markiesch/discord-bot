import { Client, GuildMember, PermissionString, TextChannel } from "discord.js";
import getFiles from "./getFiles";
import { ICommand } from "./types/types";

const suffix = ".ts";

interface command {
  [key: string]: ICommand;
}

export default function createCommands(client: Client) {
  const commands: command = {};

  const commandFiles = getFiles(`${__dirname}/commands`, suffix);

  for (const command of commandFiles) {
    let commandFile = require(command);
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g, "/").split("/");
    const commandName = split[split.length - 1].replace(suffix, "");

    commands[commandName.toLowerCase()] = commandFile;
  }

  client.on("messageCreate", (message) => {
    if (message.author.bot || !message.content.startsWith("!")) return;

    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift()!.toLowerCase();

    const command = commands[commandName];
    if (!command) return;

    if (command.permissions && message.member && !hasPermissions(message.member, command.permissions)) return;

    const { channel } = message;
    if (channel.type !== "GUILD_TEXT") return;

    try {
      command.execute({ channel, message, args, client });
    } catch (error) {
      console.log(error);
    }
  });
}

function hasPermissions(user: GuildMember, permissions: PermissionString | PermissionString[]): boolean {
  if (!Array.isArray(permissions)) permissions = [permissions];

  for (const permission of permissions) {
    if (!user.permissions.has(permission)) return false;
  }

  return true;
}
