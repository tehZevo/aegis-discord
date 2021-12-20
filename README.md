# Discord Aegis node
Listen for/respond to Discord messages using an Aegis node

## Environment
- `TOKEN` - the Discord bot token to sign in with
- `RECEIVER` - the ProtoPost node to send messages to
- `IGNORE_SELF` - if true, ignore messages from the bot itself (defaults to true)
- `REQUIRE_MENTION` - if true, all messages must begin with a mention to the bot (also trims the mention off; defaults to true)
- `ONLY_CONTENT` - send only the message content (text) to `RECEIVER` (defaults to false)
- `ERROR_MESSAGE` - string to reply with if any error occurs

## Data
Data is sent in the following format (where `msg` is the data from a `messageCreate` discord.js event):
```js
var data = {
  originalContent: oc,
  content,
  id: msg.id,
  author: msg.authorId,
  channel: msg.channel.id,
  guild: msg.guild.id,
  attachments: msg.attachments.map((e) => e.url))
}
```

## Sending data back
Responses should be of the form:
```js
{
  content: "text content",
  attachments: [
    {name: "file.jpg", data: "<base64 encoded file>"},
    ...
  ]
}
```

## TODO:
* parse mime types from attachments if present and give the file a default name
* add routes for sending messages to channels and updating existing messages
