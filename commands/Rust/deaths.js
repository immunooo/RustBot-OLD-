const commando = require('discord.js-commando');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class DeathsCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'deaths',
            group: 'rust',
            memberName: 'test',
            description: 'Shows amount of deaths by players of the given steam 64 for Rust. Example syntax: r!deaths 76561198067054206'
        });

    }
    async run(message, args){
        console.log("Deaths: "+args);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=SteamAPIKEY&steamids='+ args, false);
        xmlHttp.send(null);

        if(!(xmlHttp.responseText == "{}" || xmlHttp.responseText.includes("<html>") || xmlHttp.responseText == "{\"response\":{\"players\":[]}}")){
            var summary = JSON.parse(xmlHttp.responseText);
            var response = summary.response;
            var name = response.players[0].personaname;
        } else {
            name = "No Name"
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
            var s8 = 0;

            while(count < s.stats.length){
                if(s.stats[count].name == "deaths"){
                    s1 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_suicide"){
                    s2 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_fall"){
                    s3 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_selfinflicted"){
                    s4 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_entity"){
                    s5 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_wolf"){
                   s6 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_bear"){
                    s7 = s.stats[count].value;
                }
                count ++;
            }

            var s8 = s1 - s2 - s3 - s4 - s5 - s6 - s7; //player
            message.reply("\n**"+ name + "** (" + args + ")\n\n__**Deaths:**__ \n**Total:**  " + s1 + "\n**Players:** " + s8 + "\n**Suicide:** "+ s2 + "\n**Fall:** " + s3 + "\n**Selfinfliced:** " + s4 + "\n**Bear:** " + s7 + "\n**Wolf:** " + s6+ "\n**Unknown:** " + s5+"\n\nNote: Bot only shows statistics provided by Steam.");
        }else {
            message.reply("Make sure you have a valid **SteamID 64** and game details are set to public.\nExample syntax: r!deaths 76561198067054206");
        }
    }    
}

module.exports = DeathsCommand;
