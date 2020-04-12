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

    lightTwo.position.set(1, 1, 1);

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

const buildWall = () => {
    let wall = new THREE.Group();
    let row = getRow();

    for (let i = 0; i < 5; i++) {
        row = getRow(i);
        wall.add(row);
    }

    scene.add(wall);
}

const getRow = (yOffset) => {
    let row = new THREE.Group();

    for (let i = 0; i < 5; i++) {
        let brick = getBrick();
        brick.position.x += (12 + 2) * i;
        row.add(brick);
    }

    row.position.y += 10 * yOffset;
    return row;
}

const getBrick = () => {
    let length = 12, width = 8;

    let shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    let extrudeSettings = {
        steps: 2,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings),
        randomGrey = randomIntegerGenerator(100, 175),
        color = new THREE.Color(`rgb(${randomGrey}, ${randomGrey}, ${randomGrey})`),
        material = new THREE.MeshLambertMaterial({ color });

    return new THREE.Mesh(geometry, material);
}



// RANOM HELPER FUCNTIONS
const randomFloatGenerator = (min, max) => Math.random() * (max - min) + min;
const randomIntegerGenerator = (min, max) => Math.floor(Math.random() * (max - min) + min);

init();
animate();
buildWall();
render();
