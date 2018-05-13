const express = require('express');
const http = require('http');
//const url = require('url'); Orsakar krash på haroku
var app = express();
var longpoll = require("express-longpoll")(app);
var port = process.env.PORT || 3000;

const server = http.createServer(app);
var websocket = require('./Websocket.js').createWebsocket(server)


longpoll.create("/poll0");
longpoll.create("/poll1")
 

//Public every 0.5 second
setInterval(function () { 
    longpoll.publish("/poll0", makeid());

}, 500);

// Publish every 10 seconds
setInterval(function () { 
    longpoll.publish("/poll1", makeid()).then(() => 
    {
        console.log("Sent ping to client!")
    })
}, 10000);



function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
//Publish every 


server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});