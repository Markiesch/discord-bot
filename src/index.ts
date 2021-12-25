import Discord, { Intents } from "discord.js";
import dotenv from "dotenv";
import createCommands from "./commandHandler";

dotenv.config();

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Successfully logged in as " + client.user?.tag);
  createCommands(client);
});

client.login(process.env.TOKEN);
