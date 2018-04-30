var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var playerList = [];
var connectCounter = 0;
var readyCounter = 0;
var ranPlayerM = 0;
var ranPlayerD = 0;
var ranPlayerI = 0;
var time;
var timerId
var votes = [];


	
app.get('/', function(req, res){
	res.sendFile(__dirname + '/lobby.html');
});

io.on('connection', function (socket) {
	socket.on('player name', function(name){
		playerList.push({SocketID: '', username: name, role: '', status :'alive', });
		//console.log(playerList);
		io.emit('displayUsernames', playerList);
		//console.log(Object.keys(io.sockets.sockets));
	});
	
	
	socket.on('send sessionid', function(id){
		playerList[playerList.length -1].SocketID = id;
		console.log(playerList);
	});
	
	
	

	socket.on('player ready', function(){
		readyCounter++;	
		console.log("Ready Counter is: " + readyCounter );
		if(readyCounter == connectCounter){
			assignRoles(playerList);
			console.log("Start Game");
			io.emit('start game', playerList);
			console.log(playerList);

            setTimeout(function () { io.emit('startnight', ); startnight()}, 20000);
			}
			
    });

    io.on('vote', function (vote) {
        console.log(vote);
        for (i = 0; i < playerList.length; i++) {
            if (playerList[i].SocketID == vote.id) {
                playerList[i].vote == vote.targ;
            }
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

function startday() {  // daytime
    countdownday()


}

function startnight() { // night time
    var votes = [];
    votes = playerList.vote;
    votes += playerList.username;
    //var result = countVotes(votes);
    //result.sort;
    //result.reverse;
   // console.log(result);
    //var hung = [];
   // hung[0] = result[0, 0];
    //hung[1] = result[0, 1]; 
    io.emit('votereults', )
    countdownnight()

}

function countVotes(arr) {

}

function countdownday() { // time our days
    setTimeout(function () { io.emit('startnight', ); startnight(); }, 900000);
}


function countdownnight() { // time our nights
    setTimeout(function () { io.emit('startday', ); startday(); }, 300000);
}

io.on('connect', function() { connectCounter++; console.log("Connect Counter is: " + connectCounter); });

http.listen(3000, function(){
	console.log('listening on *:3000');
});