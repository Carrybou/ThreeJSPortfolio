import { SphereGeometry, MeshStandardMaterial, Mesh, Raycaster, Vector2 } from 'three';

export function addStartButton(scene, camera, startGameCallback) {
    // Create a hemisphere geometry
    const geometry = new SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2); // Top half of a sphere
    const material = new MeshStandardMaterial({ color: 0xff0000, metalness: 0.5, roughness: 0.3 }); // Shiny red material
    const button = new Mesh(geometry, material);

    button.position.set(0, 1, 2.25); // Position the button in front of the camera
    button.userData = { isStartButton: true };

    scene.add(button);

    // Add click detection
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0 && intersects[0].object.userData.isStartButton) {
            startGameCallback(); // Start the game
            scene.remove(button); // Remove the button after starting
        }
    });
}