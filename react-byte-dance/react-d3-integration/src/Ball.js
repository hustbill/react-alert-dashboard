// Ball object - multiple balls can be created by instantiating new objects
 class Ball {
     constructor(svg, x, y, id, color, aoa, weight) {
        this.posX = x; // cx
        this.posY = y; // cy
        this.color = color;
        this.radius = weight; // radius and weight same
        this.jumpSize = 1; // equivalent of speed default to 1
        this.svg = svg; // parent SVG
        this.id = id; // id of ball
        this.aoa = aoa; // initial angle of attack
        this.weight = weight;

        if (!this.aoa)
            this.aoa = Math.PI / 7;
        if (!this.weight)
            this.weight = 10;
        this.radius = this.weight;

        this.data = [this.id]; // allow us to use d3.enter()

        //var thisobj = this; // i like to use this instead of this. this many times not reliable particularly handling evnet

        // **** aoa is used only here -- earlier I was using to next move position.
        // Now aoa and speed together is velocity 
        this.vx = Math.cos(this.aoa) * this.jumpSize; // velocity x
        this.vy = Math.sin(this.aoa) * this.jumpSize; // velocity y
        this.initialVx = this.vx;
        this.initialVy = this.vy;
        this.initialPosX = this.posX;
        this.initialPosY = this.posY;
     }
 }