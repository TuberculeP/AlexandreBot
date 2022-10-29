console.log("Cool Bot");

//from fuc,ing internet

const token = "NzE4ODY3MjYzNDUyODcyNzk1.GTp72w.3g8i4p3wHNRVRkdxrqxWcpw3JUJFBai-eYgutg";
const {Client, GatewayIntentBits} = require("discord.js");
const {exec} = require("child_process");
const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
client.on("ready", () =>{
    console.log("The AI bot is online"); //message when bot is online
});
client.on("messageCreate", (message)=>{
    fs = require('fs');
    fs.writeFile("temp/tempmessage.txt", message.content, function (err) {
        if (err) return console.log(err);
    })

    var exec = require('child_process').exec;
    exec('python3 -m plint plint/plint/test_data/mithridate.tpl< temp/tempmessage.txt',
        function (error, stdout, stderr) {
            if (error === null && message. attachments.size === 0) {
                message.react('✅');
            }
        });

})
client.login(token);