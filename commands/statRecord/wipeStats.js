const commando = require('discord.js-commando');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class WipeStatsCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'wipestats',
            group: 'statrecord',
            memberName: 'wipestats',
            description: 'Returns the current Wipe Stats of the given steamID 64. Example syntax: r!wipestats 76561198067054205'
        });

    }
    async run(message, args){
        console.log("Wipestats: "+args);
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
       
        if(!(xmlHttp.responseText == "{}" || xmlHttp.responseText.includes("<html>") || xmlHttp.responseText == "{\"response\":{\"players\":[]}}")){
            var n = JSON.parse(xmlHttp.responseText);
            var s = n.playerstats;
            var count = 0;

            var new1 = 0;
            var new2 = 0;
            var new3 = 0;
            var new4 = 0;
            var new5 = 0;
            var new6 = 0;
            var new7 = 0;
            var new8 = 0;
            var old1 = 0;
            var old2 = 0;
            var old3 = 0;
            var old4 = 0;
            var old5 = 0;
            var old6 = 0;
            var old7 = 0;
            var old8 = 0;

            while(count < s.stats.length){
                if(s.stats[count].name == "deaths"){
                    new1 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_suicide"){
                    new2 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_fall"){
                    new3 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_selfinflicted"){
                    new4 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_entity"){
                    new5 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_wolf"){
                    new6 = s.stats[count].value;
                }
                if(s.stats[count].name == "death_bear"){
                    new7 = s.stats[count].value;
                }
                if(s.stats[count].name == "kill_player"){
                    new8 = s.stats[count].value;
                }
                count ++;
            }
            var newPlayer = new1 - new2 - new3 - new4 - new5 - new6 - new7; //player


            //Next part
            count = 0;
            try{
            var recorded = require('C:/discordbot/RustBotOfficial/userStats/' + args);
            } catch(e){
                count = 1;
            }
            if (count != 1){
                var stat = recorded.playerstats;
                while(count < stat.stats.length){
                    if(stat.stats[count].name == "deaths"){
                        old1 = stat.stats[count].value;
                    }
                    if(stat.stats[count].name == "death_suicide"){
                        old2 = stat.stats[count].value;
                    }
                    if(stat.stats[count].name == "death_fall"){
                        old3 = stat.stats[count].value;
                    }
                    if(stat.stats[count].name == "death_selfinflicted"){
                        old4 = stat.stats[count].value;
                    }
                    if(stat.stats[count].name == "death_entity"){
                        old5 = stat.stats[count].value;
                    }
                    if(stat.stats[count].name == "death_wolf"){
                        old6 = stat.stats[count].value;
                    }
                    if(stat.stats[count].name == "death_bear"){
                        old7 = stat.stats[count].value;
                    }
                    if(stat.stats[count].name == "kill_player"){
                        old8 = stat.stats[count].value;
                    }
                    count ++;
                }

                var oldPlayer = old1 - old2 - old3 - old4 - old5 - old6 - old7; //player

                var kills = new8 - old8;
                var deaths = newPlayer - oldPlayer;
        
                var KD;
                if(kills == 0 && deaths == 0){
                    KD = "none"
                } else if (kills > 0 && deaths == 0){
                    deaths = 1;
                    KD = (kills / deaths); 
                    KD = KD.toPrecision(3);
                } else if(kills == 0 && deaths > 0) {
                    KD = 0;
                } else {
                    KD = (kills / deaths);
                    KD =  KD.toPrecision(3);
                }

                message.reply("\n**"+ name + "** (" + args + ")\n\n__**Wipe Stats:**__ \n**KD:** " + KD + "\n**Kills:** " + kills + "\n**Deaths:** " + deaths +"\n\nNote: Bot only shows statistics provided by Steam and Steam Api is updated every 2 hours." );
            }else {
                message.reply("Could not find any recorded stats with the given SteamID 64.");;
            }
        } else {
            message.reply("Make sure you have a valid **SteamID 64** and game details are set to public.\nExample syntax: r!wipestats 76561198067054206");
        }
    }    
}

module.exports = WipeStatsCommand;