document.addEventListener("DOMContentLoaded", () => {

  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const bigint = parseInt(hex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = (r, g, b) => {
    const toHex = (c) => c.toString(16).padStart(2, '0');
    return '#' + toHex(r) + toHex(g) + toHex(b);
  };

  const easeInOutQuad = (x) => x < 0.5 ? 2*x*x : 1 - Math.pow(-2*x + 2, 2)/2;

  const blendColors = (c1Hex, c2Hex, t) => {
    t = Math.min(Math.max(t, 0), 1);
    const tEased = easeInOutQuad(t);
    const c1 = hexToRgb(c1Hex);
    const c2 = hexToRgb(c2Hex);

    const r = Math.round(c1[0] + (c2[0] - c1[0]) * tEased);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * tEased);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * tEased);

    return rgbToHex(r, g, b);
  };

  const setupSeasonColorTransition = (containerId, startColor, endColor) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const body = document.body;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const viewportH = window.innerHeight;

          // Transition occurs during the first viewport height scroll between sections
          let progress = scrollY / viewportH;
          progress = Math.min(Math.max(progress, 0), 1);

          const blended = blendColors(startColor, endColor, progress);
          if (body.style.backgroundColor !== blended) {
            body.style.backgroundColor = blended;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    body.style.backgroundColor = startColor;
    window.addEventListener('scroll', onScroll);
  };

  setupSeasonColorTransition('springSummerPage', '#ffafbd', '#ffefba');
  setupSeasonColorTransition('fallWinterPage', '#ff9966', '#a1c4fd');


  const quizForm = document.getElementById('seasonQuiz');
  const quizResultDiv = document.getElementById('quizResult');

  if (quizForm && quizResultDiv) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(quizForm);
      const weather = formData.get('weather');
      const color = formData.get('color');

      const seasonCounts = { spring: 0, summer: 0, fall: 0, winter: 0 };

      if (weather && seasonCounts.hasOwnProperty(weather)) seasonCounts[weather]++;
      if (color && seasonCounts.hasOwnProperty(color)) seasonCounts[color]++;

      let maxCount = -1;
      let favoriteSeason = null;
      Object.entries(seasonCounts).forEach(([season, count]) => {
        if (count > maxCount) {
          maxCount = count;
          favoriteSeason = season;
        }
      });

      const messages = {
        spring: "You bloom with Spring: gentle, hopeful, and full of new beginnings.",
        summer: "You shine with Summer: radiant, warm, and full of vibrant life.",
        fall: "You glow with Fall: thoughtful, cozy, and rich with transformation.",
        winter: "You whisper with Winter: calm, introspective, and beautifully serene."
      };

      quizResultDiv.textContent = messages[favoriteSeason] || "Please answer all questions to discover your season.";
    });
  }

  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  const mouseIcons = {
    flower: 'cursor-flower',
    sun: 'cursor-sun',
    leaf: 'cursor-leaf',
    snowflake: 'cursor-snowflake'
  };

  let currentCursorType = null;

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const zoomElems = document.querySelectorAll('.zoom-hover');

  zoomElems.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      const type = elem.getAttribute('data-mouse');
      if (type && mouseIcons[type]) {
        cursor.className = 'custom-cursor ' + mouseIcons[type];
        currentCursorType = type;
      }
    });
    elem.addEventListener('mouseleave', () => {
      cursor.className = 'custom-cursor';
      currentCursorType = null;
    });
  });

});

/*
 * @name Kaleidoscope
 * @arialabel User draws thick black lines on the grey background and it is mirrored 5 times in a circle like a kaleidoscope
 * @description A kaleidoscope is an optical instrument with two or more reflecting surfaces tilted to each other in an angle. This example tries to replicate the behavior of a kaleidoscope. Set the number of reflections at the symmetry variable and start drawing on the screen. Paste the below code in the <a href="https://editor.p5js.org/"> Editor </a> and click on the save button if you wish to download a .jpg file of the art that you have created.
 */
// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 6;   

let angle = 360 / symmetry;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;

function setup() { 
  createCanvas(710, 710);
  angleMode(DEGREES);
  background(127);
  stroke(0,0,255);


  // Creating the save button for the file
  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);

  // Creating the clear screen button
  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);

  // Creating the button for Full Screen
  fullscreenButton = createButton('Full Screen');
  fullscreenButton.mousePressed(screenFull);

  // Setting up the slider for the thickness of the brush
  brushSizeSlider = createButton('Brush Size Slider');
  sizeSlider = createSlider(1, 32, 4, 0.1);
}

// Save File Function
function saveFile() {
  save('design.jpg');
}

// Clear Screen function
function clearScreen() {
  background(127);
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function draw() {
  translate(width / 4, height / 3);


  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 3;
    let my = mouseY - height / 3;
    let pmx = pmouseX - width / 3;
    let pmy = pmouseY - height / 3;
    
    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = sizeSlider.value();
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}