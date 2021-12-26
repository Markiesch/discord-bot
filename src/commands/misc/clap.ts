import { Message } from "discord.js";
import command from "../command";

export default class clap extends command {
  description = "makes 👏 your 👏 messages 👏 look 👏 like 👏 this";

  execute(message: Message, ...args: string[]) {
    if (!args.length) return;
    message.reply(args.join(" :clap: "));
  }
}
