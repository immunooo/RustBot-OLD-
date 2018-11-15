const commando = require('discord.js-commando');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class RustKDCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'kd',
            group: 'rust',
            memberName: 'kd',
            description: 'Shows amount of player kills / players death ratio of the given steam 64 for Rust. Example syntax: r!kd 76561198067054206'
        });

    }
    async run(message, args) {
        console.log("KD: "+args);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3B410FFD779753422BDD9FD2D517E543&steamids='+ args, false);
        xmlHttp.send(null);

        if(!(xmlHttp.responseText == "{}" || xmlHttp.responseText.includes("<html>") || xmlHttp.responseText == "{\"response\":{\"players\":[]}}")){
            var summary = JSON.parse(xmlHttp.responseText);
            var response = summary.response;
            var name = response.players[0].personaname;
        } else {
            name = "No Name"
        }

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=252490&key=3B410FFD779753422BDD9FD2D517E543&steamid=' + args, false);
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
                if(s.stats[count].name == "kill_player"){
                    s8 = s.stats[count].value;
                }
                count ++;
            }

            var kd =  s8/(s1 - s2 - s3 - s4 - s5 - s6 - s7);
            kd = kd.toPrecision(3);
            message.reply("\n**" + name + "** (" + args + ") has a **" + kd + " K/D ratio** (vs Players)."+"\n\nNote: Bot only shows statistics provided by Steam.");

        }else {
            message.reply("Make sure you have a valid **SteamID 64** and game details are set to public.\nExample syntax: r!kd 76561198067054206");
        }
    }    
}

module.exports = RustKDCommand;