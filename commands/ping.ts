import { Message } from "discord.js";

export default class ping {
  callback(message: Message, ...args: string[]) {
    console.log(args);
    message.reply("pong");
  }
}
