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

	this.hit = function(obstacles){
		for(var i = 0; i < 10; i++){
			var pos = obstacles[i];
			var d1 = dist(this.x, this.y, pos.x, pos.y);
			var d2 = dist(this.x, this.y, pos.x+20, pos.y);
			var d3 = dist(this.x, this.y, pos.x, pos.y+20);
			var d4 = dist(this.x, this.y, pos.x+20, pos.y+20);
			if(d1 < 1 || d2 < 1 || d3 < 1 || d4 < 1){
				this.total = 0;
				this.tail = [];
				return true;
			}
		}
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
		rectMode(CORNER);
		fill(255);
		for (var i = 0; i < this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		rect(this.x, this.y, scl, scl);
	}
}