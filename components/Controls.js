import { Vector3, Object3D } from 'three';

export function initControls(camera) {
    const movement = { forward: false, backward: false, left: false, right: false };
    const speed = 0.1;
    const mouseSensitivity = 0.002;

    // Create a parent object for the camera
    const cameraParent = new Object3D();
    cameraParent.add(camera);

    let pitch = 0;
    let pitchY = 0;

    const maxPitch = Math.PI / 2 - 0.1; // Prevent flipping

    // Pointer Lock API
    document.body.addEventListener('click', () => {
        document.body.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement !== document.body) {
            console.log('Pointer lock lost');
        }
    });

    // Key listeners for movement
    document.addEventListener('keydown', (event) => {
        if (event.key === 'z') movement.forward = true;
        if (event.key === 's') movement.backward = true;
        if (event.key === 'q') movement.left = true;
        if (event.key === 'd') movement.right = true;
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'z') movement.forward = false;
        if (event.key === 's') movement.backward = false;
        if (event.key === 'q') movement.left = false;
        if (event.key === 'd') movement.right = false;
    });

    // Mouse listeners for camera rotation
    document.addEventListener('mousemove', (event) => {
        if (document.pointerLockElement === document.body) {
            const deltaX = event.movementX;
            const deltaY = event.movementY;

            // Update yaw (horizontal rotation) of the cameraParent
            //camera.rotation.y -= deltaX * mouseSensitivity;
            pitchY -= deltaX * mouseSensitivity;
            pitchY = Math.max(-maxPitch, Math.min(maxPitch, pitchY));
            camera.rotation.y = pitchY
            // Update pitch (vertical rotation) of the camera and clamp
            pitch -= deltaY * mouseSensitivity;
            pitch = Math.max(-maxPitch, Math.min(maxPitch, pitch));
            camera.rotation.x = pitch;
        }

    });

    // Movement logic
    const forward = new Vector3();
    const right = new Vector3();

    const updateMovement = () => {
        // Calculate forward direction relative to the camera
        camera.getWorldDirection(forward);
        forward.y = 0; // Ignore vertical movement
        forward.normalize();

        // Calculate right direction relative to the camera
        right.crossVectors(forward, camera.up).normalize();

        if (movement.forward) cameraParent.position.addScaledVector(forward, speed);
        if (movement.backward) cameraParent.position.addScaledVector(forward, -speed);
        if (movement.left) cameraParent.position.addScaledVector(right, -speed);
        if (movement.right) cameraParent.position.addScaledVector(right, speed);
    };

    return { updateMovement, cameraParent };
}