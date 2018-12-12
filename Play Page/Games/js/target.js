//file relativo al bersaglio

function Target(x, y, xdir, img) {
	this.x = x;
	this.y = y;
	this.r = 30;
	this.img = img;
	this.x_img = 80;
	this.y_img = 60;
	this.toDelete = false;

	this.xdir = xdir;

	this.grow = function() {
		this.x_img -= 10;
		this.y_img -= 10;
	}

	this.evaporate = function() {
		this.toDelete = true;
	}

	this.shiftDown = function() {
		this.xdir *= -1;
		this.y += 80;
	}

	this.move = function() {
		this.x = this.x + this.xdir;
	}

	this.show = function() {
		noStroke();
		noFill();
		imageMode(CENTER);
		image(this.img, this.x, this.y, this.x_img, this.y_img);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

}