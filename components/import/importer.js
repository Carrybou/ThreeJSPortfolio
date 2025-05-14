import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PlaneGeometry, MeshBasicMaterial, Mesh, TextureLoader } from 'three';
import { Raycaster, Vector2 } from 'three';

    export function loadMuseumScene(callback) {
        const loader = new GLTFLoader();
        loader.load(
            'components/import/Museum.gltf',
            (gltf) => {
                console.log(gltf.scene);
                callback(gltf.scene); // Retourne la scène chargée
            },
            (progress) => {
                console.log(`Chargement : ${(progress.loaded / progress.total) * 100}%`);
            },
            (error) => {
                console.error('Erreur de chargement', error);
            }
        );
    }
export function addPortfolioImages(scene, camera) {
    const textureLoader = new TextureLoader();
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    // List of portfolio images and their positions
    const portfolio = [
        { image: 'components/import/img/captcha.png', position: { x: 2.5, y: 2.2, z: -10 }, title: 'Captcha', description: 'A project about captcha systems.'  },
        { image: 'components/import/img/docker.png', position: { x: -6.3, y: 2.2, z: -10 }, title: 'Docker', description: 'A project about captcha systems.'  },
        { image: 'components/import/img/ezone.png', position: { x: -13, y: 2.2, z: 0.8 }, title: 'Ezone', description: 'A project about captcha systems.'  },
        { image: 'components/import/img/GreenBin.png', position: { x: 7.2, y: 2.2, z: 0.8 }, title: 'GreenBin', description: 'A project about captcha systems.'  },
        { image: 'components/import/img/monedt.png', position: { x: -11, y: 2.2, z: -10 }, title: 'Monedt', description: 'A project about captcha systems.'  },
        { image: 'components/import/img/unity.png', position: { x: -2.55, y: 2.2, z: 0.8 }, title: 'Unity', description: 'A project about captcha systems.'  },
        { image: 'components/import/img/zend.png', position: { x: -14.5, y: 2.2, z: -10 }, title: 'Zend', description: 'A project about captcha systems.'  },
        { image: 'components/import/img/sudoku.jpg', position: { x: -2.8, y: 2.1, z: -10 }, title: 'Sudoku', description: 'A project about captcha systems.'  },
    ];

    portfolio.forEach((item) => {
        // Load texture
        textureLoader.load(item.image, (texture) => {
            // Get the image's original dimensions
            const { width, height } = texture.image;

            // Calculate aspect ratio
            const aspectRatio = width / height;

            // Create a plane with the same proportions as the image
            const geometry = new PlaneGeometry(aspectRatio * 3, 3); // Scale height to 2, adjust width proportionally
            const material = new MeshBasicMaterial({ map: texture });
            const plane = new Mesh(geometry, material);

            // Position the plane
            plane.position.set(item.position.x, item.position.y, item.position.z);
            plane.userData = {
                title: item.title,
                description: item.description,
            };
            // Add the plane to the scene
            scene.add(plane);
        });
    });
    // Add event listener for mouse movement
    window.addEventListener('pointermove', (event) => {
        if (!camera || !camera.isPerspectiveCamera) {
            console.error('Camera is not defined or not a PerspectiveCamera');
            return;
        }

        // Convert mouse position to normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Perform raycasting
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        console.log('Mouse coordinates:', mouse);
        console.log('Intersected objects:', intersects);

        const panel = document.getElementById('description-panel');
        if (intersects.length > 0) {
            const hoveredObject = intersects[0].object;
            if (hoveredObject.userData) {
                // Update the description panel
                const title = document.getElementById('project-title');
                const description = document.getElementById('project-description');

                title.textContent = hoveredObject.userData.title || 'No Title';
                description.textContent = hoveredObject.userData.description || 'No Description';

                panel.style.display = 'block';
                panel.style.left = `${event.clientX + 10}px`; // Position near the mouse
                panel.style.top = `${event.clientY + 10}px`;
            }
        } else {
            panel.style.display = 'none'; // Hide the panel if no object is hovered
        }
    });
}