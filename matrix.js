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

let cube = createCube(3);
cube[0][0][0] = "x";
printCube(cube);
cube = doMove(cube, moves.FP);
