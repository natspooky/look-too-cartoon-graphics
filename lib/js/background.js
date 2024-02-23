const BGRES = 100

function setup() {
	cn = createCanvas(windowWidth, windowHeight);
  cn.parent("bg")
	background(COLS[0])
  fill(COLS[1])
  noStroke()
}

function draw() {
	for (let i = 0; i < width / BGRES; i++) {
    for (let j = 0; j < height / BGRES; j++) {
      fill( 
        ...hexToRgb(COLS[1]).map( (x) => x * noise( i, j, millis() / 10000.0) )
        )
      rect( i * BGRES, j * BGRES, BGRES, BGRES)
    }
  }
}