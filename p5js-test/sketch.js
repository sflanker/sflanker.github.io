
let fft;
let input;
let startButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  startButton = createButton('Start!');
  startButton.position(width / 2, height / 2);
  startButton.mousePressed(() => {
	fft = new p5.FFT();
	input = new p5.AudioIn();
	input.start();
	fft.setInput(input);
	input.start();
	startButton.remove();
  });
}

function draw() {
  background('black');
  if (fft && input) {
    let w = width / 2;
    drawSpectrumGraph(0, 0, w, height);
    drawWaveformGraph(w, 0, w, height);
  }
}

// Graphing code adapted from https://jankozeluh.g6.cz/index.html by Jan Koželuh
function drawSpectrumGraph(left, top, w, h) {
  let spectrum = fft.analyze();

  stroke('limegreen');
  fill('darkgreen');
  strokeWeight(1);

  beginShape();
  vertex(left, top + h);

  for (let i = 0; i < spectrum.length; i++) {
    vertex(
      left + map(log(i), 0, log(spectrum.length), 0, w),
      top + map(spectrum[i], 0, 255, h, 0)
    );
  }

  vertex(left + w, top + h);
  endShape(CLOSE);
}

function drawWaveformGraph(left, top, w, h) {
  let waveform = fft.waveform();

  stroke('limegreen');
  noFill();
  strokeWeight(1);

  beginShape();

  for (let i = 0; i < waveform.length; i++) {
    let x = map(i * 5, 0, waveform.length, 0, w);
    let y = map(waveform[i], -1, 2, h / 10 * 8, 0);
    vertex(left + x, top + y);
  }

  endShape();
}
