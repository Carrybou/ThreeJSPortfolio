import { AmbientLight, DirectionalLight } from 'three';

export function initLights(scene) {
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    scene.add(directionalLight);
}