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
	 console.log(playerList);
    io.emit('chat message', playerList);
	
  });
  socket.on('player ready', function(){
	readyCounter++;	
	console.log("Read Counter is: " + readyCounter );
	if(readyCounter == connectCounter){
	console.log("Start Game");
	io.emit('start game', "test");
	
}
});

socket.on('disconnect', function() { connectCounter--; console.log("Connect Counter is: " + connectCounter)});
});





io.on('connect', function() { connectCounter++; console.log("Connect Counter is: " + connectCounter); });

http.listen(3000, function(){
  console.log('listening on *:3000');
});