var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var playerList = [];
var connectCounter = 0;
var readyCounter = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/lobby.html');
});

io.on('connection', function(socket){
  socket.on('player name', function(name){
	 playerList.push(name);
    io.emit('chat message', playerList);
	
  });
  socket.on('player ready', function(){
	readyCounter++;	
	console.log("Read Counter is: " + readyCounter );
});


socket.on('disconnect', function() { connectCounter--; console.log(connectCounter)});
});

io.on('connect', function() { connectCounter++; console.log(connectCounter); });

http.listen(3000, function(){
  console.log('listening on *:3000');
});