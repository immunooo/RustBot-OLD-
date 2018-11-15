const commando = require('discord.js-commando');


class AboutCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'about',
            group: 'rust',
            memberName: 'about',
            description: 'Shows information about the bot.'
        });

    }
    async run(message, args){
        message.reply("Sent you a DM with information.")
        message.author.send("\n__**About**__\nVersion: 1.4.2\nMade by: **Jojo#8710**\nAdd the bot here: https://discordapp.com/oauth2/authorize?client_id=478811809235861504&scope=bot&permissions=3072\nAPIs used: Steam api, BattleMetrics\n**Report Bugs or have any questions, comments or concerns: ** rustbothelp@gmail.com");
        
    }    

}

module.exports = AboutCommand;