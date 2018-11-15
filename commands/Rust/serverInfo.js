const commando = require('discord.js-commando');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var serverList = require('./serverList.json');

class ServerInfoCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'info',
            group: 'rust',
            memberName: 'info',
            description: 'Displays the info of a given server. Example syntax: r!info rust rehab'
        });

    }
    async run(message, args){
        console.log("Server: "+args);
        try{
        var xmlHttp = new XMLHttpRequest();
        args = args.toLowerCase();
        xmlHttp.open("GET", 'https://api.battlemetrics.com/servers/' + serverList[args], false);
        xmlHttp.send(null);
        var n = xmlHttp.responseText;
        n = JSON.parse(n);
        n = n.data["attributes"];
        message.reply("\n __**" + n.name + ":**__\n**Players:** "+ n.players +"/" + n.maxPlayers + "\n**Queue:** "+ n.details["rust_queued_players"] + "\n**Website:** <" + n.details["rust_url"]+">");//n.details[thing]
        } catch(e){
            message.reply("That is an invalid server. Type r!serverList for a list of servers.");
        }
    
    }    

}

module.exports = ServerInfoCommand;