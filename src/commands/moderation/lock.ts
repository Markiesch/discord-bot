import { GuildChannel, Message, MessageEmbed } from "discord.js";
import { ICommand } from "../../types/types";

export default <ICommand>{
  description: "Locks the mentioned channel",

  execute(message: Message): void {
    const targetChannel = (message.mentions.channels.first() || message.channel) as GuildChannel;
    const failMessage = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> Failed to lock **<#${targetChannel.id}>**`);
    const lockedMessage = new MessageEmbed().setColor("#43b581").setDescription(`:lock: **<#${targetChannel.id}>** has been locked`);

    try {
      targetChannel.permissionOverwrites.edit(message.guildId!, { SEND_MESSAGES: false });
      if (message.client.user) targetChannel.permissionOverwrites.edit(message.client.user?.id, { SEND_MESSAGES: true });

      message.channel.send({ embeds: [lockedMessage] });
      message.delete();
    } catch (error) {
      message.reply({ embeds: [failMessage] });
    }
  },
};
