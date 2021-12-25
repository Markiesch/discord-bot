import { Message } from "discord.js";

export default abstract class command {
  abstract description: string;
  abstract execute(message: Message, ...args: string[]): void;
}
