//file relativo alla navicella

function Ship() {
	this.x = width/2;
	this.y = height-10;
	this.xdir = 0;

	this.show = function() {
		fill(255);
		rectMode(CENTER);
		rect(this.x, this.y, 20, 20);
		
	}

	this.setDir = function(dir) {
		this.xdir = dir;
	}

	this.move = function(dir) {
		this.x += this.xdir*5; 
	}

	this.hitEdge = function() {
		if(this.x - 10 == width)
			this.x = 10;
		else if(this.x + 10 == 0)
			this.x = width - 10;
	}
}