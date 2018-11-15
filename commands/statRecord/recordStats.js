const commando = require('discord.js-commando');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

class StatRecordCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'record',
            group: 'statrecord',
            memberName: 'record',
            description: 'Records stats of the given steam ID 64. Syntax: r!record 76561198067054205'
        });

    }
    async run(message, args){
        console.log("Recorded: " + args);
        var xmlHttp = new XMLHttpRequest();
        args = args.replace(/\D/g,'');
        xmlHttp.open("GET", 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=252490&key=3B410FFD779753422BDD9FD2D517E543&steamid=' + args, false);
        xmlHttp.send(null);  
        var n = xmlHttp.responseText;
        if(!(xmlHttp.responseText == "{}" || n.includes("<html>") || xmlHttp.responseText == "{\"response\":{\"players\":[]}}")){
            fs.writeFileSync("C:/discordbot/RustBotOfficial/userStats/" + args + ".json", xmlHttp.responseText, function (err){
                if (err) throw err;
                console.log('Saved user: ' + args);
            });
            message.reply( args + " stats were saved!")

        } else {
            message.reply("Make sure you have a valid **SteamID 64** and game details are set to public.\nExample syntax: r!record 76561198067054206");
        }

    }    

}

module.exports = StatRecordCommand;