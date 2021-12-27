import axios from "axios";
import { MessageEmbed } from "discord.js";
import { ICommand } from "../../types/types";

const command: ICommand = {
  description: "Gives you a random panda picture",

  async execute({ message }) {
    try {
      const res = await axios.get("https://some-random-api.ml/img/panda");
      const image = res.data.link;
      const birdEmbed = new MessageEmbed().setColor("RANDOM").setTitle("🐼").setURL(image).setImage(image);

      message.reply({ embeds: [birdEmbed] });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  },
};

export default command;
