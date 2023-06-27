import * as React from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { OrbitControls, useHelper } from "@react-three/drei";

function App() {
	const directionalLightCameraRef = React.useRef<THREE.OrthographicCamera>(
		null!
	);
	const spotLightCameraRef = React.useRef<THREE.PerspectiveCamera>(null!);
	const pointLightCameraRef = React.useRef<THREE.PerspectiveCamera>(null!);
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

	//? you can pass false instead of the object ref to hide the helper
	useHelper(false && directionalLightCameraRef, THREE.CameraHelper);
	useHelper(false && spotLightCameraRef, THREE.CameraHelper);
	useHelper(false && pointLightCameraRef, THREE.CameraHelper);

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
				castShadow
				shadow-mapSize={[1024, 1024]}
				shadow-radius={10}
			>
				<orthographicCamera
					ref={directionalLightCameraRef}
					attach="shadow-camera"
					args={[-2, 2, 2, -2, 1, 6]}
				/>
			</directionalLight>
			<spotLight
				color={0xffffff}
				intensity={0.3}
				distance={10}
				angle={0.3 * Math.PI}
				position={[0, 2, 2]}
				castShadow
				shadow-mapSize={[1024, 1024]}
			>
				<perspectiveCamera
					ref={spotLightCameraRef}
					attach="shadow-camera"
					args={[30, 1, 1, 6]}
				/>
			</spotLight>
			<pointLight
				color={0xffffff}
				intensity={0.3}
				position={[-1, 1, 0]}
				castShadow
				shadow-mapSize={[1024, 1024]}
			>
				<perspectiveCamera
					ref={pointLightCameraRef}
					attach="shadow-camera"
					fov={90}
					near={0.1}
					far={5}
				/>
			</pointLight>
			<mesh ref={sphereRef} material={material} castShadow>
				<sphereGeometry args={[0.5, 32, 32]} />
			</mesh>
			<mesh
				material={material}
				receiveShadow
				position={[0, -0.5, 0]}
				rotation={[-0.5 * Math.PI, 0, 0, "XYZ"]}
			>
				<planeGeometry args={[5, 5]} />
			</mesh>
			<OrbitControls enableDamping />
		</>
	);
}

export default App;
