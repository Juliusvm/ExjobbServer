const express = require('express');
const http = require('http');
//const url = require('url'); Orsakar krash på haroku
var app = express();
var longpoll = require("express-longpoll")(app);
var port = process.env.PORT || 3000;

const server = http.createServer(app);
var websocket = require('./Websocket.js').createWebsocket(server)


longpoll.create("/poll1");
longpoll.create("/poll5")
 

//Public every 1 second
setInterval(function () { 
    longpoll.publish("/poll1", "Hello");
}, 1000);

// Publish every 5 seconds
setInterval(function () { 
    longpoll.publish("/poll5", "Hello");
}, 5000);

server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});