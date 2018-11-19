const commando = require('discord.js-commando');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var serverList = require('./serverList.json');

class ServerInfoCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'info',
            group: 'server',
            memberName: 'info',
            description: 'Displays the info of a given server. Example syntax: r!info rust rehab'
        });

    }
    async run(message, args){        
        console.log("Server: "+args);
        var xmlHttp = new XMLHttpRequest();
        var serverid;
        var count = 0;
        while(count < serverList.list.length){
            if(serverList.list[count].name.toLowerCase() == args.toLowerCase()){
                serverid = serverList.list[count].id;
            }
            count++;
        }
        xmlHttp.open("GET", 'https://api.battlemetrics.com/servers/' + serverid, false);
        xmlHttp.send(null);
        var n = xmlHttp.responseText;
        try{
        n = JSON.parse(n);
        n = n.data["attributes"];
        message.reply("\n __**" + n.name + ":**__\n**Players:** "+ n.players +"/" + n.maxPlayers + "\n**Queue:** "+ n.details["rust_queued_players"] + "\n**Website:** <" + n.details["rust_url"]+">");
        } catch(e){
            if(args != ""){
                //Start of search
                var result = [];
                var index;
                var entry;
                
                for(index = 0; index < serverList.list.length; index++){
                    entry = serverList.list[index];
                    if(entry && entry.name && entry.name.toLowerCase().indexOf(args) != -1 && result.length < 7){
                        result.push(entry.name + "\n");
                    }
                }
                //End of search
                result = result.toString();
                result = result.replace(/,/g,'');
                if(result != ""){
                    message.reply("\n__**Here are servers close to your entry:**__ \n" + result +"\nIf the server you searched for did not come up type **r!serverlist** for the server list.");
                } else {
                    message.reply("There are no servers on the list similar");
                }
                
            } else{
                message.reply("Please have a server name.")
            }
        }
    }    

}

module.exports = ServerInfoCommand;
