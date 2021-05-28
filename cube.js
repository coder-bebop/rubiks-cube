import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";

"use strict";

let renderer, scene, camera, cameraControls;
let dimensions, f0, f1, f2, f3, f4, f5;
let rotationQ = [];
let currentRotation, rotationCounter = 0, rotating = false, front;

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

	rubik(dimensions, f0, f1, f2, f3, f4, f5);

	renderLoop();
}

function renderLoop() {
	renderer.render(scene, camera);
	if(rotationQ.length > 0) {
		rotateFace(rotationQ[0]);
	}
	requestAnimationFrame(renderLoop);
}

function renderMove(move) {
	console.log(move);
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

	front = [];
	let c;
	let offset = (dimensions - 1) / 2;
	for(let i = 0; i < dimensions; i ++) {
		for(let j = 0; j < dimensions; j ++) {
			for(let k = 0; k < dimensions; k ++) {
				let x = (i - offset) * increment,
					y = (j - offset) * increment,
					z = (k - offset) * increment;

				c = newCube(x, y, z);
				console.log(i, j, k);
				if(k == dimensions - 1) {
					front.push(c);
				}
			}
		}
	}
	addRotation(front, true, "z", 5);
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
