
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("gerial")
    .setDescription("🎵 | Müziğk listenizde istediğiniz sayı kadar geri götürür!")
    .addStringOption(option => option.setName("sayı").setDescription("Ne kadar geriye gitmek istiyorsun? (Sayı)").setRequired(true)),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
      const queue = client.distube.getQueue(interaction);
         if (!queue) return interaction.followUp(`Listede henüz şarkı yok.`)
         const number = interaction.options.getString("saı")
         if(isNaN(number)) return interaction.followUp("Sayı Gir!")
         const type = parseInt(number)
         queue.seek((queue.currentTime - type))
         return interaction.followUp("Şarkı başarıyla geri alındı.")


try {
 } catch (e) {
   return;
 }
 }
}
