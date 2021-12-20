var protopost = require("protopost").client;
var Discord = require("discord.js");
var {Client, Intents, MessageAttachment} = Discord;

var TOKEN = process.env["TOKEN"]
var RECEIVER = process.env["RECEIVER"];
var IGNORE_SELF = process.env["IGNORE_SELF"] || true;
var REQUIRE_MENTION = process.env["REQUIRE_MENTION"] || true;
var ONLY_CONTENT = process.env["ONLY_CONTENT"] || false;

var client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

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
  try {
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
    var data;
    if(ONLY_CONTENT)
    {
      data = content;
    }
    else
    {
      data = {
        originalContent: oc,
        content,
        id: msg.id,
        author: msg.authorId,
        channel: msg.channel.id,
        guild: msg.guild.id,
        attachments: msg.attachments.map((e) => e.url)
      };
    }
    //send message to receiver
    var response = await protopost(RECEIVER, data);
    //if response is non-null, and non-empty, send it as a response
    if(response != null)
    {
      if(typeof response == "string")
      {
        await msg.reply(response);
      }
      else
      {
        //parse attachments
        var atts = response.attachments != null ? response.attachments.map(({data, name}) => new Discord.MessageAttachment(Buffer.from(data, "base64"), name)) : null;

        await msg.reply({
          content: response.content,
          files: atts
        })
      }
    }
  }
  catch(e)
  {
    msg.reply("Sorry, an error occurred");
    console.error(e);
  }
});

client.login(TOKEN);
