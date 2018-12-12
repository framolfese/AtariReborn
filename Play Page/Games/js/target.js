//file relativo al bersaglio

function Target(x, y, xdir) {
	this.x = x;
	this.y = y;
	this.r = 30;
	this.toDelete = false;

	this.xdir = xdir;

	this.grow = function() {
		this.r = this.r + 2;
	}

	this.evaporate = function() {
		this.toDelete = true;
	}

	this.shiftDown = function() {
		this.xdir *= -1;
		this.y += 40;
	}

	this.move = function() {
		this.x = this.x + this.xdir;
	}

	this.show = function() {
		noStroke();
		fill(255, 0, 200);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

}