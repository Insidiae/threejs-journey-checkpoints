import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

/**
 * Cursor
 */
const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	//? `event.clientY`'s value goes up when the cursor moves *down*,
	//? so we'll need to invert its value in our calculations
	// cursor.y = -(event.clientY / sizes.height - 0.5);
	cursor.y = 0.5 - event.clientY / sizes.height;
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
	new THREE.MeshBasicMaterial({ color: 0x588dfd })
);
scene.add(mesh);

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1
// );
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const tick = () => {
	// camera.position.x = cursor.x * 3;
	// camera.position.x = Math.sin(2 * Math.PI * cursor.x) * 3;
	// camera.position.z = Math.cos(2 * Math.PI * cursor.x) * 3;
	// camera.position.y = cursor.y * 3;
	// camera.lookAt(mesh.position);

	// We need to `update()` the controls here if we set `enableDamping` or `autoRotate`
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
