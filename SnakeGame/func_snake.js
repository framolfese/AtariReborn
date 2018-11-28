var s;
var scl = 20; // sta per "scala", ovvero la misura del singolo quadratino di snake
var food; //cibo che lo snake dovrà mangiare
/*var ostacolo1;
var ostacolo2;
var ostacolo3;
var ostacolo4;*/
var messaggiofine;
var gameover = false;
var canvas;

function setup() {
	if(!gameover){
		canvas = createCanvas(scl*48, scl*42);
		canvas.parent('canvas-holder');
		s = new Snake();
		frameRate(10);
		pickLocation();
	}
}


function pickLocation() {
	var cols = floor(width/scl); //valori random per determinare posizione food
	var rows = floor(height/scl); 
	/*var cols_obstacle = floor(width/(scl+5));
	var rows_obstacle = floor(height/(scl+5));*/
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
	/*ostacolo1 = createVector(floor(random(cols_obstacle)), floor(random(rows_obstacle)));
	ostacolo1.mult(scl);
	ostacolo2 = createVector(floor(random(cols_obstacle)), floor(random(rows_obstacle)));
	ostacolo2.mult(scl);
	ostacolo3 = createVector(floor(random(cols_obstacle)), floor(random(rows_obstacle)));
	ostacolo3.mult(scl);
	ostacolo4 = createVector(floor(random(cols_obstacle)), floor(random(rows_obstacle)));
	ostacolo4.mult(scl);*/
}

function draw() {
	if(!gameover){
		background(0);

		if(s.eat(food)) {
			pickLocation();
		}
		/*if(s.hit(ostacolo1, ostacolo2, ostacolo3, ostacolo4)){
			s.death();
			gameover = true;
		}*/
		if(s.death()){
			gameover = true;
		}
		
		s.update();
		s.show();
		s.hitEdge();
		

		fill(255, 0, 100);
		rect(food.x, food.y, scl, scl);
		/*fill(255, 100, 0);
		for(var i = 0; i < 5; i++){
			rect(ostacolo1.x + scl*i, ostacolo1.y + scl*i, scl, scl);
			rect(ostacolo2.x + scl*i, ostacolo2.y + scl*i, scl, scl);
			rect(ostacolo3.x + scl*i, ostacolo3.y + scl*i, scl, scl);
			rect(ostacolo4.x + scl*i, ostacolo4.y + scl*i, scl, scl);
		}*/
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