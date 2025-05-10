import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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