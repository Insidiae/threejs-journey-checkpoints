import * as React from "react";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";

function App() {
	const sphereRef = React.useRef<THREE.Mesh>(null!);
	const cubeRef = React.useRef<THREE.Mesh>(null!);
	const torusRef = React.useRef<THREE.Mesh>(null!);

	const directionalLightRef = React.useRef<THREE.DirectionalLight>(null!);
	const hemisphereLightRef = React.useRef<THREE.HemisphereLight>(null!);
	const pointLightRef = React.useRef<THREE.PointLight>(null!);
	const spotLightRef = React.useRef<THREE.SpotLight>(null!);
	const rectAreaLightRef = React.useRef<THREE.RectAreaLight>(null!);

	const material = React.useMemo(
		() => new THREE.MeshStandardMaterial({ roughness: 0.4 }),
		[]
	);

	//? We need to access spotLight.target to add it to the scene later:
	//? https://stackoverflow.com/a/75662803
	const spotLight = React.useMemo(() => new THREE.SpotLight(), []);

	useFrame((state) => {
		const elapsedTime = state.clock.elapsedTime;

		// Update objects
		sphereRef.current.rotation.y = 0.1 * elapsedTime;
		cubeRef.current.rotation.y = 0.1 * elapsedTime;
		torusRef.current.rotation.y = 0.1 * elapsedTime;

		sphereRef.current.rotation.x = 0.15 * elapsedTime;
		cubeRef.current.rotation.x = 0.15 * elapsedTime;
		torusRef.current.rotation.x = 0.15 * elapsedTime;
	});

	React.useEffect(() => {
		rectAreaLightRef.current.lookAt(new THREE.Vector3());
	}, []);

	// Helpers
	useHelper(hemisphereLightRef, THREE.HemisphereLightHelper, 0.2);
	useHelper(directionalLightRef, THREE.DirectionalLightHelper, 0.2);
	useHelper(pointLightRef, THREE.PointLightHelper, 0.2);
	useHelper(spotLightRef, THREE.SpotLightHelper);
	useHelper(rectAreaLightRef, RectAreaLightHelper);

	return (
		<>
			<ambientLight color={0xffffff} intensity={0.5} />
			<directionalLight
				ref={directionalLightRef}
				color={0x00fffc}
				intensity={0.3}
				position={[1, 0.25, 0]}
			/>
			<hemisphereLight
				ref={hemisphereLightRef}
				args={[0xff0000, 0x0000ff]}
				intensity={0.3}
			/>
			<pointLight
				ref={pointLightRef}
				color={0xff9000}
				intensity={0.5}
				distance={10}
				decay={0.2}
				position={[1, -0.5, 1]}
			/>
			<rectAreaLight
				ref={rectAreaLightRef}
				color={0x4e00ff}
				intensity={2}
				width={1}
				height={1}
				position={[-1.5, 0, 1.5]}
			/>
			<primitive
				object={spotLight}
				ref={spotLightRef}
				color={0x78ff00}
				intensity={0.5}
				distance={10}
				angle={0.1 * Math.PI}
				penumbra={0.25}
				decay={1}
				position={[0, 2, 3]}
			/>
			<primitive object={spotLight.target} position={[-0.75, 0, 0]} />
			<mesh ref={sphereRef} material={material} position={[-1.5, 0, 0]}>
				<sphereGeometry args={[0.5, 32, 32]} />
			</mesh>
			<mesh ref={cubeRef} material={material}>
				<boxGeometry args={[0.75, 0.75, 0.75]} />
			</mesh>
			<mesh ref={torusRef} material={material} position={[1.5, 0, 0]}>
				<torusGeometry args={[0.3, 0.2, 32, 64]} />
			</mesh>
			<mesh material={material} position={[-1.5, 0, 0]}>
				<sphereGeometry args={[0.5, 32, 32]} />
			</mesh>
			<mesh
				material={material}
				position={[0, -0.65, 0]}
				rotation={[-0.5 * Math.PI, 0, 0, "XYZ"]}
			>
				<planeGeometry args={[5, 5]} />
			</mesh>
			<OrbitControls enableDamping />
		</>
	);
}

export default App;
