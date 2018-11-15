const commando = require('discord.js-commando');

class CraftCommand extends commando.Command {
    constructor(client){
        super (client, {
            name: 'craft',
            group: 'rust',
            memberName: 'craft',
            description: 'Displays the current amount of players playing Rust.'
        });

    }
    async run(message, args){
        console.log("Craft Command:"+args);
        var item = args.substr(0, args.indexOf(" "));
        var number = args.substr(args.indexOf(" ") + 1);
        item = item.toLowerCase();
        number = number.toLowerCase();
        if(item == "" && (number =="c4"||number == "timedexplosive"|| number =="rocket" || number == "sachelcharge"||number == "explosiveround"|| number == "riflebullet" || number == "pistolbullet")){
            item = number;
            number = 1;
        }
        number = Math.floor(number);
        if(item == 'c4'||item == 'timedexplosive'){
            if(number > 0 && number <= 5000){//item == 'c4'
                var explosives  = 20 * number;
                var cloth = 5 * number;
                var techTrash = 2 * number;
                var sulfur = 2200 * number;
                var charcoal = 3000 * number;
                var metalFragments = 200 * number;
                var lowGradeFuel = 60 * number;
                message.reply("\n__**Timed Explosive("+ number +"):**__\n**Workbench:** Tier 3\n**Materials:**\n     Explosives: "+explosives+"\n     Cloth: "+cloth+"\n     Tech Trash: "+techTrash+"\n**Raw Materials:**\n     Sulfur: " + sulfur +"\n     Charcoal: "+charcoal +"\n     Metal Fragments: "+metalFragments+"\n     Low Grade Fuel: "+lowGradeFuel+"\n     Cloth: "+cloth+"\n     Tech Trash: "+ techTrash);

            } else {
                message.reply("You need to have a number greater than 0 and less than 500.");//"You need to have a explosive."
            }
        } else if(item == "rocket"){
            if(number > 0 && number <= 5000){//item == 'c4'
                var metalPipe = 2 * number;
                var gunPowder = 150 * number;
                var explosives = 10 * number;
                var sulfur = 1400 * number;
                var charcoal = 1950 * number;
                var metalFragments = 100 * number;
                var lowGradeFuel = 30 * number;
                message.reply("\n__**Rocket("+ number +"):**__\n**Workbench:** Tier 3\n**Materials:**\n     Metal Pipes: "+metalPipe+"\n     Gun Powder: "+gunPowder+"\n     Explosives: "+explosives+"\n**Raw Materials:**\n     Sulfur: " + sulfur +"\n     Charcoal: "+charcoal +"\n     Metal Fragments: "+metalFragments+"\n     Low Grade Fuel: "+lowGradeFuel+"\n     Metal Pipes: "+metalPipe);

            } else {
                message.reply("You need to have a number greater than 0 and less than 500.");//"You need to have a explosive."
            }

        } else if(item == "sachelcharge"){
            if(number > 0 && number <= 5000){
                var rope = 1 * number;
                var beanCan = 4 * number;
                var smallStash = 1 * number;
                var sulfur = 480 * number;
                var charcoal = 720 * number;
                var metalFragments = 80 * number;
                var cloth = 10 * number;
                message.reply("\n__**Sachel Charge("+ number +"):**__\n**Workbench:** Tier 1\n**Materials:**\n     Bean Can: "+beanCan+"\n     rope: "+rope+"\n     Small Stash: "+smallStash+"\n**Raw Materials:**\n     Sulfur: " + sulfur +"\n     Charcoal: "+charcoal +"\n     Metal Fragments: "+metalFragments+"\n     Cloth: "+cloth+"\n     Rope: "+rope);

            } else {
            message.reply("You need to have a number greater than 0 and less than 500.");//"You need to have a explosive."
            }
        } else if(item == "explosiveround"){
            if(number > 0 && number <= 5000){
                var gunpowder = 20 * number;
                var sulfur = 50 * number;
                var charcoal = 60 * number;
                var metalFragments = 80 * number;
                message.reply("\n__**Explosive Round("+ number +"):**__\n**Rounds:** "+ (number * 2)+"\n**Workbench:** Tier 3\n**Materials:**\n     Metal Fragments: "+metalFragments+"\n     Gunpowder: "+gunpowder+"\n     Sulfur: "+(sulfur/5)+"\n**Raw Materials:**\n     Sulfur: " + sulfur +"\n     Charcoal: "+charcoal +"\n     Metal Fragments: "+metalFragments);
    
            } else {
            message.reply("You need to have a number greater than 0 and less than 500.");//"You need to have a explosive."
            }
        } else if(item == "riflebullet"){
            if(number > 0 && number <= 5000){
                var gunpowder = 5 * number;
                var sulfur = 20 * number;
                var charcoal = 30 * number;
                var metalFragments = 10 * number;
                message.reply("\n__**5.56 Rifle Ammo("+ number +"):**__\n**Rounds:** "+ (number * 3)+"\n**Workbench:** Tier 2\n**Materials:**\n     Metal Fragments: "+metalFragments+"\n     Gunpowder: "+gunpowder+"\n**Raw Materials:**\n     Sulfur: " + sulfur +"\n     Charcoal: "+charcoal +"\n     Metal Fragments: "+metalFragments);
    
            } else {
            message.reply("You need to have a number greater than 0 and less than 500.");//"You need to have a explosive."
            }
        } else if(item == "pistolbullet"){
            if(number > 0 && number <= 5000){
                var gunpowder = 5 * number;
                var sulfur = 20 * number;
                var charcoal = 30 * number;
                var metalFragments = 10 * number;
                message.reply("\n__**Pistol Bullet("+ number +"):**__\n**Rounds:** "+ (number * 4)+"\n**Workbench:** Tier 1\n**Materials:**\n     Metal Fragments: "+metalFragments+"\n     Gunpowder: "+gunpowder+"\n**Raw Materials:**\n     Sulfur: " + sulfur +"\n     Charcoal: "+charcoal +"\n     Metal Fragments: "+metalFragments);
    
            } else {
            message.reply("You need to have a number greater than 0 and less than 5000.");//"You need to have a explosive."
            }
        }else {
            message.reply("You need to have a valid item. \nItem list:\n  -C4 or TimedExplosive(Timed Explosive)\n  -Rocket\n  -SachelCharge\n  -ExplosiveRound(Explosive 5.56 Rifle Ammo)\n  -RifleBullet(5.56 Rifle Ammo)\n  -PistolBullet\n Example Syntax: r!craft c4 100")//"You need to have a number greater than 0 and less than 10000."
        }
    }    

}

module.exports = CraftCommand;