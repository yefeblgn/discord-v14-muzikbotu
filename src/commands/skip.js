
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("geç")
    .setDescription("🎵 | Çalan müziği geçer!"),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
      const queue = client.distube.getQueue(interaction);
      const language = db.fetch(`language_${interaction.user.id}`)
if (!language) {
  if (!queue) return interaction.followUp(`Listede henüz şarkı yok.`)
     if (queue.songs.length === 1) return interaction.followUp("Kuyrukta şarkı bulunamadı!")
  client.distube.skip(interaction)
return interaction.followUp("Şarkı başarıyla geçildi.")
}

 }
}
