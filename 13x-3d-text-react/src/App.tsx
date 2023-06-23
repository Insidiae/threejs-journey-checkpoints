import * as React from "react";
import * as THREE from "three";
import { OrbitControls, useTexture, Text3D } from "@react-three/drei";

function App() {
	const textRef = React.useRef<THREE.Mesh>(null!);
	const { matcapTexture } = useTexture({
		// matcapTexture: "/textures/matcaps/1.png",
		// matcapTexture: "/textures/matcaps/2.png",
		// matcapTexture: "/textures/matcaps/3.png",
		// matcapTexture: "/textures/matcaps/4.png",
		// matcapTexture: "/textures/matcaps/5.png",
		// matcapTexture: "/textures/matcaps/6.png",
		// matcapTexture: "/textures/matcaps/7.png",
		matcapTexture: "/textures/matcaps/8.png",
	});

	const material = React.useMemo(() => {
		const material = new THREE.MeshMatcapMaterial({
			matcap: matcapTexture,
		});
		return material;
	}, [matcapTexture]);

	const donutGeometry = React.useMemo(
		() => new THREE.TorusGeometry(0.3, 0.2, 20, 45),
		[]
	);

	const donuts = React.useMemo(
		() =>
			Array.from({ length: 420 }, () => {
				return {
					position: {
						x: (Math.random() - 0.5) * 10,
						y: (Math.random() - 0.5) * 10,
						z: (Math.random() - 0.5) * 10,
					},
					rotation: {
						x: Math.random() * Math.PI,
						y: Math.random() * Math.PI,
					},
					scale: Math.random(),
				};
			}),
		[]
	);

	return (
		<>
			<Text3D
				ref={textRef}
				font={"/fonts/helvetiker_regular.typeface.json"}
				material={material}
				size={0.5}
				height={0.2}
				curveSegments={5}
				bevelEnabled
				bevelThickness={0.03}
				bevelSize={0.02}
				bevelOffset={0}
				bevelSegments={4}
				onBeforeRender={(_renderer, _scene, _camera, geometry) => {
					geometry.center();
				}}
			>
				Hello Three.js
			</Text3D>
			{donuts.map((donut) => (
				<mesh
					geometry={donutGeometry}
					material={material}
					position={[donut.position.x, donut.position.y, donut.position.z]}
					rotation={[donut.rotation.x, donut.rotation.y, 0, "XYZ"]}
					scale={[donut.scale, donut.scale, donut.scale]}
				/>
			))}
			<axesHelper />
			<OrbitControls enableDamping />
		</>
	);
}

export default App;
