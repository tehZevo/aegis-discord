# Discord Aegis node
Listen for/respond to Discord messages using an Aegis node

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
