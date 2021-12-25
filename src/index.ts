import Discord, { Intents } from "discord.js";
import dotenv from "dotenv";
import createFiles from "./commandHandler";

dotenv.config();

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Ready!");

  createFiles(client);
});

client.login(process.env.TOKEN);
