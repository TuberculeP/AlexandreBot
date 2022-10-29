console.log("Chargement...")

/* IMPORTS */
const tmp = require('tmp');
const fs = require("fs");
const {Client, GatewayIntentBits} = require("discord.js");
const { EmbedBuilder } = require('discord.js');

/* DISCORD JS CONFIGURATION */
const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
require('dotenv').config()
const token = process.env.TOKEN;

/* CHECK IF MESSAGE CONTAINS ALEXANDRINE */
function plintCheck(message, logs=false, replySWE=false){
    tmp.file(function (err, path) {
        if (err) throw err;
        fs.writeFileSync(path, message.content)

        let exec = require('child_process').exec;
        exec('python3 -m plint plint/plint/test_data/mithridate.tpl< '+path,
            function (error) {
                if (error === null) {
                    console.log(message.author.tag+" a réussi un Alexandrin : "+message.content);
                    message.react("✅").then();
                }
                if(logs){
                    if(error){
                        AlexLOG.addFields({name: "Erreur", value: `\`\`\``+error.message+`\`\`\``})
                        replySWE.reply({embeds: [AlexLOG]});
                    }else{
                        replySWE.reply("✅ J'ai bien fouillé ya pas d'erreur frérot")
                    }
                }
            });
    });
}

/* BOT EMBEDS */
const AlexLOG = new EmbedBuilder()
    .setColor(0x0099FF)
    .setAuthor({ name: 'AlexandreBot Logs', iconURL: 'https://cdn.discordapp.com/app-icons/718867263452872795/1c4d273634bce721efc7e7ac858529f4.png?size=512' })
    .setTitle('Voyons voir ça')
    .setTimestamp()

client.on("messageCreate",(message)=>{
    if(message.content !== null && message.embeds.length === 0){
        plintCheck(message);
    }
    if(message.content==="::logs" && message.type===19){
        message.channel.messages.fetch(message.reference.messageId).then(ref_msg =>{
            plintCheck(ref_msg, true, message)})
    }
    let content = message.content;
    const replaced = content.replace(/[^a-z0-9]/gi, '').toLowerCase();
    if(replaced.endsWith("quoi")){
        message.reply("feur")
    }
})

client.on("ready", () =>{
    console.log("AlexandreBot est prêt à en découdre"); //message when bot is online
});
client.login(token).then();