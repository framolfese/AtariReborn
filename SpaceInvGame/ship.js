//file relativo alla navicella

function Ship() {
	this.x = width/2;
	this.xdir = 0;

	this.show = function() {
		fill(255);
		rectMode(CENTER);
		rect(this.x, height-20, 20, 20);
		
	}

	this.setDir = function(dir) {
		this.xdir = dir;
	}

	this.move = function(dir) {
		this.x += this.xdir*5; 
	}

	this.hitEdge = function() {
		if(this.x + 20 > width)
			this.x = 0;
		else if(this.x < 0)
			this.x = width;
	}
}