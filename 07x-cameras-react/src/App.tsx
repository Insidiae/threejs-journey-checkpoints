import * as React from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const sizes = {
	width: 800,
	height: 600,
};

type BoxProps = {
	cursor: {
		x: number;
		y: number;
	};
};

function BoxCustomControls({ cursor }: BoxProps) {
	const setSize = useThree((state) => state.setSize);
	const meshRef = React.useRef<THREE.Mesh>(null!);

	React.useEffect(() => {
		setSize(sizes.width, sizes.height);
	}, [setSize]);

	useFrame((state) => {
		state.camera.position.x = Math.sin(2 * Math.PI * cursor.x) * 3;
		state.camera.position.z = Math.cos(2 * Math.PI * cursor.x) * 3;
		state.camera.position.y = cursor.y * 3;
		state.camera.lookAt(meshRef.current.position);
	});

	return (
		<mesh ref={meshRef}>
			<boxGeometry args={[1, 1, 1]} />
			<meshBasicMaterial color={0x588dfd} />
		</mesh>
	);
}

function BoxBuiltInControls() {
	const setSize = useThree((state) => state.setSize);

	React.useEffect(() => {
		setSize(sizes.width, sizes.height);
	}, [setSize]);

	return (
		<mesh>
			<boxGeometry args={[1, 1, 1]} />
			<meshBasicMaterial color={0x588dfd} />
		</mesh>
	);
}

function App() {
	// const [cursor, setCursor] = React.useState({
	// 	x: 0,
	// 	y: 0,
	// });

	return (
		<div
			id="canvas-container"
			//? Just apply the same black background from the vanilla example
			style={{
				...sizes,
				background: "black",
			}}
			// onMouseMove={(event) => {
			// 	setCursor({
			// 		x: event.clientX / sizes.width - 0.5,
			// 		//? `event.clientY`'s value goes up when the cursor moves *down*,
			// 		//? so we'll need to invert its value in our calculations
			// 		// cursor.y = -(event.clientY / sizes.height - 0.5);
			// 		y: 0.5 - event.clientY / sizes.height,
			// 	});
			// }}
		>
			<Canvas
				camera={{
					fov: 75,
					aspect: sizes.width / sizes.height,
					position: [0, 0, 3],
				}}
			>
				{/* <BoxCustomControls cursor={cursor} /> */}
				<BoxBuiltInControls />
				<OrbitControls enableDamping autoRotate />
				<axesHelper />
			</Canvas>
		</div>
	);
}

export default App;
