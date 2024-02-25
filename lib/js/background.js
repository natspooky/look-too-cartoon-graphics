const BGRES = 100

const s = p => {

  p.setup = function() {
    let x = p.createCanvas(windowWidth, windowHeight);
    x.parent('bg')
    p.strokeWeight(2)
    
    bgOffset = 0
  };

  p.draw = function() {
    p.noiseSeed(0)
    p.background(0)
    for (let i = -1; i < (windowWidth / BGRES) + 1; i++) {
      for (let j = 0; j < windowHeight / BGRES; j++) {
        p.fill(...hexToRgb(COLS[1]).map( (x) => x * ( 0.1 + 0.9 * noise( (i * BGRES + noise(j * 100) * 4 * (j % 2 ? -1 : 1) * (millis() / 1000) % BGRES) / BGRES, j, millis() / 50000.0) )))
        p.rect( i * BGRES + noise(j * 100) * 4 * (j % 2 ? -1 : 1) * (millis() / 1000) % BGRES , j * BGRES, BGRES, BGRES)
      }
    }  
  }; 
};
 
new p5(s);
