 /*
 * @name Simple Draw
 * @description Touch to draw on the screen using mouseX, mouseY, pmouseX, and pmouseY values.
 */

function setup() {
  createCanvas(displayWidth, displayHeight);
  strokeWeight(2);
  stroke ('pink'); 

}

function touchMoved() {
  line(mouseX, mouseY, pmouseX, pmouseY);
  return false;
}