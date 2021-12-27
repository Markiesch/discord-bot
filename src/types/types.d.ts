import { Message } from "discord.js";

export interface ICommand {
  name?: string;
  alias?: string[] | string;
  description: string;
  execute: ({ message, args }: { message: Message; args: string[] }) => void;
}
