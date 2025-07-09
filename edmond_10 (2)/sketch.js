 /*
 * @name Bounce
 * @arialabel White circle moving on a grey background. When it hits the edge of the background window, it changes it’s direction 
 * @frame 720,400
 * @description When the shape hits the edge of the window, it reverses its direction.
 */

let rad = 20; // Width of the shape
let xpos, ypos; // Starting position of shape

let xspeed = 5.8; // Speed of the shape
let yspeed = 8.0; // Speed of the shape

let xdirection = 2; // Left or Right
let ydirection = 2; // Top to Bottom

function setup() {
  createCanvas(800, 200);
  noStroke();
  fill(255, 105, 180);
  background(230, 200, 255);
  frameRate(30);
  ellipseMode(RADIUS);
  // Set the starting position of the shape
  xpos = width / 5;
  ypos = height / 5;
}

function draw() {
  background(102);

  // Update the position of the shape
  xpos = xpos + xspeed * xdirection;
  ypos = ypos + yspeed * ydirection;

  // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1
  if (xpos > width - rad || xpos < rad) {
    xdirection *= -1;
  }
  if (ypos > height - rad || ypos < rad) {
    ydirection *= -1;
  }

  // Draw the shape
  ellipse(xpos, ypos, rad, rad);
}
