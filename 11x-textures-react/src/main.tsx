//? https://docs.pmnd.rs/react-three-fiber/api/canvas#custom-canvas
import * as THREE from "three";
import { extend, createRoot, events } from "@react-three/fiber";
import App from "./App.tsx";
import "./style.css";

//? Declare prefixed document properties
declare global {
	interface Document {
		mozCancelFullScreen?: () => Promise<void>;
		msExitFullscreen?: () => Promise<void>;
		webkitExitFullscreen?: () => Promise<void>;
		mozFullScreenElement?: Element;
		msFullscreenElement?: Element;
		webkitFullscreenElement?: Element;
	}

	interface HTMLElement {
		msRequestFullscreen?: () => Promise<void>;
		mozRequestFullscreen?: () => Promise<void>;
		webkitRequestFullscreen?: () => Promise<void>;
	}
}

// Register the THREE namespace as native JSX elements.
// See below for notes on tree-shaking
extend(THREE);

// Create a react root
const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl")!;
const root = createRoot(canvas);

// Configure the root, inject events optionally, set camera, etc
root.configure({ events, camera: { fov: 75, position: [0, 0, 3] } });

// createRoot by design is not responsive, you have to take care of resize yourself
window.addEventListener("resize", () => {
	root.configure({
		size: {
			width: window.innerWidth,
			height: window.innerHeight,
			top: 0,
			left: 0,
		},
	});
});

// Request fullscreen on double click
canvas.addEventListener("dblclick", () => {
	const fullscreenElement =
		document.fullscreenElement || document.webkitFullscreenElement;

	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.webkitRequestFullscreen) {
			canvas.webkitRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
});

// Trigger resize
window.dispatchEvent(new Event("resize"));

// Render entry point
root.render(<App />);
