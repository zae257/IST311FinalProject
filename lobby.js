	  $(function () {
		var socket = io();
		var username = prompt("Enter a username", "Sword");
		var i =0;
		var playerList ="";
		if(username != null){
		socket.emit('player name', username);
		}
		
		socket.on('chat message', function(name){
		for(i =0; i<name.length; i++){
			playerList +="<li>" +  name[i] + "<br>";
			}
		  $('#players').append(playerList + "-----------");
		});
		
		$('#ready').click(function(){
			$(this).val("Wait for others");
			document.getElementById("ready").disabled = true;
			socket.emit('player ready', "test");
		});
		

	  });