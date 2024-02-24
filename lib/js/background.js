const BGRES = 100

const s = p => {

  p.setup = function() {
    let x = p.createCanvas(windowWidth, windowHeight);
    x.parent('bg')
    p.strokeWeight(0)
    p.noiseSeed(0)
  };

  p.draw = function() {
    p.background(0)
    for (let i = 0; i < windowWidth / BGRES; i++) {
      for (let j = 0; j < windowHeight / BGRES; j++) {
        p.fill(...hexToRgb(COLS[1]).map( (x) => x * noise( i, j, millis() / 10000.0) ))
        p.rect( i * BGRES, j * BGRES, BGRES, BGRES)
      }
    }
  }; 
};
 
new p5(s);
