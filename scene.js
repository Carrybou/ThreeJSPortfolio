import { Scene, WebGLRenderer } from 'three';

export class MainScene extends Scene {
    constructor() {
        super();
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    render(camera) {
        this.renderer.render(this, camera);
    }
}