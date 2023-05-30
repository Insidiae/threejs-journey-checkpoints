import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x588dfd });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });

// Animation
function tick() {
	//Clock
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	// mesh.rotation.y = elapsedTime * 2 * Math.PI;
	// mesh.position.x = Math.cos(elapsedTime);
	// mesh.position.y = Math.sin(elapsedTime);

	// You can update the camera as well!
	// camera.position.x = Math.cos(elapsedTime);
	// camera.position.y = Math.sin(elapsedTime);
	// camera.lookAt(mesh.position);

	// Render
	//? You'll still need to `render` when using external libraries!
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
}

tick();
