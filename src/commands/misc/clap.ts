import { Message } from "discord.js";
import { ICommand } from "../../types/types";

export default <ICommand>{
  description: "makes 👏 your 👏 messages 👏 look 👏 like 👏 this",

  execute(message: Message, ...args: string[]) {
    if (!args.length) return;
    message.reply(args.join(" :clap: "));
  },
};
