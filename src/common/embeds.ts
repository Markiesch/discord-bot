import { MessageEmbed } from "discord.js";

export function successEmbed(text: string, emoji?: string) {
  return new MessageEmbed().setColor("#43b581").setDescription(`${emoji || "<:succes:818800870274891827>"} ${text}`);
}

export function errorEmbed(text: string, emoji?: string) {
  return new MessageEmbed().setColor("#f14948").setDescription(`${emoji || "<:failed:818800981001240617>"} ${text}`);
}
