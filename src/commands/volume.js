
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ses")
    .setDescription("🎵 | Botun sesini ayarlar!")
    .addStringOption(option => option.setName("say").setDescription("1-100").setRequired(true)),
    run: async (client, interaction, track) => {
      await interaction.deferReply()
      const string = interaction.options.getString("say")
      const volume = parseInt(string)
      const language = db.fetch(`language_${interaction.user.id}`)
if (!language) {
  const queue = client.distube.getQueue(interaction);
     if (!queue) return interaction.followUp(`Listede henüz şarkı yok.`)
     if (isNaN(volume)) return interaction.followUp("Sayı girin!")
     if (volume < 1) return interaction.followUp("Sayı 1'den küçük olmamalıdır.")
     if (volume > 100) return interaction.followUp("Sayı 100'den büyük olmamalıdır.")
     client.distube.setVolume(interaction, volume);
     interaction.followUp("Müziğin sesi başarıyla ayarlandı: **"+volume+"**")
       }
      
 }
}
