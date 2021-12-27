import { GuildChannel, MessageEmbed } from "discord.js";
import { ICommand } from "../../types/types";

const command: ICommand = {
  description: "Unlocks the mentioned channel",
  permissions: ["MANAGE_CHANNELS"],

  execute({ message }): void {
    if (!message.guildId) return;
    const targetChannel = (message.mentions.channels.first() || message.channel) as GuildChannel;
    const failMessage = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> Failed to unlock **<#${targetChannel.id}>**`);
    const unlockedMessage = new MessageEmbed().setColor("#43b581").setDescription(`:unlock: **<#${targetChannel.id}>** has been unlocked`);

    try {
      targetChannel.permissionOverwrites.edit(message.guildId, { SEND_MESSAGES: true });
      if (message.client.user) targetChannel.permissionOverwrites.edit(message.client.user?.id, { SEND_MESSAGES: null });

      message.channel.send({ embeds: [unlockedMessage] });
      message.delete();
    } catch (error) {
      message.reply({ embeds: [failMessage] });
    }
  },
};

export default command;
