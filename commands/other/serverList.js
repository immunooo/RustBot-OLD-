const commando = require('discord.js-commando');
var serverList = require('./serverNames.json');

class ServerListCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'serverlist',
            group: 'other',
            memberName: 'serverlist',
            description: 'DMs the user a list of all compatable servers for the r!info command'
        });

    }
    async run(message, args){
        try{
        message.reply("Sent you a DM with information.")
        var n = serverList.name
        n = n.toString();
        n = n.replace(/,/g,'');
        message.author.send("__**Servers:**__\n\n"+ n +" \n**To send a request to add a server email: ** rustbothelp@gmail.com");
        } catch(e){
            message.reply("There was something wrong, try again.")
        }
    
    }    

}

module.exports = ServerListCommand;