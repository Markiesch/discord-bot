import { Message, MessageEmbed } from "discord.js";
import command from "../command";
import axios from "axios";

export default class dog extends command {
  description = "Gives you a random dog picture";

  async execute(message: Message) {
    try {
      const res = await axios.get("https://dog.ceo/api/breeds/image/random");
      const image = res.data.message;
      const birdEmbed = new MessageEmbed().setColor("RANDOM").setTitle("🐶 Woef...").setURL(image).setImage(image);

      message.reply({ embeds: [birdEmbed] });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
}
