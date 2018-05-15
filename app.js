const express = require('express');
const http = require('http');
//const url = require('url'); Orsakar krash på haroku
var app = express();
var longpoll = require("express-longpoll")(app);
var port = process.env.PORT || 3000;

const server = http.createServer(app);
var websocket = require('./Websocket.js').createWebsocket(server)
var helper = require('./Helper.js')


longpoll.create("/poll0");
longpoll.create("/poll1")
 

//Public every 0.5 second
setInterval(function () { 
    longpoll.publish("/poll0", helper.randomChars());

}, 500);

// Publish every 10 seconds
setInterval(function () { 
    longpoll.publish("/poll1", helper.randomChars()).then(() => 
    {
        console.log("Sent ping to client!")
    })
}, 10000);




server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});