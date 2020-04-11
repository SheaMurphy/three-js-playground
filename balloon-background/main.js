// import Balloon from './balloon';



let renderer, camera, controls, scene, width = window.innerWidth, height = window.innerHeight;

const init = () => {

    // RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true,
        alpha: true
    });
    // renderer.setClearColor(0xe5e5e5);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // CAMERA
    camera = new THREE.PerspectiveCamera(
        70,
        width / height,
        1,
        1000
    );
    camera.position.z = 100;

    // CONTROLS
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.addEventListener('change', animate);

    // SCENE
    scene = new THREE.Scene();

    // LIGHTS
    const lightOne = new THREE.AmbientLight(0xFFFFFF, 0.5),
        lightTwo = new THREE.DirectionalLight(0xFFFFFF);

    lightTwo.position.set(10, 10, 1);

    scene.add(lightOne);
    scene.add(lightTwo);

    window.addEventListener('resize', handleResize, false);

}

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}


const addBalloon = () => {

    let myBalloon = new Balloon();
    myBalloon.init();
    myBalloon.setStart();

    setTimeout(() => {
        scene.add(myBalloon.basket);
        scene.add(myBalloon.balloonBottom);
        scene.add(myBalloon.balloonTop);
        animate();
    }, 200)
}

class Balloon {

    wholeBalloon;
    balloonTop;
    balloonBottom;
    basket;

    constructor() {

    }

    init = () => {
        let basketGeo = new THREE.BoxGeometry(7, 7, 7),
            balloonTopGeo = new THREE.SphereGeometry(16, 32, 32);

        // const material = new THREE.MeshLambertMaterial({ color: 0xf0f8ff });

        const balloonTexture = new THREE.TextureLoader().load('blue-waves.jpg');
        const balloonMaterial = new THREE.MeshLambertMaterial({ map: balloonTexture });

        const basketTexture = new THREE.TextureLoader().load('wicker.jpg');
        const basketMaterial = new THREE.MeshLambertMaterial({ map: basketTexture });

        this.basket = new THREE.Mesh(basketGeo, basketMaterial);
        this.balloonTop = new THREE.Mesh(balloonTopGeo, balloonMaterial);
        this.balloonBottom = this.createLathe();

        const topExtra = 8.5;

        this.balloonTop.position.y += 42.5;
        this.balloonBottom.position.y += 36;
        this.basket.position.y += 20;

        this.wholeBalloon = { balloonBottom: this.balloonBottom, balloonTop: this.balloonTop, basket: this.basket };
    }

    createLathe = () => {
        var points = [];
        for (var i = 0; i < 10; i++) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
        }
        var geometry = new THREE.LatheGeometry(points, 29, 0, 6.3);
        const material = new THREE.MeshLambertMaterial({ color: 0x001331 });
        return new THREE.Mesh(geometry, material);
    }

    moveBalloon = (direction) => {
        switch (direction) {
            case 'left':
                for (const shape in this.wholeBalloon) {
                    this.wholeBalloon[shape].translateX(-0.2);
                }
                break;

            case 'right':
                for (const shape in this.wholeBalloon) {
                    this.wholeBalloon[shape].translateX(0.2);
                }
                break;
            case 'up':
                for (const shape in this.wholeBalloon) {
                    this.wholeBalloon[shape].translateY(0.2);
                }
                break;
            case 'down':
                for (const shape in this.wholeBalloon) {
                    this.wholeBalloon[shape].translateY(0.2);
                }
                break;
            default:
                break;

        }
    }

    setStart = () => {
        for (const shape in this.wholeBalloon) {
            this.wholeBalloon[shape].scale.set(0.75, 0.75, 0.75);
            this.wholeBalloon[shape].position.x -= 150;

            this.animate();
        }
    }

    animate = () => {
        if (this.wholeBalloon.balloonTop.position.x < 400) {
            this.moveBalloon('right');
            setTimeout(this.animate, 20)
            for (const shape in this.wholeBalloon) {
                this.wholeBalloon[shape].translateZ(-0.05);
            }
        }
        else {
            for (const shape in this.wholeBalloon) {
                this.wholeBalloon[shape].translateX(-500);
            }
        }
    }
}

// let basket, balloonBottom, balloonTop, wholeBalloon;


// RANOM HELPER FUCNTIONS
const helpers = (min, max) => Math.random() * (max - min) + min;
init();
animate();
addBalloon();
