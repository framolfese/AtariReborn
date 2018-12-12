function Square(img) {
	this.x = 0;
    this.y = 0;
    this.img = img;
    
    this.show = function() {
        rectMode(CORNER);
        noFill();
        noStroke();
        imageMode(CENTER);
        image(this.img, this.x + 20, this.y + 20, 60, 60);
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