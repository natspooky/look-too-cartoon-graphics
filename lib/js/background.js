const BGRES = 100

function setup() {
	cn = createCanvas(windowWidth, windowHeight);
  cn.parent("bg")
	background(COLS[0])
  fill(COLS[1])
}

function draw() {
	for (let i = 0; i < width / BGRES; i++) {
    for (let j = 0; j < height / BGRES; j++) {
      fill( noise( i, j, millis() / 10000.0) * 200 )
      rect( i * BGRES, j * BGRES, BGRES, BGRES)
    }
  }
}