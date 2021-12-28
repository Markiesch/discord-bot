import { errorEmbed, successEmbed } from "../../common/embeds";
import { ICommand } from "../../types/types";

const command: ICommand = {
  description: "Locks the mentioned channel",
  permissions: "MANAGE_CHANNELS",

  execute({ message, args }) {
    const channel = message.mentions.channels.first() || message.channel;

    if (channel && channel.type !== "GUILD_TEXT") return message.reply("invalid channel");

    const argDuration = args.shift()?.toLowerCase();
    if (!argDuration) return sendErrorMessage();

    let duration = parseInt(argDuration);
    if (isNaN(duration)) return sendErrorMessage();

    channel.setRateLimitPerUser(duration);
    message.reply({ embeds: [successEmbed(`slowmode is now set to ${duration}s`, ":turtle:")], allowedMentions: { users: [] } });

    function sendErrorMessage() {
      message.reply({ embeds: [errorEmbed("please provide a valid duration")] });
    }
  },
};

export default command;
