import { AmbientLight, DirectionalLight } from 'three';

export function initLights(scene) {
    const ambientLight = new AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1); // Couleur blanche, intensité 1
    directionalLight.position.set(5, 10, 7.5); // Position de la lumière
    scene.add(directionalLight);
}