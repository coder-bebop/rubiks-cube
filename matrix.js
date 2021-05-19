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
	printCube(cube)
}

let cube = createCube(10);
doMove(cube, moves.UP);