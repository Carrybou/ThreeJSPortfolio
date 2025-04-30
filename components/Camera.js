import { PerspectiveCamera } from 'three';

export function initCamera() {
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2.2, 5); // Set camera at human height
    return camera;
}