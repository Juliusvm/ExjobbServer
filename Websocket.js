
const WebSocket = require('ws');
var helper = require('./Helper.js')
module.exports.createWebsocket = function(server)
{
    const wss = new WebSocket.Server({ server });
    wss.on('connection', function connection(ws, req) {
      var urlParam = req.url.replace('/', '');
      var interval = getInterval(urlParam)
      if(typeof interval == 'undefined')
      {
            ws.send("Invalid url parameter. Valid parameters are 0 and 1")
            ws.close()
            return
      }
      ws.on('message', function incoming(message) {
        console.log('Meddelande mottaget: %s', message);
      });
      ws.on('close', function close() {
        console.log("Client disconnected")
        clearInterval(pingClient)
        ws.close()
      });
      var pingClient = setInterval(function() {   
        ws.send(helper.randomChars())       
      }, interval);
    });
    function getInterval(urlParam)
    {
        if(urlParam == 0)
            return 500;
        if(urlParam == 1)
            return 10000;
    }
}



