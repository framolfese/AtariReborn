// aggiungere riferimento a questo file nel file html !! 
function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];

	this.dir = function(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	this.eat = function(pos) {
		var d = dist(this.x , this.y, pos.x, pos.y);
		if(d < scl) {
			this.total++;
			return true;
		}
		else{
			return false;
		}
	}

	/*this.hit = function(pos1, pos2, pos3, pos4){
		var d1 = dist(this.x , this.y, pos1.x, pos1.y);
		var d2 = dist(this.x , this.y, pos2.x, pos2.y);
		var d3 = dist(this.x , this.y, pos3.x, pos3.y);
		var d4 = dist(this.x , this.y, pos4.x, pos4.y);
		if((d1 < 1) || (d2 < 1) || (d3 < 1) || (d4 < 1)) {
			return true;
		}
		else{
			return false;
		}
	}*/
	this.hitEdge = function() {
		if(this.x + scl > width)
			this.x = 0;
		else if(this.x < 0)
			this.x = width;
		else if(this.y + scl > height)
			this.y = 0;
		else if(this.y < 0)
			this.y = height;
	}

	this.death = function() {
		for(var i = 0; i < this.tail.length; i++) {
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if(d < 1){
				this.total = 0;
				this.tail = [];
				return true;
			}
		}
	}

	this.update = function() {
		if(this.total === this.tail.length) {
			for (var i = 0; i < this.tail.length-1; i++) {
				this.tail[i] = this.tail[i+1];
			}
		}
		this.tail[this.total-1] = createVector(this.x, this.y);

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;
	}

	this.show = function() {
		fill(255);
		for (var i = 0; i < this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		rect(this.x, this.y, scl, scl);

	}
}