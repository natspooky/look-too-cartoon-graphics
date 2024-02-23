const BGRES = 100

function setup() {
	cn = createCanvas(windowWidth, windowHeight);
  cn.parent("bg")
	background(COLS[0])
  fill(COLS[1])
}


async function framerateLoop() {
  let oldTimer = performance.now(),
  delta = 0,
  frameRate = 1000 / 30
  while (true) {
    let newTimer = await new Promise(requestAnimationFrame)
    if(newTimer - oldTimer < frameRate - delta) {
          continue;
    }
    delta = Math.min(frameRate, delta + newTimer - oldTimer - frameRate)
    oldTimer = newTimer

    create()

  }
}



function create() {
	for (let i = 0; i < width / BGRES; i++) {
    for (let j = 0; j < height / BGRES; j++) {
      fill( noise( i, j, millis() / 10000.0) * 200 )
      rect( i * BGRES, j * BGRES, BGRES, BGRES)
    }
  }
}

window.addEventListener('load', function() {
  framerateLoop()
})