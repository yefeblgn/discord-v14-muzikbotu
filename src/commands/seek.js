
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ilerlet")
    .setDescription("🎵 | Müzik listenizi istediğiniz sayı kadar ilerletir!")
    .addStringOption(option => option.setName("sayı").setDescription("Ne kadar ileri gitmek istiyorsun?").setRequired(true)),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
      const queue = client.distube.getQueue(interaction);
         if (!queue) return interaction.followUp(`Listede henüz şarkı yok.`)
         const number = interaction.options.getString("sayı")
         if(isNaN(number)) return interaction.followUp("Sayı girin!")
         const type = parseInt(number)
         queue.seek((queue.currentTime + type))
         return interaction.followUp("Başarıyla ilerletildi.")


try {
 } catch (e) {
   return;
 }
 }
}
