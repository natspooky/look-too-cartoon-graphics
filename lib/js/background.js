const BGRES = 100

const s = p => {

  p.setup = function() {
    let x = p.createCanvas(windowWidth, windowHeight);
    x.parent('bg')
  };

  p.draw = function() {
    for (let i = 0; i < cn.width / BGRES; i++) {
      for (let j = 0; j < cn.height / BGRES; j++) {
        p.fill(...hexToRgb(COLS[1]).map( (x) => x * noise( i, j, millis() / 5000.0) ))
        rect( i * BGRES, j * BGRES, BGRES, BGRES)
      }
    }
  };
};

new p5(s);
