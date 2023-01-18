const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const { ActivityType } = require('discord.js');
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("spotify")
    .setDescription("🎵 | Spotify'da dinlediğiniz müziği açar!"),
    run: async (client, interaction, track, message) => {
      await interaction.deferReply().catch(err => {})
      let voiceChannel = interaction.member.voice.channel
      const language = db.fetch(`language_${interaction.user.id}`)
      if (!language) {
if (!voiceChannel) return interaction.followUp({content: "Bir sesli kanalda değilsiniz!"})

const user = interaction.member; 
let spotify = user.presence.activities.find(x => x.name.toLowerCase() == 'spotify' && x.type == ActivityType.Listening)
if(!spotify) return interaction.followUp("Spotify Açık Değil!");
let url = `${spotify.state} - ${spotify.details}`

const queue = client.distube.getQueue(interaction);

client.distube.voices.join(voiceChannel)

await client.distube.play(interaction.member.voice.channel, url);
const tracks = await client.player.search(url, {
    requestedBy: interaction.user
}).then(x => x.tracks[0]);
if (!tracks) return interaction.followUp("🎵 | Müzik Spotify Üzerinden Açıldı.")
const embed = new Discord.EmbedBuilder()
.setDescription("🎵 | Müzik Spotify Üzerinden Açıldı. (Test komutudur, hatalar olabilir.)")
.addFields({name: "Başlık", value: `${tracks.title}`, inline: true})
.addFields({name: "Sanatçı", value: `${tracks.author}`, inline: true})
.addFields({name: "Süre", value: `${tracks.duration}`, inline: true})
.addFields({name: "İzlenme Sayısı", value: `${tracks.views}`, inline: true})
.addFields({name: "Kapak Fotoğrafı", value: "[Tıkla]("+tracks.thumbnail+")"})
.addFields({name: "Video", value: "[Tıkla]("+tracks.url+")", inline: true})
.setColor("Green")
.setImage(`${tracks.thumbnail}`)
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
db.set(`music_${interaction.guild.id}`, { kanal: interaction.channel.id, mesaj: messages.id, muzik: url, user: interaction.user.id, başlık: tracks.title, yükleyen: tracks.author, süre: tracks.duration, görüntülenme: tracks.views, thumb: tracks.thumbnail, video: tracks.url})
})
}

}
}
