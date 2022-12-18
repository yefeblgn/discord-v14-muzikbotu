const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js")
const Discord = require("discord.js")
const client = new Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent
  ]
})
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { Player } = require("discord-player")
const db = require("croxydb")
const languagefile = require("./src/language.json")
const player = new Player(client);
client.player = player;
client.distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnFinish: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})
let token = config.token

client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})
client.distube.on("finish", queue => {
  client.guilds.cache.filter(guild => {
const data = db.fetch(`music_${guild.id}`)
if (!data) return;
const mesaj = data.mesaj
const channels = data.kanal
const channel = guild.channels.cache.get(channels)
const messagef = channel.messages.fetch(mesaj).then(async messagef => {
messagef.edit({content: "🎵 | Müzik Sona Erdi.", embeds: [], components: []}).catch(err => {})
})
})
})

client.on("ready", async () => {
  client.guilds.cache.filter(guild => {
const data = db.fetch(`music_${guild.id}`)
if (!data) return;
db.delete(`music_${guild.id}`)
})
})
client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    console.log(`Bot logged in as ${client.user.tag}!`);
})
readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})

client.on("interactionCreate", interaction => {
  if (interaction.customId === "hızlandır") {
    const queue = client.distube.getQueue(interaction);
       if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
    let data = db.fetch(`music_${interaction.guild.id}`)
    if (!data) return interaction.reply({content: "Hata", ephemeral: true})
    queue.filters.add("nightcore")
interaction.reply({content: "Hızlandırılmış Mod Aktif!", ephemeral: true})
  }
  if (interaction.customId === "yavaşlat") {
    const queue = client.distube.getQueue(interaction);
       if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
    let data = db.fetch(`music_${interaction.guild.id}`)
    if (!data) return interaction.reply({content: "Hata", ephemeral: true})
    queue.filters.add("vaporwave")
interaction.reply({content: "Yavaşlatılmış Mod Aktif!", ephemeral: true})
  }
  if (interaction.customId === "bass") {
    const queue = client.distube.getQueue(interaction);
       if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
    let data = db.fetch(`music_${interaction.guild.id}`)
    if (!data) return interaction.reply({content: "Hata", ephemeral: true})
    queue.filters.add("bassboost")
interaction.reply({content: "Bass Arttırıcı Aktif!", ephemeral: true})
  }
  if (interaction.customId === "sıra") {
    const queue = client.distube.getQueue(interaction);
       if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
    let data = db.fetch(`music_${interaction.guild.id}`)
    if (!data) return interaction.reply({content: "Hata", ephemeral: true})
    const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 20);
    const embed = new Discord.EmbedBuilder()
        .setColor('Purple')
        .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
        .setImage(`${queue.songs[0].thumbnail}`)
        .addFields({ name: 'Sanatçı:', value: `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, inline: true })
        .addFields({ name: 'Üye:', value: `${queue.songs[0].user}`, inline: true })
        .addFields({ name: 'Ses Düzeyi:', value: `${queue.volume}%`, inline: true })
        .addFields({ name: 'İzlenme Sayısı:', value: `${queue.songs[0].views}`, inline: true })
        .addFields({ name: 'Beğeni Sayısı:', value: `${queue.songs[0].likes}`, inline: true })
        .addFields({ name: 'Filtreler:', value: `${queue.filters.names.join(', ') || "Normal"}`, inline: true })
        .addFields({ name: `Müzik Süresi: **[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]**`})
return interaction.reply({embeds: [embed], ephemeral: true}).catch(err => {})
    
    
    
    if (interaction.customId === "temizle") {
      const queue = client.distube.getQueue(interaction);
      let data = db.fetch(`music_${interaction.guild.id}`)
      if (!data) return interaction.reply({content: "Hata", ephemeral: true})
         if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
interaction.reply({content: "Şarkının efektleri başarıyla kaldırıldı."})
queue.filters.remove("nightcore")
queue.filters.remove("vaporwave")
queue.filters.remove("bassboost")
      return interaction.reply({embeds: [embed], ephemeral: true}).catch(err => {})
    }
    
    
    
}
if (interaction.customId === "dur") {
  const queue = client.distube.getQueue(interaction);
     if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
  let data = db.fetch(`music_${interaction.guild.id}`)
  if (!data) return interaction.reply({content: "Hata", ephemeral: true})
  let usır = data.user
  let string = data.string
  if (interaction.user.id !== usır) return interaction.reply({content: "Bu butonu sadece komutu yazan kişi kullanabilir.", ephemeral: true})
const baslik = data.başlık
const author = data.yükleyen
const sure = data.süre
const izlenme = data.görüntülenme
const thumb = data.thumb
const url = data.video
const embed = new Discord.EmbedBuilder()
.addFields({name: "Başlık", value: `${baslik}`, inline: true})
.addFields({name: "Sanatçı", value: `${author}`, inline: true})
.addFields({name: "Süre", value: `${sure}`, inline: true})
.addFields({name: "İzlenme Sayısı", value: `${izlenme}`, inline: true})
.addFields({name: "Kapak Fotoğrafı", value: "[Tıkla]("+thumb+")", inline: true})
.addFields({name: "Video", value: "[Tıkla]("+url+")", inline: true})
.setColor("Aqua")
.setImage(`${thumb}`)
const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setEmoji("🎵")
.setStyle(Discord.ButtonStyle.Danger)
.setCustomId("devam")
)
client.distube.pause(interaction)
return interaction.update({embeds: [embed], components: [row]})
}
if (interaction.customId === "geç") {
  const queue = client.distube.getQueue(interaction);
     if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
  let data = db.fetch(`music_${interaction.guild.id}`)
  if (!data) return interaction.reply({content: "Hata", ephemeral: true})
    if (queue.songs.length === 1) return interaction.reply("Kuyrukta şarkı bulunamadı!")
  let usır = data.user
  let string = data.string
  if (interaction.user.id !== usır) return interaction.reply({content: "Bu butonu sadece komutu yazan kişi kullanabilir.", ephemeral: true})
const baslik = data.başlık
const author = data.yükleyen
const sure = data.süre
const izlenme = data.görüntülenme
const thumb = data.thumb
const url = data.video
const embed = new Discord.EmbedBuilder()
.addFields({name: "Başlık", value: `${baslik}`, inline: true})
.addFields({name: "Sanatçı", value: `${author}`, inline: true})
.addFields({name: "Süre", value: `${sure}`, inline: true})
.addFields({name: "İzlenme Sayısı", value: `${izlenme}`, inline: true})
.addFields({name: "Kapak Fotoğrafı", value: "[Tıkla]("+thumb+")", inline: true})
.addFields({name: "Video", value: "[Tıkla]("+url+")", inline: true})
.setColor("Aqua")
.setImage(`${thumb}`)

client.distube.skip(interaction)
return interaction.update({embeds: [embed]})
}
if (interaction.customId === "döngü") {
  const queue = client.distube.getQueue(interaction);
     if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
  let data = db.fetch(`music_${interaction.guild.id}`)
  if (!data) return interaction.reply({content: "Hata", ephemeral: true})
  let usır = data.user
  let string = data.string
  if (interaction.user.id !== usır) return interaction.reply({content: "Bu butonu sadece komutu yazan kişi kullanabilir.", ephemeral: true})
const baslik = data.başlık
const author = data.yükleyen
const sure = data.süre
const izlenme = data.görüntülenme
const thumb = data.thumb
const url = data.video
const embed = new Discord.EmbedBuilder()
.addFields({name: "Başlık", value: `${baslik}`, inline: true})
.addFields({name: "Sanatçı", value: `${author}`, inline: true})
.addFields({name: "Süre", value: `${sure}`, inline: true})
.addFields({name: "İzlenme Sayısı", value: `${izlenme}`, inline: true})
.addFields({name: "Kapak Fotoğrafı", value: "[Tıkla]("+thumb+")", inline: true})
.addFields({name: "Video", value: "[Tıkla]("+url+")", inline: true})
.setColor("Aqua")
.setImage(`${thumb || "https://cdn.discordapp.com/attachments/986021704788758569/1053863548775845999/groovin-music.gif"}`)
client.distube.setRepeatMode(interaction, 1);
return interaction.update({embeds: [embed]})
}
if (interaction.customId === "devam") {
  const queue = client.distube.getQueue(interaction);
     if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
  let data = db.fetch(`music_${interaction.guild.id}`)
  if (!data) return interaction.reply({content: "Hata", ephemeral: true})
  let usır = data.user
  let string = data.string
  if (interaction.user.id !== usır) return interaction.reply({content: "Bu butonu sadece komutu yazan kişi kullanabilir.", ephemeral: true})
  const baslik = data.başlık
  const author = data.yükleyen
  const sure = data.süre
  const izlenme = data.görüntülenme
  const thumb = data.thumb
  const url = data.video
  const embed = new Discord.EmbedBuilder()
  .addFields({name: "Başlık", value: `${baslik}`, inline: true})
  .addFields({name: "Sanatçı", value: `${author}`, inline: true})
  .addFields({name: "Süre", value: `${sure}`, inline: true})
  .addFields({name: "İzlenme Sayısı", value: `${izlenme}`, inline: true})
  .addFields({name: "Kapak Fotoğrafı", value: "[Tıkla]("+thumb+")", inline: true})
  .addFields({name: "Video", value: "[Tıkla]("+url+")", inline: true})
  .setColor("Aqua")
  .setImage(`${thumb}`)
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

  client.distube.resume(interaction)
  interaction.update({embeds: [embed], components: [row]})
}
})

const modal = new Discord.ModalBuilder()
.setCustomId('form')
.setTitle('DJ yefeblgN!')
  const a1 = new Discord.TextInputBuilder()
  .setCustomId('setvolume')
  .setLabel('Ses Düzeyi')
  .setStyle(Discord.TextInputStyle.Paragraph)
  .setMinLength(1)
  .setPlaceholder('1 - 100')
  .setRequired(true)

    const row = new Discord.ActionRowBuilder().addComponents(a1);

    modal.addComponents(row);


client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "ses"){
    await interaction.showModal(modal);
	}
})
client.on('interactionCreate', async interaction => {
    if (interaction.type !== Discord.InteractionType.ModalSubmit) return;
    if (interaction.customId === 'form') {
  const string = interaction.fields.getTextInputValue('setvolume')
  const volume = parseInt(string)
  const queue = client.distube.getQueue(interaction);
     if (!queue) return interaction.reply(`Listede henüz şarkı yok.`)
     if (isNaN(volume)) return interaction.reply("Sayı girin!")
     if (volume < 1) return interaction.reply("Sayı 1'den küçük olmamalıdır.")
     if (volume > 100) return interaction.reply("Sayı 100'den büyük olmamalıdır.")
     client.distube.setVolume(interaction, volume);
     interaction.reply("Müziğin sesi başarıyla ayarlandı: **"+volume+"**")
}
})
client.login(token)
