
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("oynat")
    .setDescription("🎵| Müziği oynatır!")
    .addStringOption(option => option.setName("şarkı").setDescription("Şarkı adı?").setRequired(true)),
    run: async (client, interaction, track) => {
      await interaction.deferReply().catch(err => {})
      const string = interaction.options.getString("şarkı")
      let voiceChannel = interaction.member.voice.channel
      const language = db.fetch(`language_${interaction.user.id}`)
      if (!language) {
if (!voiceChannel) return interaction.followUp({content: "Bir sesli kanalda değilsiniz!"})
const queue = client.distube.getQueue(interaction);

client.distube.voices.join(voiceChannel)

await client.distube.play(interaction.member.voice.channel, string);
const tracks = await client.player.search(string, {
    requestedBy: interaction.user
}).then(x => x.tracks[0]);
if (!tracks) return interaction.followUp("🎵 | Müzik başladı.")
const embed = new Discord.EmbedBuilder()
.addFields({name: "Başlık", value: `${tracks.title}`, inline: true})
.addFields({name: "Sanatçı", value: `${tracks.author}`, inline: true})
.addFields({name: "Süre", value: `${tracks.duration}`, inline: true})
.addFields({name: "İzlenme Sayısı", value: `${tracks.views}`, inline: true})
.addFields({name: "Kapak Fotoğrafı", value: "[Tıkla]("+tracks.thumbnail+")"})
.addFields({name: "Video", value: "[Tıkla]("+tracks.url+")", inline: true})
.setColor("Aqua")
.setImage(`${tracks.thumbnail || "https://cdn.discordapp.com/attachments/986021704788758569/1053863548775845999/groovin-music.gif"}`)
const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setEmoji("🎵")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("dur"),
new Discord.ButtonBuilder()
.setEmoji("🔊")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("ses"),
new Discord.ButtonBuilder()
.setEmoji("⏩")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("geç"),
  new Discord.ButtonBuilder()
.setEmoji("🌀")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("döngü"),
  new Discord.ButtonBuilder()
.setEmoji("🎶")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("temizle"),
)

await interaction.followUp({embeds: [embed], components: [row]}).then(messages => {
db.set(`music_${interaction.guild.id}`, { kanal: interaction.channel.id, mesaj: messages.id, muzik: string, user: interaction.user.id, başlık: tracks.title, yükleyen: tracks.author, süre: tracks.duration, görüntülenme: tracks.views, thumb: tracks.thumbnail, video: tracks.url})
})
}

}
}
