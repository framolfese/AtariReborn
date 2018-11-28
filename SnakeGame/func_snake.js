var s;
var squares = []; //ostacolo quadrato
var scl = 20; // sta per "scala", ovvero la misura del singolo quadratino di snake
var food; //cibo che lo snake dovrà mangiare
var messaggiofine;
var gameover = false;
var canvas;

function setup() {
	if(!gameover){
		canvas = createCanvas(scl*48, scl*42);
		canvas.parent('canvas-holder');
		s = new Snake();
		for(var i = 0; i < 10; i++){
			squares[i] = new Square();
		}
		frameRate(10);
		pickLocation();
	}
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

function draw() {
	if(!gameover){
		background(0);

		if(s.eat(food)) {
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
		canvas = createCanvas(scl*48, scl*42);
		canvas.parent('canvas-holder');
		background(0);
		messaggiofine = createElement('h2', 'GAME OVER');
		messaggiofine.position(windowWidth/9 * 2,windowHeight/2 - 80);
		messaggiofine.style('font-size', '50px');
		messaggiofine.style('color', '#dc3545');
		noLoop();
	}
}

function keyPressed() {
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

function toccato(obstacle){
	while(1){
		if(obstacle.x === s.x || obstacle.y === s.y){
			obstacle.pickLocation();
		}
		else if(obstacle.x === food.x || obstacle.y === food.y){
			obstacle.pickLocation();
		}
		else{
			break;
		}
	}
}