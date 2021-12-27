import { Client, Message, PermissionString, TextChannel } from "discord.js";

export interface ICommand {
  name?: string;
  alias?: string[] | string;
  description: string;
  permissions?: PermissionString | PermissionString[];
  execute: ({ channel, message, args, client }: { channel: TextChannel; message: Message; args: string[]; client: Client }) => void;
}
