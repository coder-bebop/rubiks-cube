const moves = {
	U: "U",
	UP: "U'",
	D: "D",
	DP: "D'",
	R: "R",
	RP: "R'",
	L: "L",
	LP: "L'",
	F: "F",
	FP: "F'",
	B: "B",
	BP: "B'",
}

function createCube(size) {
	let cube = [[], [], [], [], [], []];
	for(let i = 0; i < 6; i++) {
		for(let j = 0; j < size; j++) {
			cube[i].push([]);
			for(let k = 0; k < size; k++) {
				cube[i][j].push(i);
			}
		}
	}
	return cube;
}

function printCube(cube) {
	console.log("----------\n");
	for(let i = 0; i < cube.length; i++) {
		let side = cube[i];
		for(let j = 0; j < side.length; j++) {
			let str = "";
			for(let k = 0; k < side[j].length; k++) {
				str += side[j][k];
			}
			console.log(str);
		}
		console.log();
	}
	console.log("----------\n");
}

function doMove(cube, move) {
	console.log("Move: ", move);
	history.push(move);
	const size = cube[0].length - 1;
	let temp;
	switch(move) {
		case moves.U:
			cube[4] = rotateClockwise(cube[4]);
			temp = cube[0][0];
			cube[0][0] = cube[1][0];
			cube[1][0] = cube[2][0];
			cube[2][0] = cube[3][0];
			cube[3][0] = temp;
			break;
		case moves.UP:
			cube[4] = rotateCounterClockwise(cube[4]);
			temp = cube[0][0];
			cube[0][0] = cube[3][0];
			cube[3][0] = cube[2][0];
			cube[2][0] = cube[1][0];
			cube[1][0] = temp;
			break;
		case moves.D:
			cube[5] = rotateClockwise(cube[5]);
			temp = cube[0][size];
			cube[0][size] = cube[3][size];
			cube[3][size] = cube[2][size];
			cube[2][size] = cube[1][size];
			cube[1][size] = temp;
			break;
		case moves.DP:
			cube[5] = rotateCounterClockwise(cube[5]);
			temp = cube[0][size];
			cube[0][size] = cube[1][size];
			cube[1][size] = cube[2][size];
			cube[2][size] = cube[3][size];
			cube[3][size] = temp;
			break;
		case moves.R:
			cube[1] = rotateClockwise(cube[1]);
			temp = getColumn(cube[0], size);
			setColumn(cube[0], size, getColumn(cube[5], size));
			setColumn(cube[5], size, getColumn(cube[2], 0).reverse());
			setColumn(cube[2], 0, getColumn(cube[4], size).reverse());
			setColumn(cube[4], size, temp);
			break;
		case moves.RP:
			cube[1] = rotateCounterClockwise(cube[1]);
			temp = getColumn(cube[0], size);
			setColumn(cube[0], size, getColumn(cube[4], size));
			setColumn(cube[4], size, getColumn(cube[2], 0).reverse());
			setColumn(cube[2], 0, getColumn(cube[5], size).reverse());
			setColumn(cube[5], size, temp);
			break;
		case moves.L:
			cube[3] = rotateClockwise(cube[3]);
			temp = getColumn(cube[0], 0);
			setColumn(cube[0], 0, getColumn(cube[4], 0));
			setColumn(cube[4], 0, getColumn(cube[2], size).reverse());
			setColumn(cube[2], size, getColumn(cube[5], 0).reverse());
			setColumn(cube[5], 0, temp);
			break;
		case moves.LP:
			cube[3] = rotateCounterClockwise(cube[3]);
			temp = getColumn(cube[0], 0);
			setColumn(cube[0], 0, getColumn(cube[5], 0));
			setColumn(cube[5], 0, getColumn(cube[2], size).reverse());
			setColumn(cube[2], size, getColumn(cube[4], 0).reverse());
			setColumn(cube[4], 0, temp);
			break;
		case moves.F:
			cube[0] = rotateClockwise(cube[0]);
			temp = cube[4][size];
			cube[4][size] = getColumn(cube[3], size).reverse();
			setColumn(cube[3], size, cube[5][0]);
			cube[5][0] = getColumn(cube[1], 0).reverse();
			setColumn(cube[1], 0, temp);
			break;
		case moves.FP:
			cube[0] = rotateCounterClockwise(cube[0]);
			temp = cube[4][size];
			cube[4][size] = getColumn(cube[1], 0);
			setColumn(cube[1], 0, cube[5][0].slice().reverse());
			cube[5][0] = getColumn(cube[3], size);
			setColumn(cube[3], size, temp.slice().reverse());
			break;
		case moves.B:
			cube[2] = rotateClockwise(cube[2]);
			temp = cube[4][0];
			cube[4][0] = getColumn(cube[1], size);
			setColumn(cube[1], size, cube[5][size].slice().reverse());
			cube[5][size] = getColumn(cube[3], 0);
			setColumn(cube[3], 0, temp.slice().reverse());
			break;
		case moves.BP:
			cube[2] = rotateCounterClockwise(cube[2]);
			temp = cube[4][0];
			cube[4][0] = getColumn(cube[3], 0).reverse();
			setColumn(cube[3], 0, cube[5][size]);
			cube[5][size] = getColumn(cube[1], size).reverse();
			setColumn(cube[1], size, temp);
			break;
		default:
			console.log("ERROR: invalid move");
	}
	printCube(cube);
	if(isSolved(cube)) {
		win();
	}
	return cube;
}

function isSolved(cube) {
	const size = cube[0].length;
	for(let i = 0; i < 6; i++) {
		for(let j = 0; j < size; j++) {
			for(let k = 0; k < size; k++) {
				if(cube[i][j][k] != i) {
					return false;
				}
			}
		}
	}
	return true;
}

function win() {
	console.log("!!!!!!!!!!");
	console.log("The cube is solved.");
	console.log("!!!!!!!!!!");
	console.log("Move history:");
	printHistory();
}

function shuffle(cube) {
	const moves = 100;
	for(let i = 0; i < 100; i++) {
		cube = doMove(cube, getRandomMove());
	}
	history = [];
	return cube;
}

function rotateClockwise(a) {
	var n=a.length;
	for (var i=0; i<n/2; i++) {
		for (var j=i; j<n-i-1; j++) {
			var tmp=a[i][j];
			a[i][j]=a[n-j-1][i];
			a[n-j-1][i]=a[n-i-1][n-j-1];
			a[n-i-1][n-j-1]=a[j][n-i-1];
			a[j][n-i-1]=tmp;
		}
	}
	return a;
}

function rotateCounterClockwise(a) {
	var n=a.length;
	for (var i=0; i<n/2; i++) {
		for (var j=i; j<n-i-1; j++) {
			var tmp=a[i][j];
			a[i][j]=a[j][n-i-1];
			a[j][n-i-1]=a[n-i-1][n-j-1];
			a[n-i-1][n-j-1]=a[n-j-1][i];
			a[n-j-1][i]=tmp;
		}
	}
	return a;
}

function getColumn(a, n) {
	let res = [];
	const size = a.length;
	for(let i = 0; i < size; i++) {
		res.push(a[i][n]);
	}
	return res;
}

function setColumn(a, n, col) {
	const size = a.length;
	for(let i = 0; i < size; i++) {
		a[i][n] = col[i];
	}
	return a;
}

function getRandomMove() {
    const keys = Object.keys(moves);
    return moves[keys[keys.length * Math.random() << 0]];
};

function printHistory() {
	let str = "";
	for(let i = 0; i < history.length; i++) {
		str += (history[i] + ", ")
	}
	console.log(str.substring(0, str.length - 2));
}

let cube = createCube(3);
let history = [];

printCube(cube);
shuffle(cube);
doMove(cube, moves.UP);
printHistory();
