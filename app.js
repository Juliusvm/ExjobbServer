const express = require('express');
const http = require('http');
//const url = require('url'); Orsakar krash på haroku
var app = express();
var longpoll = require("express-longpoll")(app);
var port = process.env.PORT || 3000;

const server = http.createServer(app);
var websocket = require('./Websocket.js').createWebsocket(server)


longpoll.create("/poll");

 
// Publish every 5 seconds
setInterval(function () { 
    longpoll.publish("/poll", "Hello");
}, 5000);

server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});