import * as THREE from "three";

//* 01. Create a scene
const scene = new THREE.Scene();

//* 02. Display a blue cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x588dfd });
const mesh = new THREE.Mesh(geometry, material);
// Don't forget to add the mesh to your scene!
scene.add(mesh);

//* 03. Define sizes for the render
const sizes = {
	width: 800,
	height: 600,
};

//* 04. Add a camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 3;
scene.add(camera);

//* 05. Create a renderer
const canvas = document.querySelector<HTMLCanvasElement>(".webgl")!;
const renderer = new THREE.WebGLRenderer({
	canvas,
});
renderer.setSize(sizes.width, sizes.height);

//* 06. Render the scene!
renderer.render(scene, camera);
