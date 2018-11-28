function Square() {
	this.x = 0;
	this.y = 0;
    
    this.show = function() {
		fill(255, 100, 0);
		rect(this.x, this.y, scl*2, scl*2);
    }
    
    this.pickLocation = function() {
        var cols = floor(width/scl);
        var rows = floor(height/scl); 
        this.x = floor(random(cols)) * scl;
        this.y = floor(random(rows)) * scl;
        this.x = constrain(this.x, 0, width-scl*2);
        this.y = constrain(this.y, 0, height-scl*2);
    }
}