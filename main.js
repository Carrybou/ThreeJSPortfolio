import { initCamera } from './components/Camera';
import { initLights } from './components/Lights';
import { initControls } from './components/Controls';
import { initObjects } from './components/Objects/Cube';
import { initFloor } from './components/Objects/Floor'; // Import the floor initialization
import { loadMuseumScene } from './components/import/importer.js';
import { MainScene } from './scene';

const scene = new MainScene();
const camera = initCamera();
initLights(scene);
const { updateMovement, cameraParent } = initControls(camera);

// Add the cameraParent to the scene
// Charge la scène principale (Museum.gltf)
loadMuseumScene((museumScene) => {
    scene.add(museumScene); // Ajoute la scène du musée
    scene.add(cameraParent); // Ajoute la caméra
    animate(); // Démarre l'animation après le chargement
});

function animate() {
    requestAnimationFrame(animate);
    updateMovement(); // Handle movement
    scene.render(camera);
}

animate();