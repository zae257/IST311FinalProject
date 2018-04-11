var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var playerList = [];
var connectCounter = 0;
var readyCounter = 0;
var ranPlayerM = 0;
var ranPlayerD = 0;
var ranPlayerI = 0;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/lobby.html');
});

io.on('connection', function(socket){
	socket.on('player name', function(name){
		playerList.push({username: name, role: ''});
		console.log(playerList);
		io.emit('chat message', playerList);

	});

	socket.on('player ready', function(){
		readyCounter++;	
		console.log("Read Counter is: " + readyCounter );
		if(readyCounter == connectCounter){
			console.log("Start Game");
			io.emit('start game', "test");
			console.log(assignRoles(playerList));

		}
	});

	socket.on('disconnect', function() { connectCounter--; console.log("Connect Counter is: " + connectCounter)});
});


function assignRoles (playerList){

	//generate random number between 0 and number of connected Users
	//add role
	ranPlayerM = Math.floor(Math.random() * connectCounter);
	playerList[ranPlayerM].role = 'Mafia';

	//must be a do while since this MUST RUN AT LEAST ONCE
	do {
		ranPlayerD = Math.floor(Math.random() * connectCounter);
	} while (ranPlayerD == ranPlayerM) ;
	playerList[ranPlayerD].role = 'Doctor';

	do {
		ranPlayerI = Math.floor(Math.random() * connectCounter);
	} while ((ranPlayerI == ranPlayerM)  || (ranPlayerI == ranPlayerD));
	playerList[ranPlayerI].role = 'Investigator';

	//iterate and add the rest of the roles
	for(i = 0; i < connectCounter; i++){
		if (i != ranPlayerM && i != ranPlayerD && i != ranPlayerI) {
			playerList[i].role = 'Town';
		}
	}

	return playerList;
}



io.on('connect', function() { connectCounter++; console.log("Connect Counter is: " + connectCounter); });

http.listen(3000, function(){
	console.log('listening on *:3000');
});