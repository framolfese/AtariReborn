//avrò bisogno di tre strutture, una per la "navicella", una per gli elementi da colpire e l'altra per i colpi da sparare
var ship;
var targets = [];
var drops = [];

function setup() {
	createCanvas(600, 400);
	ship = new Ship();
	for(var i = 0; i < 6; i++){
		targets[i] = new Target(i*80+80, 60);
	}
}


function draw() {
	background(51);
	ship.show();
	ship.move();
	for(var i = 0; i < drops.length; i++){
		drops[i].show();
		drops[i].move();
		for(var j = 0; j < targets.length; j++){
			if(drops[i].hits(targets[j])){
				targets[j].grow();
				if(targets[j].r === 40){
					targets[j].evaporate();
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