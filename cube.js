import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";

"use strict";

let renderer, scene, camera, cameraControls;
let dimensions, f0, f1, f2, f3, f4, f5;
let rotationQ = [];
let currentRotation, rubiksMesh, rotationCounter = 0, rotating = false;

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

THREE.Object3D.prototype.rotateAroundWorldAxis = function() {
    var q = new THREE.Quaternion();

    return function rotateAroundWorldAxis( axis, angle ) {
        q.setFromAxisAngle( axis, angle );

        this.applyQuaternion( q );

        this.position.sub( new THREE.Vector3(0, 0, 0) );
        this.position.applyQuaternion( q );
        this.position.add( new THREE.Vector3(0, 0, 0) );

        return this;
    }
}();

function init() {
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
	document.getElementById("cube").appendChild(renderer.domElement);

	scene = new THREE.Scene();

	let fov = 60;
	let aspect = window.innerWidth * 0.8 / window.innerHeight;
	let near = 0.1;
	let far = 10000;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 0, 20);
	cameraControls = new OrbitControls(camera, renderer.domElement);

	scene.add(new THREE.AmbientLight(0xffffff));

	rubiksMesh = createMesh();
	rubik(dimensions, f0, f1, f2, f3, f4, f5);

	renderLoop();
}

function createMesh() {
	rubiksMesh = [[], [], [], [], [], []];
	for(let i = 0; i < 6; i++) {
		for(let j = 0; j < dimensions; j++) {
			rubiksMesh[i].push([]);
			for(let k = 0; k < dimensions; k++) {
				rubiksMesh[i][j].push(0);
			}
		}
	}
	return rubiksMesh;
}

function renderLoop() {
	renderer.render(scene, camera);
	if(rotationQ.length > 0) {
		rotateFace(rotationQ[0]);
	}
	requestAnimationFrame(renderLoop);
}

function renderMove(move) {
	const size = dimensions - 1;
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
}

function rubik(dimensions, f0, f1, f2, f3, f4, f5) {
	let colours = [f1, f3, f4, f5, f0, f2];
	let faceMaterials = colours.map(function(c) {
		return new THREE.MeshBasicMaterial({ color: c });
	});

	let cubeSize = 3;
	let spacing = 0.25;

	let increment = cubeSize + spacing;

	function newCube(x, y, z) {
		let cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
		let cube = new THREE.Mesh(cubeGeometry, faceMaterials);

		cube.position.set(x, y, z);
		cube.rubikPosition = cube.position.clone();

		scene.add(cube);
		return cube;
	}

	let c;
	let offset = (dimensions - 1) / 2;
	for(let i = 0; i < dimensions; i ++) {
		for(let j = 0; j < dimensions; j ++) {
			for(let k = 0; k < dimensions; k ++) {
				let x = (i - offset) * increment,
					y = (j - offset) * increment,
					z = (k - offset) * increment;

				c = newCube(x, y, z);
				let coords = getCoords(i, j, k);
				for(let m = 0; m < coords.length; m++) {
					addCube(c, coords[m][0], coords[m][1], coords[m][2])				
				}
			}
		}
	}
	// addRotation(front, true, "z", 5);
}

function getCoords(i, j, k) {
	let res = [];
	if(i == 0) {
		res.push([3, dimensions - j - 1, dimensions - k - 1]);
	} else if(i == dimensions - 1) {
		res.push([1, dimensions - j - 1, k]);
	}
	if(j == 0) {
		res.push([5, k, i]);
	} else if(j == dimensions - 1) {
		res.push([4, dimensions - k - 1, i]);
	}
	if(k == 0) {
		res.push([0, dimensions - j - 1, i]);
	} else if(k == dimensions - 1) {
		res.push([2, dimensions - j - 1, dimensions - i - 1]);
	}
	return res;
}

function addCube(cube, face, i, j) {
	rubiksMesh[face][i][j] = cube;
}

function addRotation(face, cw, axis, speed) {
	rotationQ.push({
		face: face,
		cw: cw,
		axis, axis,
		speed: speed,
	});
}

function rotateFace(rot) {
	if(rotating) {
		return;
	}

	rotating = true;
	currentRotation = setInterval(function() {
		if(rotationCounter < Math.PI / 2) {
			rotationCounter += Math.PI / 64;
			for(let i = 0; i < rot.face.length; i++) {
				let axis = new THREE.Vector3(1, 0, 0);
				switch(rot.axis) {
					case "y":
						axis = new THREE.Vector3(0, 1, 0);
						break;
					case "z":
						axis = new THREE.Vector3(0, 0, 1);
						break;
				}
				let sign = rot.cw ? -1 : 1
				rot.face[i].rotateAroundWorldAxis(axis, sign * Math.PI / 64);
			}
		} else {
			clearInterval(currentRotation);
			rotationQ.shift();
			rotating = false;
			rotationCounter = 0;
		}
	}, rot.speed);
}

function sendData(a, b, c, d, e, f, g) {
	dimensions = a;
	f0 = b;
	f1 = c;
	f2 = d;
	f3 = e;
	f4 = f;
	f5 = g;
}

document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", function() {
	renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
	camera.aspect = window.innerWidth * 0.8 / window.innerHeight;
	camera.updateProjectionMatrix();
});

export { renderMove, sendData };
