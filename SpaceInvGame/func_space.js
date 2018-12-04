//avrò bisogno di tre strutture, una per la "navicella", una per gli elementi da colpire e l'altra per i colpi da sparare
var ship;
var targets = [];
var drops = [];
var canvas;
var gameover = false;
var targets_killed = 0;

function setup() {
	canvas = createCanvas(20*48, 20*42);
	canvas.parent('canvas-holder');
	ship = new Ship();
	for(var i = 0; i < 6; i++){
		targets[i] = new Target(i*80+80, 60);
	}
}


function draw() {
	if(!gameover){
		background(0);
		ship.show();
		ship.move();
		ship.hitEdge();
		/*if(keyIsDown(ENTER)){
			var drop = new Drop(ship.x, height);
			drops.push(drop);
		}*/
		for(var i = 0; i < drops.length; i++){
			drops[i].show();
			drops[i].move();
			for(var j = 0; j < targets.length; j++){
				if(drops[i].hits(targets[j])){
					targets[j].grow();
					if(targets[j].r === 40){
						targets[j].evaporate();
						targets_killed++;
						/*if(targets_killed%6 == 0){
							for(var k = 0; k < targets.length; k++)
								targets[k].xdir += 1;
						}*/
					}
					drops[i].evaporate();
				}
			}
		}
		
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
			var t = [];
			for(var i = 0; i < 6; i++){
				t[i] = new Target(i*80+80, 60);
			}
			targets = concat(targets, t);
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
	}
	else if(gameover){
		canvas = createCanvas(20*48, 20*42);
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
	if(key === ' ') {
		var drop = new Drop(ship.x, height);
		drops.push(drop);
	}
	if(keyCode === RIGHT_ARROW) {
		ship.setDir(1);
	}
	else if(keyCode === LEFT_ARROW) {
		ship.setDir(-1);
	}
}

function keyReleased() {
	if(key != ' '){
		ship.setDir(0);
	}
}