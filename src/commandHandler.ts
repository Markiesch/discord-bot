import { Client } from "discord.js";
import getFiles from "./getFiles";

const suffix = ".ts";

interface command {
  [key: string]: any;
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

    if (!commands[commandName]) return;

    try {
      const command = new commands[commandName]();
      command.callback(message, ...args);
    } catch (error) {
      console.log(error);
    }
  });
}
