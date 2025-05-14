/*
import { BoxGeometry, Mesh, MeshStandardMaterial, Quaternion, Vector3 } from 'three';

export function initObjects(scene) {
    const cube = new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: 0xff0000 }));

    // Position
    cube.position.set(0, 0, 0);

    // Rotation
    cube.rotation.x = Math.PI / 4; // Rotation de 45° sur l’axe X
    cube.rotation.y = Math.PI / 2; // Rotation de 90° sur l’axe Y

    // Echelle
    cube.scale.set(2, 1, 1); // Double la taille sur l'axe X, garde les autres axes inchangés

    // Quaternion
    const quaternion = new Quaternion();
    // Rotation de 45° autour de l'axe Y
    quaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 4);
    cube.quaternion.copy(quaternion);

    // stockage de donnée dans l'objet
    cube.userData.nomDuCube = "toto";

}*/
