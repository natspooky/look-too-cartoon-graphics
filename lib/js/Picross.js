const COLS = [
	"#0088ba",
	"#f0f0f0"
]

// FILLMODES
const FULLEMPTY = 0
const EMPTYFULL = 1
const EMPTYCROSS = 2
const CROSSEMPTY = 3

// GRID STATES
const EMPTY = 0
const FULL = 1
const CROSS = 2

// higher the easier
const randThresh = 0.5
const noiseFreq = 1

function preload() {
	img = loadImage("icons/5x5.png")
}


function checkWin() {
	won = grid.every( (x, j) => x.every( (y, i) => sol[i][j] == (y % 2) ) )
	return won
}

function getListX(g) {
	return Array( g.length ).fill(0).map( (_, i) => g[i].join("").split(/[02]/).map( (x) => x.length ).filter( (x) => x > 0 ) )
}

function getListY(g) {
	return Array( g[0].length ).fill(0).map( (_, i) => g.map( (__, ind, a) => a[ind][i] ).join("").split(/[02]/).map( (x) => x.length ).filter( (x) => x > 0 ) )
}

function processImage() {
	grid = Array( img.height ).fill(0).map( (x) => Array(img.height).fill(EMPTY) ) 
	average = () => {
		let total = 0, count = 0
		for(let i = 0; i < img.height; i++) {
			for(let j = 0; j < img.width; j++) {
				let pix = img.get(j, i)
				total += (pix[0] * 0.3 + pix[1] * 0.59 + pix[2] * 0.11)
				count += 1
			}
		}
		return	total / count
	}
	thresh = average()
	sol = Array( img.height ).fill(0).map( (_, i) => Array(img.width).fill(0).map( (_, j) => {
		let pix = img.get(j, i)
		return int( (pix[0] * 0.3 + pix[1] * 0.59 + pix[2] * 0.11) > thresh )
	} ) )
	
}

function puzzleNoise(x, y) {
	return noise((x * 4) / size, (y * 4) / size)
}

function generateRandom() {
	let x = size
	let y = size
	grid = Array( x ).fill(0).map( (x) => Array( y ).fill(0) )
	sol = Array( x ).fill(0).map( (_, i) => Array(y).fill(0).map( (_, j) => int(puzzleNoise(i, j) < randThresh) ) )
}

function startGame() {
	c = createCanvas(1000, 1000)
	c.parent("Picross")
	canvas = document.getElementById('Picross').children[0]
	canvas.style.height = canvas.style.width = '50vh'
	won = false
	isImage ? processImage() : generateRandom()
	LISTY = getListX(sol)
	LISTX = getListY(sol)
	GRIDX = grid.length
	GRIDY = grid[0].length
	RES = height / (GRIDY + 2)
	WEIGHT = RES / 10
	gridlistx = Array( GRIDX ).fill([])
	gridlisty = Array( GRIDY ).fill([])
	currentFill = 0
	stroke(COLS[1])
	strokeWeight(WEIGHT)
	textSize( RES / 2 )
	textAlign(CENTER, CENTER)
	started = true
	checkWin()
}

function specialLerp(a, n, l1, l2) {
	let t = ((a + 1) / (n + 1))
	return l1 + ( l2 - l1 ) * t
}

function drawWin() {
	strokeWeight(0)
	for (let i = 0; i < GRIDX; i++) {
		for (let j = 0; j < GRIDY; j++) {
			fill( isImage ? img.get(i, j) : ( ( max(min( (puzzleNoise(i, j) - 0.5) * 2 + randThresh, 1),0) * 255) ) )
			rect( (i + 2) * RES + WEIGHT / 2, (j + 2) * RES + WEIGHT / 2, RES  - WEIGHT, RES  - WEIGHT)
		}
	}
}

function setup() { 
	started = false 
}

function drawGrid() {
	strokeWeight(0)
	for (let i = 0; i < GRIDX; i++) {
		if ( LISTX[i].length == 0 ) { 
			if (gridlistx[i].length == 0) {
				fill( COLS[1] )
			} else {
				fill( COLS[0] )
			}
			text("0", ( i + 2.5) * RES, RES) 
		} 
		else {
			for (let j = 0; j < LISTX[i].length; j++) {
				if ( LISTX[i][j] == gridlistx[i][j] ) { 
					fill( COLS[1] )
				} else {
					fill ( COLS[0] )
				}
				text( str(LISTX[i][j]), ( i + 2.5 ) * RES, specialLerp(j, LISTX[i].length, 0, 2 * RES) )
			}
		}
		
	}
	
	
	for (let i = 0; i < GRIDY; i++) {
		if ( LISTY[i].length == 0) { 
			if (gridlisty[i].length == 0) {
				fill( COLS[1] )
			} else {
				fill( COLS[0] )
			}
			text("0", RES, (i + 2.5) * RES) 
		} 
		else {
			for (let j = 0; j < LISTY[i].length; j++) {
				if ( LISTY[i][j] == gridlisty[i][j] ) { 
					fill( COLS[1] )
				} else {
					fill ( COLS[0] )
				}
				text( str(LISTY[i][j]), specialLerp(j, LISTY[i].length, 0, 1.8 * RES),  ( i + 2.5 ) * RES )
			}
		}
	}
	
	
	
	for (let i = 0; i < GRIDX; i++) {
		for (let j = 0; j < GRIDY; j++) {
			if ( grid[i][j] == EMPTY ) { continue }
			if ( grid[i][j] == FULL ) {
				strokeWeight(0)
				fill( COLS[grid[i][j] - 1] )
				rect( (i + 2) * RES + WEIGHT / 2, (j + 2) * RES + WEIGHT / 2, RES  - WEIGHT, RES  - WEIGHT)
			} else {
				strokeWeight(WEIGHT)
				line( (i + 2) * RES + WEIGHT * 2, (j + 2) * RES + WEIGHT * 2, ( i + 3 ) * RES - WEIGHT * 2, ( j + 3 ) * RES - WEIGHT * 2)
			}
			
		} 
	}
	
	strokeWeight(WEIGHT)
	
	for (let i = 0; i < GRIDY; i++) {
		line( 0.2 * RES, (2 + i) * RES, height - WEIGHT / 2, ( 2 + i ) * RES )
	}
	line( 0.2 * RES, height  - WEIGHT / 2, width, height - WEIGHT / 2 )
	
	for (let i = 0; i < GRIDX; i++) {
		line( (2 + i) * RES, 0.2 * RES, (2 + i) * RES, height - WEIGHT / 2)
	}
	line( width - WEIGHT / 2, 0.2 * RES, width - WEIGHT / 2, height - WEIGHT / 2 )
	
	
}

function draw() {
	if (!started) { return 0 }
	clear()
	if (mouseIsPressed && !won) { 
		let coord = getMouseGrid()
		if (coord != -1 ) {fillSquare(...coord, currentFill)}
	}
	drawGrid()
	won && drawWin(isImage)
}


function mousePressed() {
	if (!started) { return 0 }
	if (won) {return 0}
	let coord = getMouseGrid()
	if (coord != -1){
		let val = grid[coord[0]][coord[1]]
		if (mouseButton === RIGHT) {
			if (val == EMPTY) {
				currentFill = EMPTYCROSS
			} else {
				currentFill = CROSSEMPTY
			}
		} else {
			if (val == EMPTY) {
				currentFill = EMPTYFULL
			} else if (val == FULL) {
				currentFill = FULLEMPTY
			}
		}
	} else {
		currentFill = 0
	}
}


/*
function rightClick() {
	if (!started) { return 0 }
	if (won) {return 0}
	fillSquare(2)
}
*/

function fillSquare(x, y, fill) {
	let coord = getMouseGrid()
	if (coord != -1) {
		let val = grid[coord[0]][coord[1]]
		switch (currentFill) {
			case FULLEMPTY:
				if ( val == FULL ) {
					grid[coord[0]][coord[1]] = EMPTY
				}
				break
			case EMPTYFULL:
				if ( val == EMPTY ) {
					grid[coord[0]][coord[1]] = FULL
				}
				break
			case EMPTYCROSS:
				if ( val == EMPTY ) {
					grid[coord[0]][coord[1]] = CROSS
				}
				break
			case CROSSEMPTY:
				if ( val == CROSS ) {
					grid[coord[0]][coord[1]] = EMPTY
				}
				break
		}
	} 
	if (checkWin() && gallery) {
		// micheal code <<<<<
	}
	gridlistx = getListX(grid)
	gridlisty = getListY(grid)
}
/*
function mouseDragged() {
	let c = int( mouseButton === RIGHT )
	if (!started) { return 0 }
	if (won) {return 0}
	let coord = getMouseGrid()
	if (coord != -1) { 
		let val = grid[coord[0]][coord[1]]
		if (val == 0) {
			grid[coord[0]][coord[1]] = 1 + c 
		}
	}
	if ( !c ) {
		gridlistx = getListX(grid)
		gridlisty = getListY(grid)
	}
}
*/

function getMouseGrid() {
	let x = 0 | (mouseX / RES)
	let y = 0 | (mouseY / RES)
	if ( x < 2 || x > GRIDX + 1 || y < 2 || y > GRIDY + 1 ) {return -1}
	return [ x - 2, y - 2]
}