import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

function App() {
	const sphereRef = React.useRef<THREE.Mesh>(null!);
	const planeRef = React.useRef<THREE.Mesh>(null!);
	const sphereShadowRef = React.useRef<THREE.Mesh>(null!);
	const sphereShadowMaterialRef = React.useRef<THREE.MeshBasicMaterial>(null!);

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

	const simpleShadow = useTexture("/textures/simpleShadow.jpg");

	useFrame((state) => {
		const elapsedTime = state.clock.elapsedTime;

		// Update sphere
		sphereRef.current.position.x = Math.cos(elapsedTime) * 1.5;
		sphereRef.current.position.z = Math.sin(elapsedTime) * 1.5;
		// Bounce!
		sphereRef.current.position.y = Math.abs(Math.sin(elapsedTime * 3));

		// Update shadow
		sphereShadowRef.current.position.x = sphereRef.current.position.x;
		sphereShadowRef.current.position.z = sphereRef.current.position.z;
		sphereShadowMaterialRef.current.opacity =
			(1 - sphereRef.current.position.y) * 0.3;
	});

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
				ref={planeRef}
				material={material}
				position={[0, -0.5, 0]}
				rotation={[-0.5 * Math.PI, 0, 0, "XYZ"]}
			>
				<planeGeometry args={[5, 5]} />
			</mesh>
			<mesh
				ref={sphereShadowRef}
				rotation-x={-0.5 * Math.PI}
				position-y={(planeRef.current?.position.y || -0.5) + 0.01}
			>
				<planeGeometry args={[1.5, 1.5]} />
				<meshBasicMaterial
					ref={sphereShadowMaterialRef}
					color={0x000000}
					transparent
					alphaMap={simpleShadow}
				/>
			</mesh>
			<OrbitControls enableDamping />
		</>
	);
}

export default App;
