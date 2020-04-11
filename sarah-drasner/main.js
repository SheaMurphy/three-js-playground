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

let basket, balloonBottom, balloonTop;

const createLathe = () => {
    var points = [];
    for (var i = 0; i < 10; i++) {
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
    }
    var geometry = new THREE.LatheGeometry(points, 29, 0, 6.3);
    var material = new THREE.MeshLambertMaterial({ color: 0xf0f8ff });
    return new THREE.Mesh(geometry, material);
}

const initBalloon = () => {
    let basketGeo = new THREE.BoxGeometry(10, 10, 10),
        balloonTopGeo = new THREE.SphereGeometry(16, 32, 32);

    const material = new THREE.MeshLambertMaterial({ color: 0xf0f8ff });

    basket = new THREE.Mesh(basketGeo, material);
    balloonTop = new THREE.Mesh(balloonTopGeo, material);
    balloonBottom = createLathe();

    // balloonBottom.scale.x = 0.8;
    // balloonBottom.scale.y = 0.8;
    // balloonBottom.scale.z = 0.8;
    // balloonBottom.position.y -= 3;

    balloonTop.position.y += 8.5;

    // scene.add(basket);
    scene.add(balloonBottom);
    scene.add(balloonTop);
}

// RANOM HELPER FUCNTIONS
const helpers = (min, max) => Math.random() * (max - min) + min;
init();
animate();
initBalloon();
// addShape();
render();
