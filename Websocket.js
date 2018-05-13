const WebSocket = require('ws');
 
 
module.exports.createWebsocket = function(server)
{
  
    const wss = new WebSocket.Server({ server });

   

    wss.on('connection', function connection(ws, req) {
    
      var urlParam = req.url.replace('/', '');
      var interval = getInterval(urlParam)

      console.log("Someone connected")

      if(typeof interval == 'undefined')
      {
            ws.send("Invalid url parameter. Valid parameters are 1 and 5")
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
      
        
        ws.send("Ping")
          
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


