//? Yeah... This is pretty much the same as Lesson 3 😂
import * as React from "react";
import { useThree, Canvas } from "@react-three/fiber";

const sizes = {
	width: 800,
	height: 600,
};

function Box() {
	const state = useThree();

	React.useEffect(() => {
		state.setSize(sizes.width, sizes.height);
		state.camera.position.set(0, 0, 3);
	}, [state]);

	return (
		<mesh>
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
					// position: [1, 2, 3],
				}}
			>
				<Box />
			</Canvas>
		</div>
	);
}

export default App;
