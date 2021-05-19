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
	const size = cube[0].length - 1;
	switch(move) {
		case moves.U:
			cube[4] = rotateClockwise(cube[4]);
			const temp = cube[0][0];
			cube[0][0] = cube[1][0];
			cube[1][0] = cube[2][0];
			cube[2][0] = cube[3][0];
			cube[3][0] = temp;
			break;
		case moves.UP:
			cube[4] = rotateCounterClockwise(cube[4]);
			const temp = cube[0][0];
			cube[0][0] = cube[3][0];
			cube[3][0] = cube[2][0];
			cube[2][0] = cube[1][0];
			cube[1][0] = temp;
			break;
		case moves.D:
			cube[5] = rotateClockwise(cube[5]);
			const temp = cube[0][size];
			cube[0][size] = cube[3][size];
			cube[3][size] = cube[2][size];
			cube[2][size] = cube[1][size];
			cube[1][size] = temp;
			break;
		case moves.DP:
			cube[5] = rotateCounterClockwise(cube[5]);
			const temp = cube[0][size];
			cube[0][size] = cube[1][size];
			cube[1][size] = cube[2][size];
			cube[2][size] = cube[3][size];
			cube[3][size] = temp;
			break;
		case moves.R:
			cube[1] = rotateCounterClockwise(cube[1]);
			break;
		case moves.RP:
			break;
		case moves.L:
			break;
		case moves.LP:
			break;
		case moves.F:
			break;
		case moves.FP:
			break;
		case moves.B:
			break;
		case moves.BP:
			break;
		default:
			console.log("ERROR: invalid move");
	}
	printCube(cube);
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

function rotateCounterClockwise(a){
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
	const size = a.length - 1;
	for(let i = 0; i < size; i++) {
		res.push(a[i][n]);
	}
	return res;
}

function setColumn(a, n, col) {
	const size = a.length - 1;
	for(let i = 0; i < size; i++) {
		a[i][n] = col[i];
	}
	return a;
}

let cube = createCube(3);
cube[5][0][1] = "X";
printCube(cube);
cube = doMove(cube, moves.DP);
