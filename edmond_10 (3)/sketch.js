 /*
 * @name Clock
 * @arialabel Functioning pink clock on a grey background
 * @description The current time can be read with the second(),
 * minute(), and hour() functions. In this example, sin() and
 * cos() values are used to set the position of the hands.
 */
let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  frameRate(500);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.50;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 2.0;
  clockDiameter = radius * 5.0;

  cx = width / 8;
  cy = height / 8;
}

function draw() {
  background(230);

  // Draw the clock background
  noStroke();
  fill(100, 149, 237);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(144, 238, 144);
  ellipse(cx, cy, clockDiameter, clockDiameter);
   

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 30, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 20), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 20), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(10);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
}
