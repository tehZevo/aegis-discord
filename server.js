var protopost = require("protopost").client;
const {Client, Intents} = require("discord.js");

var TOKEN = process.env["TOKEN"]
var RECEIVER = process.env["RECEIVER"];
var IGNORE_SELF = process.env["IGNORE_SELF"] || true;
var REQUIRE_MENTION = process.env["REQUIRE_MENTION"] || true;

const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

function startsWithMention(text)
{
  text = text.trim();
  return text.startsWith(`<@${client.user.id}>`) || text.startsWith(`<@!${client.user.id}>`);
}

function trimMention(text)
{

}

// Register an event to handle incoming messages
client.on('messageCreate', async (msg) => {
  var content = msg.content;
  if(msg.author == client.user && IGNORE_SELF)
  {
    return;
  }
  if(REQUIRE_MENTION)
  {
    if(startsWithMention(content))
    {
      content = trimMention(content)
    }
    else
    {
      return;
    }
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
