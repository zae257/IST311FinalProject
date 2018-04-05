var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var playerList = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/lobby.html');
});

io.on('connection', function(socket){
  socket.on('player name', function(name){
    io.emit('chat message', name);
	console.log(name);
  });
});
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});