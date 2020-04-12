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
    camera.position.z = 375;
    camera.position.y = 155;
    camera.position.x = -225;



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

const addShape = () => {

    let num = 30,
        distance = 12,
        offset = 100;

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {

            const length = randomIntegerGenerator(8, 16);
            const height = randomIntegerGenerator(15, 100);
            let geometry = new THREE.BoxGeometry(length, height, length),
                color = new THREE.Color(`hsl(${randomIntegerGenerator(300, 360)}, 50%, 50%)`)
            material = new THREE.MeshLambertMaterial({ color }),
                mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = distance * i - 250;
            mesh.position.z = distance * j - offset;

            scene.add(mesh);
        }
    }
}

// RANOM HELPER FUCNTIONS
const randomFloatGenerator = (min, max) => Math.random() * (max - min) + min;
const randomIntegerGenerator = (min, max) => Math.floor(Math.random() * (max - min) + min);

init();
animate();
addShape();
render();
