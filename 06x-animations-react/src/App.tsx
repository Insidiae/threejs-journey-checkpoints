import * as React from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";

const sizes = {
	width: 800,
	height: 600,
};

function Box() {
	const setSize = useThree((state) => state.setSize);
	const camera = useThree((state) => state.camera);
	const meshRef = React.useRef<THREE.Mesh>(null!);

	React.useEffect(() => {
		setSize(sizes.width, sizes.height);
	}, [setSize]);

	//! We may not need this if we can properly set the initial camera position
	// React.useEffect(() => {
	// 	camera.position.set(0, 0, 3);
	// }, [camera]);

	// useFrame((state, delta) => {
	// 	const elapsedTime = state.clock.elapsedTime;
	// 	// Update objects
	// 	// meshRef.current.rotation.y += delta;
	// 	// meshRef.current.position.x = Math.cos(elapsedTime);
	// 	// meshRef.current.position.y = Math.sin(elapsedTime);

	// 	// You can update the camera as well!
	// 	camera.position.x = Math.cos(elapsedTime);
	// 	camera.position.y = Math.sin(elapsedTime);
	// 	camera.lookAt(meshRef.current.position);
	// });

	React.useEffect(() => {
		gsap.to(meshRef.current.position, { x: 2, duration: 1, delay: 1 });
		gsap.to(meshRef.current.position, { x: 0, duration: 1, delay: 2 });
	}, []);

	return (
		<mesh ref={meshRef}>
			<boxGeometry args={[1, 1, 1]} />
			<meshBasicMaterial color={0x588dfd} />
		</mesh>
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
					position: [0, 0, 3],
				}}
			>
				<Box />
			</Canvas>
		</div>
	);
}

export default App;
