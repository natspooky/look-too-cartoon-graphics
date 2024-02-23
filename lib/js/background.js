const BGRES = 100

function createcanva() {
	cn = document.createElement('canvas')
  cn.height = window.height
  cn.width = window.width
  contextCN = cn.getContext('2d')
  document.getElementById('bg').appendChild(cn)
}


async function framerateLoop() {
  let oldTimer = performance.now(),
  delta = 0,
  frameRate = 1000 / 60
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
	for (let i = 0; i < cn.width / BGRES; i++) {
    for (let j = 0; j < cn.height / BGRES; j++) {
      ctx.fillStyle = `${...hexToRgb(COLS[1]).map( (x) => x * noise( i, j, millis() / 5000.0) )}`
        )
      rect( i * BGRES, j * BGRES, BGRES, BGRES)
    }
  }
}

window.addEventListener('load', function() {
  createcanva()
  framerateLoop()
})