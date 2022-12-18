const { ActivityType } = require("discord.js")
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
  client.user.setPresence({
  activities: [{ name: `Spotify`, type: ActivityType.Listening }],
  status: 'idle',
});
}};