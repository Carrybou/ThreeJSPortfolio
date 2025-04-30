import { PlaneGeometry, Mesh, MeshStandardMaterial } from 'three';

    export function initFloor(scene) {
        const floor = new Mesh(
            new PlaneGeometry(50, 50), // Large flat plane
            new MeshStandardMaterial({ color: 0x00ff00 }) // Green color
        );
        floor.rotation.x = -Math.PI / 2; // Rotate to lie flat
        floor.position.y = 0; // Position at ground level
        floor.receiveShadow = true; // Ensure it receives shadows
        scene.add(floor);
    }