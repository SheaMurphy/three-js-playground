let renderer, camera, controls, scene, width = window.innerWidth, height = window.innerHeight;

const init = () => {

    // RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true
    });

    renderer.setClearColor(0xe5e5e5);
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
    controls.addEventListener('change', render);

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

const render = () => {
    renderer.render(scene, camera);
}

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
}

const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}

const addShape = () => {
    // let geometry = new THREE.BoxGeometry(10, 10, 10);
    let geometry = new THREE.DodecahedronGeometry(15, 3);

    let material = new THREE.MeshLambertMaterial({ color: 0xff00ff });

    let mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
}

let basket, balloonBottom, balloonTop, wholeBalloon;

const createLathe = () => {
    var points = [];
    for (var i = 0; i < 10; i++) {
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
    }
    var geometry = new THREE.LatheGeometry(points, 29, 0, 6.3);
    // const balloonTexture = new THREE.TextureLoader().load('blue-waves.jpg');
    // const material = new THREE.MeshLambertMaterial({ map: balloonTexture });
    const material = new THREE.MeshLambertMaterial({ color: 0x001331 });
    return new THREE.Mesh(geometry, material);
}

const initBalloon = () => {
    let basketGeo = new THREE.BoxGeometry(7, 7, 7),
        balloonTopGeo = new THREE.SphereGeometry(16, 32, 32);

    const material = new THREE.MeshLambertMaterial({ color: 0xf0f8ff });


    const balloonTexture = new THREE.TextureLoader().load('blue-waves.jpg');
    const balloonMaterial = new THREE.MeshLambertMaterial({ map: balloonTexture });

    const basketTexture = new THREE.TextureLoader().load('wicker.jpg');
    const basketMaterial = new THREE.MeshLambertMaterial({ map: basketTexture });

    basket = new THREE.Mesh(basketGeo, basketMaterial);
    balloonTop = new THREE.Mesh(balloonTopGeo, balloonMaterial);
    balloonBottom = createLathe();

    // balloonBottom.scale.x = 0.8;
    // balloonBottom.scale.y = 0.8;
    // balloonBottom.scale.z = 0.8;
    // balloonBottom.position.y -= 3;

    const topExtra = 8.5;

    balloonTop.position.y += 18.5;
    balloonBottom.position.y += 10;
    basket.position.y -= 12;


    wholeBalloon = { balloonBottom, balloonTop, basket };

    setTimeout(() => {
        scene.add(basket);
        scene.add(balloonBottom);
        scene.add(balloonTop);
        render();
    }, 200)
}

const moveBalloon = (direction) => {
    switch (direction) {
        case 'left':
            for (const shape in wholeBalloon) {
                wholeBalloon[shape].position.x -= 0.2;
            }
            render();
            break;

        case 'right':
            for (const shape in wholeBalloon) {
                wholeBalloon[shape].position.x += 0.2;
            }
            render();
            break;
        case 'up':
            for (const shape in wholeBalloon) {
                wholeBalloon[shape].position.y += 0.2;
            }
            render();
            break;
        case 'down':
            for (const shape in wholeBalloon) {
                wholeBalloon[shape].position.y -= 0.2;
            }
            render();
            break;
        default:
            break;

    }
}

const handleKeyDown = (e) => {
    // switch (e.keyCode) {
    //     case 37:
    //         moveBalloon('left');
    //         render();
    //         break;
    //     case 39:
    //         moveBalloon('right');
    //         render();
    //         break;
    //     case 38:
    //         moveBalloon('up');
    //         render();
    //         break;
    //     case 40:
    //         moveBalloon('down');
    //         render();
    //         break;
    //     default:
    //         break;
    // }
    for (const shape in wholeBalloon) {
        wholeBalloon[shape].translateX(2);
        render();
    }
}

window.addEventListener('keydown', (e) => handleKeyDown(e));


// RANOM HELPER FUCNTIONS
const helpers = (min, max) => Math.random() * (max - min) + min;
init();
animate();
initBalloon();
render();
