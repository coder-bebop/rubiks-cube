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
			break;
		case moves.DP:
			break;
		case moves.R:
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

let cube = createCube(3);
cube[4][0][1] = "X";
printCube(cube);
cube = doMove(cube, moves.UP);
