import * as React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, useTexture } from "@react-three/drei";

function App() {
	// const [
	// 	colorTexture,
	// 	alphaTexture,
	// 	heightTexture,
	// 	normalTexture,
	// 	ambientOcclusionTexture,
	// 	metalnessTexture,
	// 	roughnessTexture,
	// ] = useLoader(THREE.TextureLoader, [
	// 	"/textures/door/color.jpg",
	// 	"/textures/door/alpha.jpg",
	// 	"/textures/door/height.jpg",
	// 	"/textures/door/normal.jpg",
	// 	"/textures/door/ambientOcclusion.jpg",
	// 	"/textures/door/metalness.jpg",
	// 	"/textures/door/roughness.jpg",
	// ]);

	// Or:
	// const [
	// 	colorTexture,
	// 	alphaTexture,
	// 	heightTexture,
	// 	normalTexture,
	// 	ambientOcclusionTexture,
	// 	metalnessTexture,
	// 	roughnessTexture,
	// ] = useTexture([
	// 	"/textures/door/color.jpg",
	// 	"/textures/door/alpha.jpg",
	// 	"/textures/door/height.jpg",
	// 	"/textures/door/normal.jpg",
	// 	"/textures/door/ambientOcclusion.jpg",
	// 	"/textures/door/metalness.jpg",
	// 	"/textures/door/roughness.jpg",
	// ]);

	// Or:
	const {
		colorTexture,
		alphaTexture,
		heightTexture,
		normalTexture,
		ambientOcclusionTexture,
		metalnessTexture,
		roughnessTexture,
	} = useTexture({
		// colorTexture: "/textures/door/color.jpg",
		// colorTexture: "/textures/checkerboard-1024x1024.png",
		// colorTexture: "/textures/checkerboard-8x8.png",
		colorTexture: "/textures/minecraft.png",
		alphaTexture: "/textures/door/alpha.jpg",
		heightTexture: "/textures/door/height.jpg",
		normalTexture: "/textures/door/normal.jpg",
		ambientOcclusionTexture: "/textures/door/ambientOcclusion.jpg",
		metalnessTexture: "/textures/door/metalness.jpg",
		roughnessTexture: "/textures/door/roughness.jpg",
	});

	// colorTexture.repeat.x = 2;
	// colorTexture.repeat.y = 3;
	// colorTexture.wrapS = THREE.RepeatWrapping;
	// colorTexture.wrapT = THREE.RepeatWrapping;

	// colorTexture.offset.x = 0.5;
	// colorTexture.offset.y = 0.5;

	// colorTexture.rotation = 0.25 * Math.PI;
	// colorTexture.center.x = 0.5;
	// colorTexture.center.y = 0.5;

	colorTexture.minFilter = THREE.NearestFilter;
	//? We don't need mipmaps when using `NearestFilter` on `minFilter`
	colorTexture.generateMipmaps = false;
	colorTexture.magFilter = THREE.NearestFilter;

	return (
		<>
			<mesh>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial map={colorTexture} />
			</mesh>
			<OrbitControls enableDamping />
		</>
	);
}

export default App;
