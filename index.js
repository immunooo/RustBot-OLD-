const commando = require('discord.js-commando');
const DBL = require("dblapi.js");
const bot = new commando.Client({commandPrefix: 'r!',  owner: '247111029912240128', unknownCommandResponse: false,  disableEveryone: true});
const dbl = new DBL('dbl ID', bot);

bot.registry.registerGroup('rust', 'Rust');
bot.registry.registerGroup('statrecord', 'StatRecord');
bot.registry.registerGroup('other', 'Other');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

dbl.on('posted', () => {
    console.log("Server count: "+bot.guilds.size)
    console.log("User count: "+bot.users.size);
  });
dbl.on('error', e => {
console.log(`Oops! ${e}`);
});

bot.on('ready', function(){
    bot.user.setGame('r!help | New --> r!craft');
    console.log("ready");
    setInterval(() => {
        dbl.postStats(bot.guilds.size);
    }, 1800000);
});
bot.on('error', console.error);


bot.login('bot key here');
