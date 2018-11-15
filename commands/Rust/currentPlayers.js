const commando = require('discord.js-commando');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class CurrentPlayersCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'currentplayers',
            group: 'rust',
            memberName: 'currentplayers',
            description: 'Displays the current amount of players playing Rust.'
        });

    }
    async run(message, args){
        try{
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?format=json&appid=252490', false);
        xmlHttp.send(null);
        var summary = JSON.parse(xmlHttp.responseText);
        var response = summary.response["player_count"];
        message.reply("There are currently **" + response + "** players on Rust." +"\n\nNote: Bot only shows statistics provided by Steam.");
        } catch(e){
            message.reply("There was something wrong, try again.")
        }
    }    

}

module.exports = CurrentPlayersCommand;