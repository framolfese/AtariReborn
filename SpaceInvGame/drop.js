//file per i proiettili

//file relativo al bersaglio

function Drop(x, y) {
	this.x = x;
	this.y = y;
	this.r = 8; //raggio
	this.toDelete = false;


	this.show = function() {
		noStroke();
		fill(150, 0, 255);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

	this.evaporate = function() {
		this.toDelete = true;
	}

	this.move = function() {
		this.y = this.y - 5;

	}

	this.hits = function(target) {
		var d = dist(this.x, this.y, target.x, target.y);
		if(d < this.r + target.r) {
			return true;
		}
		else{
			return false;
		}
	}
}