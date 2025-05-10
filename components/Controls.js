import { Vector3, Object3D, Raycaster } from 'three';

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
                pitchY -= deltaX * mouseSensitivity;
                pitchY = Math.max(-maxPitch, Math.min(maxPitch, pitchY));
                camera.rotation.y = pitchY;

                // Update pitch (vertical rotation) of the camera and clamp
                pitch -= deltaY * mouseSensitivity;
                pitch = Math.max(-maxPitch, Math.min(maxPitch, pitch));
                camera.rotation.x = pitch;
            }
        });

        // Collision detection setup
        const raycaster = new Raycaster();
        const collisionDistance = 0.5; // Minimum distance before collision

        const checkCollisions = (direction, museumScene) => {
            const cameraWorldPosition = new Vector3();
            camera.getWorldPosition(cameraWorldPosition); // Get the camera's world position
            raycaster.set(cameraWorldPosition, direction);
            console.log('Camera world position:', cameraWorldPosition, 'Direction:', direction);
            const intersects = raycaster.intersectObjects(museumScene.children, true);
            if (intersects.length > 0 && intersects[0].distance < collisionDistance) {
                console.log('Collision detected in direction:', direction);
                return true;
            }
            return false;
        };

        // Movement logic
        const forward = new Vector3();
        const right = new Vector3();

        const updateMovement = (museumScene) => {
            camera.getWorldDirection(forward);
            forward.y = 0;
            forward.normalize();

            right.crossVectors(forward, camera.up).normalize();

            if (movement.forward && !checkCollisions(forward, museumScene)) {
                cameraParent.position.addScaledVector(forward, speed);
            }
            if (movement.backward && !checkCollisions(forward.clone().negate(), museumScene)) {
                const backward = forward.clone().negate(); // Explicitly create a backward vector
                cameraParent.position.addScaledVector(backward, speed);
            }
            if (movement.left && !checkCollisions(right.clone().negate(), museumScene)) {
                cameraParent.position.addScaledVector(right, -speed);
            }
            if (movement.right && !checkCollisions(right, museumScene)) {
                cameraParent.position.addScaledVector(right, speed);
            }
        };
        return { updateMovement, cameraParent };
    }