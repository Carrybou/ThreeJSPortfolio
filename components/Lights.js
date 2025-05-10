import { AmbientLight, DirectionalLight } from 'three';

export function initLights(scene) {
    const ambientLight = new AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 2); // Couleur blanche, intensité 1
    directionalLight.position.set(0, 2, 2); // Position de la lumière
    scene.add(directionalLight);
}