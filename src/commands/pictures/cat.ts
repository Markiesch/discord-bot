import axios from "axios";
import { MessageEmbed } from "discord.js";
import { ICommand } from "../../types/types";

const command: ICommand = {
  description: "Gives you a random cat picture",

  async execute({ message }) {
    try {
      const res = await axios.get("https://api.thecatapi.com/v1/images/search");
      const image = res.data[0].url;
      const birdEmbed = new MessageEmbed().setColor("RANDOM").setTitle("😸 Meowww...").setURL(image).setImage(image);

      message.reply({ embeds: [birdEmbed] });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  },
};

export default command;
