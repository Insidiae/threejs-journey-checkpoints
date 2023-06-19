import * as React from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useControls, button } from "leva";
import { OrbitControls } from "@react-three/drei";

function App() {
	const meshRef = React.useRef<THREE.Mesh>(null!);
	const { x, y, z, wireframe, color } = useControls({
		//? Range values
		x: {
			value: 0,
			min: -3,
			max: 3,
			step: 0.01,
		},
		y: {
			value: 0,
			min: -3,
			max: 3,
			step: 0.01,
		},
		z: {
			value: 0,
			min: -3,
			max: 3,
			step: 0.01,
		},
		//? Boolean values
		wireframe: false,
		//? Color values
		color: "#588dfd",
		//? Trigger a function
		spin: button(() => {
			gsap.to(meshRef.current.rotation, {
				duration: 1,
				y: 2 * Math.PI + meshRef.current.rotation.y,
			});
		}),
	});

	return (
		<>
			<mesh ref={meshRef} position={[x, y, z]}>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial color={color} wireframe={wireframe} />
			</mesh>
			<OrbitControls enableDamping />
			<axesHelper />
		</>
	);
}

export default App;
