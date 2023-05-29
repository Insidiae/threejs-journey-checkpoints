import * as React from "react";
import { useThree, Canvas } from "@react-three/fiber";

const sizes = {
	width: 800,
	height: 600,
};

// function Box() {
// 	const state = useThree();
// 	const meshRef = React.useRef<THREE.Mesh>(null!);

// 	React.useEffect(() => {
// 		state.setSize(sizes.width, sizes.height);
// 		state.camera.position.set(0, 0, 3);
// 		state.camera.lookAt(meshRef.current.position);
// 	}, [state]);

// 	return (
// 		<mesh
// 			ref={meshRef}
// 			position={[0.7, -0.6, 1]}
// 			scale={[2, 0.25, 0.5]}
// 			rotation={[Math.PI / 4, Math.PI / 4, 0, "YXZ"]}
// 		>
// 			<boxGeometry args={[1, 1, 1]} />
// 			<meshBasicMaterial color={0x588dfd} />
// 		</mesh>
// 	);
// }

function Group() {
	const state = useThree();

	React.useEffect(() => {
		state.setSize(sizes.width, sizes.height);
		state.camera.position.set(0, 0, 3);
	}, [state]);

	return (
		<group position={[0, 1, 0]} scale={[1, 2, 1]} rotation={[0, 1, 0]}>
			<mesh>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial color={0x58fd8d} />
			</mesh>
			<mesh position={[-2, 0, 0]}>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial color={0xfd588d} />
			</mesh>
			<mesh position={[2, 0, 0]}>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial color={0x588dfd} />
			</mesh>
		</group>
	);
}

function App() {
	return (
		<div
			id="canvas-container"
			//? Just apply the same black background from the vanilla example
			style={{
				...sizes,
				background: "black",
			}}
		>
			<Canvas
				camera={{
					fov: 75,
					aspect: sizes.width / sizes.height,
				}}
			>
				{/* <Box /> */}
				<Group />
				<axesHelper />
			</Canvas>
		</div>
	);
}

export default App;
