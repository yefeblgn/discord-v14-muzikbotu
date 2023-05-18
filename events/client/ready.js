const figlet = require('figlet');
const chalk = require('chalk');
// Lrows
module.exports = async (client) => {
  figlet(client.user.tag, function(err, data) {
    if (err) {
        console.log('hata var kontrol edin (ready)');
        console.dir(err);
        return;
    }
    console.log(chalk.red.bold(data));
  });

  let guilds = client.guilds.cache.size;
  let users = client.users.cache.size;
  let channels = client.channels.cache.size;

      client.user.setActivity(`Kavinsky - Nightcall`), { type: 'LISTENING' });
}


//