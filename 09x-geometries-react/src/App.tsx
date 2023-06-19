import * as React from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const count = 50;

function App() {
	//? We only need to generate vertex positions on first render
	const positionsAttribute = React.useMemo(() => {
		const positionsArray = new Float32Array(count * 3 * 3);
		for (let i = 0; i < count * 3 * 3; i++) {
			positionsArray[i] = (Math.random() - 0.5) * 4;
		}

		return new THREE.BufferAttribute(positionsArray, 3);
	}, []);

	return (
		<>
			<mesh>
				{/* <boxGeometry args={[1, 1, 1]} /> */}
				<bufferGeometry
					attributes={{
						position: positionsAttribute,
					}}
				/>
				<meshBasicMaterial color={0x588dfd} wireframe />
			</mesh>
			<OrbitControls enableDamping />
		</>
	);
}

export default App;
