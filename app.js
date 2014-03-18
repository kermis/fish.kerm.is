// // Import the Express module
// var express = require('express');

// // Import the 'path' module (packaged with Node.js)
// var path = require('path');

// // Create a new instance of Express
// var app = express();

// // Import the Anagrammatix game file.
// var game = require('./game');

// // Create a simple Express application
// app.configure(function() {
//     // Turn down the logging activity
//     app.use(express.logger('dev'));

//     // Serve static html, js, css, and image files from the 'public' directory
//     app.use(express.static(path.join(__dirname,'public')));
// });

// app.get('/',function(req,res){
// 	res.send('app is running <br><br><br>&copy;Kerm.is 2014')
// })

// // Create a Node.js based http server on port 8080
// var server = require('http').createServer(app).listen(8080);

// // Create a Socket.IO server and attach it to the http server
// var io = require('socket.io').listen(server);

// // Reduce the logging output of Socket.IO
// io.set('log level',1);

// // Listen for Socket.IO Connections. Once connected, start the game logic.
// io.sockets.on('connection', function (socket) {
//     //console.log('client connected');
//     game.initGame(io, socket);
// });

//////////////////////////////////////////////////////////////
// var io = require('socket.io').listen(3728);

// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
//   socket.on('new room', function(data){
//   	console.Log('new room', data)
//   })
// });
//////////////////////////////////////////////////////////////
var fs = require("fs"),
    app = require("http").createServer(handler), // handler defined below
    io = require("socket.io").listen(app, { log: false }),
    theport = process.env.PORT || 2000;

app.listen(theport);

function handler (req, res) {
    return res.send('app running');
}

io.set( 'origins', '*:*' );

io.sockets.on("connection", function(socket) {
    // This will run when a client is connected


    // This is a listener to the signal "something"
    socket.on("something", function(data) {
        // This will run when the client emits a "something" signal
    });

    // This is a signal emitter called "something else"
    socket.emit("something else", {hello: "Hello, you are connected"});
});

