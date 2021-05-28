import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";

"use strict";

let renderer, scene, camera, cameraControls, cubeMesh;
let dimensions, f0, f1, f2, f3, f4, f5;

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

	let cubeMesh = [[], [], [], [], [], []];

	scene.add(new THREE.AmbientLight(0xffffff));

	rubik(dimensions, f0, f1, f2, f3, f4, f5);

	renderLoop();
}

function renderLoop() {
	renderer.render(scene, camera);
	requestAnimationFrame(renderLoop);
}

function renderMove(move) {
	console.log(move);
}

let cubes_array = [];

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
		cubes_array.push(cube);
	}

	let offset = (dimensions - 1) / 2;
	for(let i = 0; i < dimensions; i ++) {
		for(let j = 0; j < dimensions; j ++) {
			for(let k = 0; k < dimensions; k ++) {

			let x = (i - offset) * increment,
				y = (j - offset) * increment,
				z = (k - offset) * increment;

			newCube(x, y, z);
			}
		}
	}
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
