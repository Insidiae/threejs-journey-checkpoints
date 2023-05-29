import * as THREE from "three";

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x588dfd });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

/**
 * Positioning Objects
 */
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
//? Equivalent to:
// mesh.position.set(0.7, -0.6, 1);

/**
 * Scaling Objects
 */
// mesh.scale.x = 2;
// mesh.scale.y = 0.25;
// mesh.scale.z = 0.5;
//? Equivalent to:
// mesh.scale.set(2, 0.25, 0.5);

/**
 * Rotating Objects - Using `rotation`
 */
// mesh.rotation.reorder("YXZ");
// mesh.rotation.y = Math.PI / 4;
// mesh.rotation.x = Math.PI / 4;

/**
 * Rotating Objects - Using `quaternion`
 */
//? not covered in the lesson, but remember that
//? setting `rotation` will also set `quaternion`!

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Grouping Objects
 */
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0x58fd8d })
);

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xfd588d })
);
cube2.position.x = -2;

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0x588dfd })
);
cube3.position.x = 2;

group.add(cube1, cube2, cube3);
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;

/**
 * Sizes
 */
const sizes = {
	width: 800,
	height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.x = 1;
// camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

/**
 * "Looking at" objects
 */
// camera.lookAt(mesh.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
