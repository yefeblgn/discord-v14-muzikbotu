const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("efektkaldır")
    .setDescription("🎵 | Efektleri Temizler!"),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
      const queue = client.distube.getQueue(interaction);
      const language = db.fetch(`language_${interaction.user.id}`)
if (!language) {
         if (!queue) return interaction.followUp({content: `Listede henüz şarkı yok.`, ephemeral: true})
interaction.followUp({content: "Şarkının efektleri başarıyla kaldırıldı.", ephemeral: true})
queue.filters.remove("nightcore")
queue.filters.remove("vaporwave")
queue.filters.remove("bassboost")
queue.filters.remove("echo")
queue.filters.remove("3d")
}

 }
}
