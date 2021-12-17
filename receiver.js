var ProtoPost = require("protopost");

var PORT = 8081;

//protopost server for testing purposes :)))
var api = new ProtoPost({}, (message) =>
{
  if(message == "ping")
  {
    return "pong";
  }
});

api.start(PORT);
