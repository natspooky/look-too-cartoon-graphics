forwardStep = 100
angleStep = 0.3

function Lsys() {
	this.rules = new Map()
	this.system = ""
	
	this.addRule = (inp, out) => { this.rules.set(inp, out) }
	this.setSys = (s) => { this.system = s }
	
	this.iterate = (n = 1) => {
		for (let j = 0; j < n; j++) {
			let newSys = ""
			for ( let i = 0; i < this.system.length; i++ ) {
				if ( this.rules.has(this.system[i]) ) {
					newSys += this.rules.get(this.system[i])
				} else {
					newSys += this.system[i]
				}
			}
			this.system = newSys
		}
	}
	
	this.draw = () => {
		this.system.split("").map( (x) => { if ( kws[x] != undefined) {kws[x]()} } ) 
	}
	
}


s = new Lsys()

s.addRule("A", "ss+F+F+F[---B][A]")
s.addRule("B", "ssF-F-F-[+++A][B]")
s.setSys("FF--A")

const kws = { 
	"[": () => {push()},
	"]": () => {pop()},
	"J": () => {ellipse(0,0,10)},
	"F": () => {line(0,0,0,-forwardStep); translate(0,-forwardStep)},
	"f": () => {translate(0,-forwardStep)},
	"+": () => {rotate(angleStep)},
	"-": () => {rotate(-angleStep)},
	"s": () => {scale(0.9)},
}
	

function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeWeight(7)
	background(255);
	s.iterate(10)
	s.draw()
}

function draw() {
	translate(width/2, height)
	background(255)
	angleStep = mouseX / width
	forwardStep = 100 * mouseY / height 
	s.draw()
}
