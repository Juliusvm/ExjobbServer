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
        console.log('received: %s', message);
      });
    
      ws.on('close', function close() {
        ws.send("Disconnected")
        console.log("Disconnected")
        clearInterval(pingClient)
      });
    
      var pingClient = setInterval(function() {
       
        try {
          ws.send("Ping", function(error) {
            if(error == undefined)
              return;
            else
              logger.debug("Async error:"+error);
          });
        } catch(e) {
          logger.debug("Sync error: " + e);
            ws.close();
        }


      //   ws.clients.forEach(function each(client) {
          
      //     if (client.readyState === client.OPEN)
      //     {
      //       ws.send("ping")
      //     }
      // });

          
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


