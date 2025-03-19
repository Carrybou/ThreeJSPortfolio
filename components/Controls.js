import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initControls(camera) {
    const controls = new OrbitControls(camera, document.body);
    controls.enableDamping = true;
    return controls;
}