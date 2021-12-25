import { Message } from "discord.js";
import command from "./command";

const responses = [
  "As I see it, yes",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "It is certain",
  "Most likely",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Outlook good",
  "Reply hazy, try again",
  "Signs point to yes",
  "Very doubtful",
  "Without a doubt",
  "Yes",
  "Yes - definitely",
  "You may rely on it",
];

export default class clap extends command {
  description = "I hate this command and everyone who uses it";

  execute(message: Message, ...args: string[]) {
    const response = responses[Math.floor(Math.random() * responses.length)];
    return message.channel.send(`🎱 | ${response}, **${message.author.username}**`);
  }
}
