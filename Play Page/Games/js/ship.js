//file relativo alla navicella

function Ship(img) {
	this.x = width/2;
	this.y = height-10;
	this.xdir = 0;
	this.img = img;

	this.show = function() {
		noFill();
		rectMode(CENTER);
		imageMode(CENTER);
		image(this.img, this.x, this.y-10, 50, 50);
		rect(this.x, this.y, 20, 20);
	}

	this.setDir = function(dir) {
		this.xdir = dir;
	}

	this.move = function(dir) {
		this.x += this.xdir*10; 
	}

	this.hitEdge = function() {
		if(this.x - 10 == width)
			this.x = 10;
		else if(this.x + 10 == 0)
			this.x = width - 10;
	}
}