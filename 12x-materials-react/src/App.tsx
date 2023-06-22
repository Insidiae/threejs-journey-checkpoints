import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { OrbitControls, useTexture, useCubeTexture } from "@react-three/drei";

function App() {
	const sphereRef = React.useRef<THREE.Mesh>(null!);
	const planeRef = React.useRef<THREE.Mesh>(null!);
	const torusRef = React.useRef<THREE.Mesh>(null!);

	const textures = useTexture({
		doorColorTexture: "/textures/door/color.jpg",
		doorAlphaTexture: "/textures/door/alpha.jpg",
		doorHeightTexture: "/textures/door/height.jpg",
		doorNormalTexture: "/textures/door/normal.jpg",
		doorAmbientOcclusionTexture: "/textures/door/ambientOcclusion.jpg",
		doorMetalnessTexture: "/textures/door/metalness.jpg",
		doorRoughnessTexture: "/textures/door/roughness.jpg",
		matcapTexture: "/textures/matcaps/1.png",
		// matcapTexture: "/textures/matcaps/2.png",
		// matcapTexture: "/textures/matcaps/3.png",
		// matcapTexture: "/textures/matcaps/4.png",
		// matcapTexture: "/textures/matcaps/5.png",
		// matcapTexture: "/textures/matcaps/6.png",
		// matcapTexture: "/textures/matcaps/7.png",
		// matcapTexture: "/textures/matcaps/8.png",
		// gradientTexture: "/textures/gradients/3.jpg",
		gradientTexture: "/textures/gradients/5.jpg",
	});

	textures.gradientTexture.minFilter = THREE.NearestFilter;
	textures.gradientTexture.magFilter = THREE.NearestFilter;
	textures.gradientTexture.generateMipmaps = false;

	const environmentMapTexture = useCubeTexture(
		["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
		// { path: "/textures/environmentMaps/0/" }
		// { path: "/textures/environmentMaps/1/" }
		// { path: "/textures/environmentMaps/2/" }
		{ path: "/textures/environmentMaps/3/" }
	);

	const controls = useControls({
		metalness: {
			// value: 0,
			value: 0.7,
			min: 0,
			max: 1,
			step: 0.0001,
		},
		roughness: {
			// value: 1,
			value: 0.2,
			min: 0,
			max: 1,
			step: 0.0001,
		},
		// aoMapIntensity: {
		// 	value: 1,
		// 	min: 0,
		// 	max: 10,
		// 	step: 0.0001,
		// },
		// displacementScale: {
		// 	value: 0.05,
		// 	min: 0,
		// 	max: 1,
		// 	step: 0.0001,
		// },
		wireframe: false,
	});

	const material = React.useMemo(() => {
		// const material = new THREE.MeshBasicMaterial();
		// material.map = textures.doorColorTexture;
		// material.color = new THREE.Color(0x588dfd);
		// material.wireframe = true;
		// material.transparent = true;
		// material.opacity = 0.5;
		// material.alphaMap = textures.doorAlphaTexture;
		// material.side = THREE.DoubleSide;

		// const material = new THREE.MeshNormalMaterial();
		// material.flatShading = true;
		// material.normalMap = textures.doorNormalTexture;

		// const material = new THREE.MeshMatcapMaterial();
		// material.map = textures.doorColorTexture;
		// material.normalMap = textures.doorNormalTexture;
		// material.matcap = textures.matcapTexture;

		// const material = new THREE.MeshDepthMaterial();

		// const material = new THREE.MeshLambertMaterial();

		// const material = new THREE.MeshPhongMaterial();
		// material.shininess = 100;
		// material.specular = new THREE.Color(0x1188ff);

		// const material = new THREE.MeshToonMaterial();
		// material.gradientMap = textures.gradientTexture;

		// const material = new THREE.MeshStandardMaterial();
		// material.metalness = 0;
		// material.roughness = 1;
		// material.map = textures.doorColorTexture;
		// material.aoMap = textures.doorAmbientOcclusionTexture;
		// material.aoMapIntensity = 1;
		// material.transparent = true;
		// material.alphaMap = textures.doorAlphaTexture;
		// material.displacementMap = textures.doorHeightTexture;
		// material.displacementScale = 0.05;
		// material.normalMap = textures.doorNormalTexture;
		// material.normalScale.set(0.5, 0.5);
		// material.metalnessMap = textures.doorMetalnessTexture;
		// material.roughnessMap = textures.doorRoughnessTexture;

		const material = new THREE.MeshStandardMaterial();
		material.metalness = 0.7;
		material.roughness = 0.2;
		material.envMap = environmentMapTexture;
		material.side = THREE.DoubleSide;

		return material;
	}, [textures, environmentMapTexture]);

	React.useEffect(() => {
		material.metalness = controls.metalness;
		material.roughness = controls.roughness;
		// material.aoMapIntensity = controls.aoMapIntensity;
		// material.displacementScale = controls.displacementScale;
		material.wireframe = controls.wireframe;
	}, [material, controls]);

	useFrame((state) => {
		const elapsedTime = state.clock.elapsedTime;

		// Update objects
		sphereRef.current.rotation.y = 0.1 * elapsedTime;
		planeRef.current.rotation.y = 0.1 * elapsedTime;
		torusRef.current.rotation.y = 0.1 * elapsedTime;

		sphereRef.current.rotation.x = 0.15 * elapsedTime;
		planeRef.current.rotation.x = 0.15 * elapsedTime;
		torusRef.current.rotation.x = 0.15 * elapsedTime;
	});

	return (
		<>
			<ambientLight color={0xffffff} intensity={0.5} />
			<pointLight color={0xffffff} intensity={0.5} position={[2, 3, 4]} />
			<mesh ref={sphereRef} material={material} position={[-1.5, 0, 0]}>
				{/* <sphereGeometry args={[0.5, 16, 16]} /> */}
				<sphereGeometry args={[0.5, 64, 64]} />
			</mesh>
			<mesh ref={planeRef} material={material}>
				{/* <planeGeometry args={[1, 1]} /> */}
				<planeGeometry args={[1, 1, 100, 100]} />
			</mesh>
			<mesh ref={torusRef} material={material} position={[1.5, 0, 0]}>
				{/* <torusGeometry args={[0.3, 0.2, 16, 32]} /> */}
				<torusGeometry args={[0.3, 0.2, 64, 128]} />
			</mesh>
			<OrbitControls enableDamping />
		</>
	);
}

export default App;
