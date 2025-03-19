import { initCamera } from './components/Camera';
import { initLights } from './components/Lights';
import { initControls } from './components/Controls';
import { initObjects } from './components/Objects/Cube';
import { MainScene } from './scene';

const scene = new MainScene();
const camera = initCamera();
const lights = initLights(scene);
const controls = initControls(camera);
const objects = initObjects(scene);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    scene.render(camera);
}

animate();