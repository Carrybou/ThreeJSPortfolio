import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const collisionDistance = 0.5; // Minimum distance before collision

export function checkCollisions(camera, scene) {
    // Directions to check (forward, backward, left, right)
    const directions = [
        new THREE.Vector3(0, 0, -1), // Forward
        new THREE.Vector3(0, 0, 1),  // Backward
        new THREE.Vector3(-1, 0, 0), // Left
        new THREE.Vector3(1, 0, 0),  // Right
    ];

    for (const direction of directions) {
        // Set the ray starting from the camera
        raycaster.set(camera.position, direction);

        // Check intersections with scene objects
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0 && intersects[0].distance < collisionDistance) {
            return true; // Collision detected
        }
    }

    return false; // No collision
}