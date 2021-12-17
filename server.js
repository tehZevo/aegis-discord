var protopost = require("protopost").client;
const {Client, Intents} = require("discord.js");

var TOKEN = process.env["TOKEN"]
var RECEIVER = process.env["RECEIVER"];
var IGNORE_SELF = process.env["IGNORE_SELF"] || true;

const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

// Register an event to handle incoming messages
client.on('messageCreate', async (msg) => {
  if(msg.author == client.user && IGNORE_SELF)
  {
    return;
  }
  //send message to receiver
  var response = await protopost(RECEIVER, msg.content);
  //if response is non-null, and non-empty, send it as a response
  if(response != null)
  {
    msg.reply(response);
  }
  //TODO: support more complex response messages (files list w/ b64 encoded files, embeds, etc)
});

client.login(TOKEN);
