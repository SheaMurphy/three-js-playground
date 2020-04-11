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

class Balloon {

    wholeBalloon;
    balloonTop;
    balloonBottom;
    basket;
    startPositionX;
    startPositionZ;
    directionX;
    directionZ;
    xSpeed;
    ySpeed;

    topExtra = 22.5;
    bottomExtra = 16;
    basketExtra = 0;

    constructor() {
        this.xSpeed = randomFloatGenerator(0.075, 0.175);
        this.zSpeed = randomFloatGenerator(0.025, 0.040);
        randomFloatGenerator(1, 10) > 5 ? this.directionZ = 'back' : this.directionZ = 'forward';
        randomFloatGenerator(1, 10) > 5 ? this.directionX = 'left' : this.directionX = 'right';
    }

    init = () => {
        let basketGeo = new THREE.BoxGeometry(7, 7, 7),
            balloonTopGeo = new THREE.SphereGeometry(16, 32, 32);

        // const material = new THREE.MeshLambertMaterial({ color: 0xf0f8ff });

        const images = ['air-balloon.jpg', 'polka-dot.jpg', 'stripes.jpg', 'wave.jpg', 'horizontal-stripes.png', 'blue-waves.jpg'];
        const randomImage = images[randomIntegerGenerator(0, images.length)];

        const balloonTexture = new THREE.TextureLoader().load(randomImage);
        const balloonMaterial = new THREE.MeshLambertMaterial({ map: balloonTexture });

        const basketTexture = new THREE.TextureLoader().load('wicker.jpg');
        const basketMaterial = new THREE.MeshLambertMaterial({ map: basketTexture });

        this.basket = new THREE.Mesh(basketGeo, basketMaterial);
        this.balloonTop = new THREE.Mesh(balloonTopGeo, balloonMaterial);
        this.balloonBottom = this.createLathe(randomImage);
        this.wholeBalloon = { balloonBottom: this.balloonBottom, balloonTop: this.balloonTop, basket: this.basket };
    }

    createLathe = (image) => {
        var points = [];
        for (var i = 0; i < 10; i++) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
        }
        var geometry = new THREE.LatheGeometry(points, 29, 0, 6.3);
        const balloonTexture = new THREE.TextureLoader().load(image);
        let balloonMaterial = new THREE.MeshLambertMaterial({ map: balloonTexture });

        if (image === 'blue-waves.jpg') balloonMaterial = new THREE.MeshLambertMaterial({ color: 0x001331 });

        return new THREE.Mesh(geometry, balloonMaterial);
    }

    moveBalloon = (direction) => {
        switch (direction) {
            case 'left':
                for (const shape in this.wholeBalloon) {
                    this.wholeBalloon[shape].translateX(-this.xSpeed);
                }
                break;

            case 'right':
                for (const shape in this.wholeBalloon) {
                    this.wholeBalloon[shape].translateX(this.xSpeed);
                }
                break;
            case 'forward':
                for (const shape in this.wholeBalloon) {
                    this.wholeBalloon[shape].translateZ(this.zSpeed);
                }
                break;
            case 'back':
                for (const shape in this.wholeBalloon) {
                    this.wholeBalloon[shape].translateZ(-this.zSpeed);
                }
                break;
            default:
                break;
        }
    }

    setStart() {
        const randomOffsetY = randomFloatGenerator(-20, 20);
        this.balloonTop.position.y = this.topExtra + randomOffsetY;
        this.balloonBottom.position.y = this.bottomExtra + randomOffsetY;
        this.basket.position.y += this.basketExtra + randomOffsetY;


        for (const shape in this.wholeBalloon) {
            this.wholeBalloon[shape].scale.set(0.75, 0.75, 0.75);
            this.directionX === 'right' ? this.wholeBalloon[shape].position.x -= 200 : this.wholeBalloon[shape].position.x += 200;
            this.animate();
        }
    }

    animate = () => {
        if (this.balloonTop.position.x > 400 || this.balloonTop.position.x < -400) {
            scene.remove(this.balloonTop);
            scene.remove(this.balloonBottom);
            scene.remove(this.basket);
        } else {
            this.moveBalloon(this.directionX);
            this.moveBalloon(this.directionZ);
            setTimeout(this.animate, 50);
        }
    }
}

const addBalloon = () => {
    if (scene.children.length < 15) {
        let myBalloon = new Balloon();
        myBalloon.init();
        myBalloon.setStart();

        setTimeout(() => {
            scene.add(myBalloon.basket);
            scene.add(myBalloon.balloonBottom);
            scene.add(myBalloon.balloonTop);
            animate();
        }, 200);
    }
}

// RANOM HELPER FUCNTIONS
const randomFloatGenerator = (min, max) => Math.random() * (max - min) + min;
const randomIntegerGenerator = (min, max) => Math.floor(Math.random() * (max - min) + min);


// SETUP FUNCTION CALLS

init();
animate();
addBalloon();
setInterval(addBalloon, randomFloatGenerator(3000, 12000));
