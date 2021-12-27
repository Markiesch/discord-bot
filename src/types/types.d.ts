import { Message } from "discord.js";

export interface ICommand {
  name?: string;
  alias?: string[] | string;
  description: string;
  execute: (Message: Message, ...args: string[]) => void;
}
