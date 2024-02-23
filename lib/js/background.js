const BGRES = 100

function setup() {
	cn = createCanvas(windowWidth, windowHeight);
  cn.parent("bg")
	background(100);
}

function draw() {
	for (let i = 0; i < width / BGRES; i++) {
    for (let j = 0; j < height / BGRES; j++) {
      rect( i * BGRES, j * BGRES, BGRES, BGRES)
    }
  }
}