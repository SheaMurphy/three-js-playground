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
    controls = new THREE.TrackBallControls(camera);
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

const animation = () => {
    requestAnimationFrame(animate);
    controls.update();
}

const handleResize = () => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    controls.handleResize();
}

init();
animate();
render();