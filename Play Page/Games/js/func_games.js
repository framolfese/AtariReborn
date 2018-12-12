/*variabili snake*/
var s;
var squares = []; //ostacolo quadrato
var scl = 20; // sta per "scala", ovvero la misura del singolo quadratino di snake
var food; //cibo che lo snake dovrà mangiare
var last_command_time = Date.now();

/*variabili space*/
var ship;
var targets = [];
var drops = [];
var targets_killed = 0;
var target_da_uccidere = 4;
var speed_pos = 4;
var speed_neg = -1;

/*var comuni*/
var game = "nessuno";
var points = 0;
var played = false;
var interval;
var gameover = true;
var canvas;

function setup() {
	if(game == "snake"){
		console.log("entrato in setup snake");
		if(!gameover){
			s = new Snake();
			for(var i = 0; i < 10; i++){
				squares[i] = new Square();
			}
			frameRate(10);
			pickLocation();
			loop();
		}
	}
	else if(game == "space"){
		console.log("entrato in setup space");
		if(!gameover){
			ship = new Ship();
			for(var i = 0; i < target_da_uccidere; i++){
				targets[i] = new Target(i*80+40*i, 40, speed_pos);
			}
			frameRate(40);
			loop();
		}
	}
	
	console.log("entrato in setup base");
	canvas = createCanvas(scl*42, scl*37);
	canvas.parent('canvas-holder');
	background(0);
}

function draw() {
	if(game == "snake"){
		if(!gameover){
			console.log("snake partito");
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
				//invia dati a server per classifica
				sendValuesToServer();
				played = false;
			}
			console.log("gameover snake");
			noLoop();
		}
	}
	else if(game == "space"){
		if(!gameover){
			//console.log("space partito");
			background(0);
			ship.show();
			ship.move();
			ship.hitEdge();
			
			var edge = false; //vediamo se qualche target ha colpito il bordo di destra o di sinistra
		
			for(var i = 0; i < targets.length; i++){
				targets[i].show();
				targets[i].move();
				if(targets[i].x > width || targets[i].x < 0){
					edge = true;
				}
			}
		
			if(edge) {
				for(var i = 0; i < targets.length; i++){
					targets[i].shiftDown();
				}
				
			}

			for(var i = 0; i < drops.length; i++){
				drops[i].show();
				drops[i].move();
				for(var j = 0; j < targets.length; j++){
					if(drops[i].hits(targets[j])){
						for(var k=0; k<2; k++) targets[j].grow();
						if(targets[j].r === 38){
							points += 10;
							document.getElementById("span_points").innerText = points;
							targets[j].evaporate();
							targets_killed++;
						}
						drops[i].evaporate();
					}
				}
			}

			/* da vedere*/
			for(var i=0; i<targets.length; i++){				
				if(!targets[i].toDelete){
					var d = dist(targets[i].x, targets[i].y, ship.x, ship.y);
					console.log(d);
					if(d < 80) gameover = true;
					break;
				}
			}
		
			for(var i = targets.length-1; i >= 0; i--){
				if(targets[i].toDelete) {
					targets.splice(i, 1);
				}
			}
		
			for(var i = drops.length-1; i >= 0; i--){
				if(drops[i].toDelete) {
					drops.splice(i, 1);
				}
			}

			if(targets_killed == target_da_uccidere){
				targets_killed = 0;
				target_da_uccidere += 4;
				speed_pos += 0.2;
				speed_neg -= 0.2;
				for(var i = 0; i < target_da_uccidere / 4; i++){
					for(var j = 0; j < 4; j++){
						if(i%2 == 0) targets[4*i + j] = new Target(j*80+40*j, i*40+40 + 35*i, speed_pos);
						else targets[4*i + j] = new Target(width - ((4-j)*(80+40)), i*40+40 + 35*i, speed_neg);
					}
				}
			}
	
		}
		else if(gameover){
			remove
			canvas = createCanvas(scl*42, scl*37);
			canvas.parent('canvas-holder');
			background(0);
			if(played){
				//invia dati a server per classifica
				sendValuesToServer();
				played = false;
			}
			console.log("gameover space");
			noLoop();
		}
	}
	else{
		console.log(game);
		noLoop();
	}
}

function onhide(){
	console.log("entrato on hide");
	clearInterval(interval);
	gameover = true;
	var rows_ranking = $('.row_ranking');
	for(var i=0; i<rows_ranking.length; i++){
		$($(rows_ranking[i]).children()[1]).text("--");
		$($(rows_ranking[i]).children()[2]).text("--");
	}
}

function start(nameGame){
	console.log(nameGame + ' ' + game);
	game = nameGame;
	document.getElementById("span_points").innerText = '--';
	if(game == "snake") $('.img-table').attr('src','Games/images/header.jpg');
	else $('.img-table').attr('src','Games/images/space-invaders.jpg');
	$('#gameModal').modal('show');
	interval = setInterval(function(){
		var rows_ranking = $('.row_ranking');
		var ajaxRequest =$.ajax({
			type:"POST", 
			url:'http://localhost:8888/Progetto/Server/ranking.php',
			dataType:'json',
			data:{game:game}
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

function play(){
	if(game == "snake"){
		console.log("fatto play snake");
		document.getElementById("span_points").innerText = points;
		squares = [];
	}
	else if(game == "space"){
		console.log("fatto play space");
		target_da_uccidere = 4;
		targets_killed = 0;
		targets = [];
		drops = [];
	}
	points = 0;
	document.getElementById("span_points").innerText = points;
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
	}

	for(var i = 0; i < 10; i++){
		var d1 = dist(squares[i].x, squares[i].y, s.x, s.y)
		var d2 = dist(squares[i].x, squares[i].y, food.x, food.y)
		if(d1 < scl*2 || d2 < scl*2){
			squares[i].pickLocation();
		}
	}
	
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 10; j++){
			if(squares[i] != squares[j]){
				var d = dist(squares[i].x, squares[i].y, squares[j].x, squares[j].y)
				if(d < scl*3){
					squares[i].pickLocation();
				}
			}
		}
	}
}

function sendValuesToServer(){
	console.log("invia dati al server");
	var userInfo = sessionStorage.getItem("userInformation");
	userInfo = JSON.parse(userInfo);

	var ajaxRequest =$.ajax({
		type:'POST',
		url:'http://localhost:8888/Progetto/Server/insert_points.php',
		dataType:'json',
		data:{mail:userInfo.usermail, point:points, game:game}
	});

	ajaxRequest.done(function(return_data){ s
		if(!return_data.status) alert("Error with insert your score");
	});

	ajaxRequest.fail(function(return_data){
		alert("Error with server, please try again");
	});
}

function keyPressed() {
	if(game === "snake"){
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
	else if(game == "space"){
		if(key === ' ') {
			var drop = new Drop(ship.x, height - 40);
			drops.push(drop);
		}
		if(keyCode === RIGHT_ARROW) {
			ship.setDir(1);
		}
		else if(keyCode === LEFT_ARROW) {
			ship.setDir(-1);
		}
	}
}

function keyReleased() {
	if(game === "space"){
		if(key != ' '){
			ship.setDir(0);
		}
	}
}


