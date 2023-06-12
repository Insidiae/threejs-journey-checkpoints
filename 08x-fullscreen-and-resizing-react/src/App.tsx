import { OrbitControls } from "@react-three/drei";

function App() {
	return (
		<>
			<mesh>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial color={0x588dfd} />
			</mesh>
			<OrbitControls enableDamping autoRotate />
			<axesHelper />
		</>
	);
}

export default App;
