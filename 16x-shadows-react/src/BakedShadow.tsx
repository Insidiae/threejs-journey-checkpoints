import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { OrbitControls, useTexture } from "@react-three/drei";

function App() {
	const sphereRef = React.useRef<THREE.Mesh>(null!);

	const ambientLightControls = useControls("ambientLight", {
		intensity: {
			value: 0.3,
			min: 0,
			max: 1,
			step: 0.001,
		},
	});

	const directionalLightControls = useControls("directionalLight", {
		intensity: {
			value: 0.3,
			min: 0,
			max: 1,
			step: 0.001,
		},
		x: {
			value: 2,
			min: -5,
			max: 5,
			step: 0.001,
		},
		y: {
			value: 2,
			min: -5,
			max: 5,
			step: 0.001,
		},
		z: {
			value: -1,
			min: -5,
			max: 5,
			step: 0.001,
		},
	});

	const materialControls = useControls("material", {
		metalness: {
			value: 0,
			min: 0,
			max: 1,
			step: 0.001,
		},
		roughness: {
			value: 0.7,
			min: 0,
			max: 1,
			step: 0.001,
		},
	});

	const material = React.useMemo(() => {
		const material = new THREE.MeshStandardMaterial();
		material.roughness = 0.7;

		return material;
	}, []);

	React.useEffect(() => {
		material.metalness = materialControls.metalness;
		material.roughness = materialControls.roughness;
	}, [material, materialControls]);

	const bakedShadow = useTexture("/textures/bakedShadow.jpg");

	return (
		<>
			<ambientLight
				color={0xffffff}
				intensity={ambientLightControls.intensity}
			/>
			<directionalLight
				color={0xffffff}
				intensity={directionalLightControls.intensity}
				position={[
					directionalLightControls.x,
					directionalLightControls.y,
					directionalLightControls.z,
				]}
			/>
			<spotLight
				color={0xffffff}
				intensity={0.3}
				distance={10}
				angle={0.3 * Math.PI}
				position={[0, 2, 2]}
			/>
			<pointLight color={0xffffff} intensity={0.3} position={[-1, 1, 0]} />
			<mesh ref={sphereRef} material={material}>
				<sphereGeometry args={[0.5, 32, 32]} />
			</mesh>
			<mesh
				// material={material}
				position={[0, -0.5, 0]}
				rotation={[-0.5 * Math.PI, 0, 0, "XYZ"]}
			>
				<planeGeometry args={[5, 5]} />
				<meshBasicMaterial map={bakedShadow} />
			</mesh>
			<OrbitControls enableDamping />
		</>
	);
}

export default App;
