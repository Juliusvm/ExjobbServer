const WebSocket = require('ws');
 
 
module.exports.createWebsocket = function(server)
{
  
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws, req) {
    
      var urlParam = req.url.replace('/', '');
      var interval = getInterval(urlParam)
    
      if(typeof interval == 'undefined')
      {
            ws.send("Invalid url parameter. Valid parameters are 1 and 5")
            ws.close()
            return
      }
       

       ws.send('Connected.');
    
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
    
      ws.on('close', function close() {
        ws.send("Websocket closed.")
        clearInterval(sendPing)
      });
    
      var sendPing = setInterval(function() {
        ws.send("ping")
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


