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
  var m1 = `<@${client.user.id}>`;
  var m2 = `<@!${client.user.id}>`;
  if(text.startsWith(m1))
  {
    return text.slice(m1.length).trim();
  }
  if(text.startsWith(m2))
  {
    return text.slice(m2.length).trim();
  }

  return text;
}

// Register an event to handle incoming messages
client.on('messageCreate', async (msg) => {
  var content = msg.content;
  var oc = content;
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
  var data = {
    originalContent: oc,
    content,
    id: msg.id,
    author: msg.authorId,
    channel: msg.channel.id,
    guild: msg.guild.id,
    attachments: msg.attachments.map((e) => e.url)
  };
  //send message to receiver
  var response = await protopost(RECEIVER, data);
  //if response is non-null, and non-empty, send it as a response
  if(response != null)
  {
    //TODO: support attachments
    msg.reply(response);
  }
});

client.login(TOKEN);
