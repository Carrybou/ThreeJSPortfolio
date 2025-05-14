import { initCamera } from './components/Camera';
    import { initLights } from './components/Lights';
    import { initControls } from './components/Controls';
    import { loadMuseumScene , addPortfolioImages} from './components/import/importer.js';
    import { MainScene } from './scene';
import { addStartButton } from './components/Objects/Button.js';
import { startGame } from './components/GameLogic.js';



    const scene = new MainScene();
    const camera = initCamera();
    initLights(scene);
    const { updateMovement, cameraParent } = initControls(camera);

    // Declare museumScene in the outer scope
    let museumScene;

    // Add the cameraParent to the scene
    // Load the main scene (Museum.gltf)
    loadMuseumScene((loadedMuseumScene) => {
        museumScene = loadedMuseumScene; // Assign the loaded scene to the outer variable
        scene.add(museumScene); // Add the museum scene
        scene.add(cameraParent); // Add the camera
        addPortfolioImages(scene);
        addStartButton(scene, camera, () => {
            const portfolio = [
                { title: 'Captcha' },
                { title: 'Docker' },
                { title: 'Ezone' },
                { title: 'GreenBin' },
                { title: 'Monedt' },
                { title: 'Unity' },
                { title: 'Zend' },
                { title: 'Sudoku' },
            ];
            startGame(scene, camera, portfolio); // Start the game
        });
        animate(); // Start the animation after loading
    });

    function animate() {
        requestAnimationFrame(animate);
        if (museumScene) {
            updateMovement(museumScene); // Pass the museumScene here
        }
        scene.render(camera);
    }

    animate();