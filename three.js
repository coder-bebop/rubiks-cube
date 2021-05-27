import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";

"use strict";

let renderer, scene, camera, cameraControls, mesh;

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
	camera.position.set(0, 0, 3);
	cameraControls = new OrbitControls(camera, renderer.domElement);

	let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({color: "white", wireframe: true});
    mesh = new THREE.Mesh(geometry, material);

	scene.add(mesh);

	renderLoop();
}

function renderLoop() {
	renderer.render(scene, camera);
	requestAnimationFrame(renderLoop);
}

function renderMove(move) {
	console.log(move);
}

document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", function() {
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
    camera.aspect = window.innerWidth * 0.8 / window.innerHeight;
    camera.updateProjectionMatrix();
});

export { renderMove };
