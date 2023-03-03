require('dotenv/config');
const express = require('express');
const app = express();
const port = process.env.PORT;
const Discord = require('discord.js');
const cron = require('node-cron');

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => { 
    res.send("Bot Active");
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

var date = new Date();
var hour = date.getHours();
var minute = date.getMinutes();

client.on("ready", () => {
  //check bot active
  console.log(`Logged in as ${client.user.tag} at ${hour}:${minute}`)
  //get channel and send message
  client.channels.fetch(process.env.ID_SERVER).then(channel => {
    //set message with cron
    
    cron.schedule('0 7,16 * * *', function() {
      console.log(`running a task at ${new Date().getHours()}:${new Date().getMinutes()}`);
      channel.send(process.env.MESSAGE);
      //if(new Date().getMinutes() == 42){
      //channel.send(process.env.MESSAGE);
      //} else if(new Date().getMinutes() == 43){
      //channel.send(`43`);
      //} else {
      //channel.send(`Check BOT at ${new Date().getHours()}:${new Date().getMinutes()}`);
      //}
    });
  })
});

client.login(process.env.TOKEN);