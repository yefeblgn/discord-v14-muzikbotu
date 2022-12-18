
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bass")
    .setDescription("🎵 | Bass arttırıcı"),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
      const queue = client.distube.getQueue(interaction);
      const language = db.fetch(`language_${interaction.user.id}`)
if (!language) {
         if (!queue) return interaction.followUp(`Listede henüz şarkı yok.`)
interaction.followUp({content: "Şarkının Bassı başarıyla yükseltildi."})
queue.filters.add("bassboost")
}


 }
}
