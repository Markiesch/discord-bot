import axios from "axios";
import { MessageEmbed } from "discord.js";
import { ICommand } from "../../types/types";

const command: ICommand = {
  description: "Gives you a random dog picture",

  async execute({ message }) {
    try {
      const res = await axios.get("https://dog.ceo/api/breeds/image/random");
      const image = res.data.message;
      const birdEmbed = new MessageEmbed().setColor("RANDOM").setTitle("🐶 Woef...").setURL(image).setImage(image);

      message.reply({ embeds: [birdEmbed] });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  },
};

export default command;
