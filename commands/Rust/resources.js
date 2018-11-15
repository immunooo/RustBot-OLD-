const commando = require('discord.js-commando');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class RustResourcesCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'resources',
            group: 'rust',
            memberName: 'resources',
            description: 'Shows amount of resources gathered of the given steam 64 for Rust. Example Syntax: r!resources 76561198067054206'
        });

    }
    async run(message, args){
        console.log("Resources: "+args);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=SteamAPIKEY&steamids='+ args, false);
        xmlHttp.send(null);

        if(!(xmlHttp.responseText == "{}" || xmlHttp.responseText.includes("<html>") || xmlHttp.responseText == "{\"response\":{\"players\":[]}}")){
            var summary = JSON.parse(xmlHttp.responseText);
            var response = summary.response;
            var name = response.players[0].personaname;
        } else {
            name = ""
        }

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=252490&key=SteamAPIKEY&steamid=' + args, false);
        xmlHttp.send(null);
       
        if(!(xmlHttp.responseText == "{}" || xmlHttp.responseText.includes("<html>"))){
            var n = JSON.parse(xmlHttp.responseText);
            var s = n.playerstats;
            var count = 0;

            var s1 = 0;
            var s2 = 0;
            var s3 = 0;
            var s4 = 0;
            var s5 = 0;
            var s6 = 0;
            var s7 = 0;
            var s8 = 0

            while(count < s.stats.length){
                if(s.stats[count].name == "harvest.wood"){
                    s1 = s.stats[count].value;
                }
                if(s.stats[count].name == "harvest.stones"){
                    s2 = s.stats[count].value;
                }
                if(s.stats[count].name == "acquired_metal.ore"){
                    s3 = s.stats[count].value;
                }
                if(s.stats[count].name == "harvest.cloth"){
                    s4 = s.stats[count].value;
                }
                if(s.stats[count].name == "harvested_leather"){
                    s5 = s.stats[count].value;
                }
                if(s.stats[count].name == "acquired_lowgradefuel"){
                   s6 = s.stats[count].value;
                }
                if(s.stats[count].name == "acquired_scrap"){
                    s7 = s.stats[count].value;
                }
                count ++;
            }

            message.reply("\n**"+ name + "** (" + args + ")\n\n__**Resources Gathered:**__ \n**Wood:**  " + s1 + "\n**Stone:** " + s2 + "\n**Metal Ore:** "+ s3 + "\n**Cloth:** " + s4 + "\n**Leather:** " + s5 + "\n**Lowgrade Fuel:** " + s6 + "\n**Scrap:** " + s7+"\n\nNote: Bot only shows statistics provided by Steam.");
        }else {
            message.reply("Make sure you have a valid **SteamID 64** and game details are set to public.\nExample syntax: r!resources 76561198067054206");
        }
    }    
}

module.exports = RustResourcesCommand;
