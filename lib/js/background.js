// animated tile background using a canvas


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
  
      // function
  
    }
}

