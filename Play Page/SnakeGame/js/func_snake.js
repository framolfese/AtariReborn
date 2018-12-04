var s;
var squares = []; //ostacolo quadrato
var scl = 20; // sta per "scala", ovvero la misura del singolo quadratino di snake
var food; //cibo che lo snake dovrà mangiare
var gameover = true;
var canvas;
var last_command_time = Date.now();
var points = 0;
var played = false;
var interval;

function setup() {
	if(!gameover){
		canvas = createCanvas(scl*42, scl*37);
		canvas.parent('canvas-holder');
		s = new Snake();
		for(var i = 0; i < 10; i++){
			squares[i] = new Square();
		}
		frameRate(10);
		pickLocation();
	}
}

function onhide(){
	gameover = true;
	clearInterval(interval);
}

function play() {
	points = 0;
	document.getElementById("span_points").innerText = points;
	squares = [];
	gameover = false;
	played = true;
	setup();
}

function pickLocation() {
	var cols = floor(width/scl); //valori random per determinare posizione food
	var rows = floor(height/scl); 
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);

	for(var i = 0; i < 10; i++){
		squares[i].pickLocation();
		toccato(squares[i]);
	}
	
}

function start_snake(){
	$('#snakeModal').modal('show');
	interval = setInterval(function(){
		var rows_ranking = $('.row_ranking');
		console.log("fatto");
		var ajaxRequest =$.ajax({
			url:'http://localhost:8888/Progetto/Server/ranking.php',
			dataType:'json'
		});
	
		ajaxRequest.done(function(return_data){
			var idx = 0;
			while(idx != return_data.length){
				var email = $(rows_ranking[idx]).children()[1];
				var points = $(rows_ranking[idx]).children()[2];	
				$(email).text(return_data[idx].mail.substring(0, return_data[idx].mail.indexOf("@")));
				$([points]).text(return_data[idx].points);
				idx += 1;
			}
		});
	
		ajaxRequest.fail(function(return_data){
			alert("Error with server, please try again");
		});
	}, 5000);
}

function sendValuesToServer(){
	var userInfo = sessionStorage.getItem("userInformation");
	userInfo = JSON.parse(userInfo);

	var ajaxRequest =$.ajax({
		type:'POST',
		url:'http://localhost:8888/Progetto/Server/insert_points.php',
		dataType:'json',
		data:{mail:userInfo.usermail, point:points}
	});

	ajaxRequest.done(function(return_data){ s
		if(!return_data.status) alert("Error with insert your score");
	});

	ajaxRequest.fail(function(return_data){
		alert("Error with server, please try again");
	});
}s

function draw() {
	if(!gameover){
		background(0);

		if(s.eat(food)) {
			points += 10;
			document.getElementById("span_points").innerText = points;
			pickLocation();
		}
		if(s.hit(squares)){
			gameover = true;
		}
		if(s.death()){
			gameover = true;
		}
		
		s.update();
		s.show();
		s.hitEdge();
		
		for(var i = 0; i < 10; i++){
			squares[i].show();
		}
		
		fill(255, 0, 100);
		rect(food.x, food.y, scl, scl);
	}
	else if(gameover){
		canvas = createCanvas(scl*42, scl*37);
		canvas.parent('canvas-holder');
		background(0);
		if(played){
			/*invia dati a server per classifica*/
			sendValuesToServer();
			played = false;
			console.log("ho fatto played");
		}
	}
}

function keyPressed() {
	var now_command_time = Date.now();
	if(now_command_time - last_command_time > 60){
		last_command_time = now_command_time;
		if(keyCode === UP_ARROW && (s.xspeed !=  0 && s.yspeed != 1)){
			s.dir(0, -1);
		}
		else if(keyCode === DOWN_ARROW && (s.xspeed !=  0 && s.yspeed != -1)) {
			s.dir(0, 1);
		}
		else if(keyCode === RIGHT_ARROW && (s.xspeed !=  -1 && s.yspeed != 0)) {
			s.dir(1, 0);
		}
		else if(keyCode === LEFT_ARROW && (s.xspeed !=  1 && s.yspeed != 0)) {
			s.dir(-1, 0);
		}
	}
}

function toccato(obstacle){
		if(obstacle.x === s.x || obstacle.y === s.y){
			obstacle.pickLocation();
		}
		else if(obstacle.x === food.x || obstacle.y === food.y){
			obstacle.pickLocation();
		}
		
}