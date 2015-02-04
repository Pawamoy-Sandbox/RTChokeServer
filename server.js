'use strict';

var ent = require('ent');
var fs = require('fs');
var app = require('./index');


//var server;

/*
 * Create and start HTTP server.
 */

var http = require('http');
var fs = require('fs');
// Loading the index file . html displayed to the client
var server = http.createServer(app);
// Loading socket.io
var io = require('socket.io').listen(server);
// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'You are connected!');
    socket.broadcast.emit('message', 'Another user has just connected!');

    socket.on('message', function (message) {
		socket.broadcast.emit('message', message);
    }); 
});
server.listen(process.env.PORT || 3000);

server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
