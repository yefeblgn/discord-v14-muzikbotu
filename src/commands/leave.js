const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ayrıl")
    .setDescription("🎵 | Botu kapatır!"),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
      const queue = client.distube.getQueue(interaction);
         if (!queue) return interaction.followUp(`Listede henüz şarkı yok.`)
         client.distube.voices.leave(interaction)
         await interaction.followUp("Sesli kanaldan çıkıyorum.").catch(err => {})
         db.delete(`music_${interaction.guild.id}`)
return;
 }
}
