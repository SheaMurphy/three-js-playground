// BASIC SETUP STEPS

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
})


// SHAPES

// SPHERE
// let geometry = new THREE.SphereGeometry(1, 100, 100);

// Box
let geometry = new THREE.BoxGeometry(1, 1);
let material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });
let mesh = new THREE.Mesh(geometry, material);
let meshPostionX = 0;

scene.add(mesh);

let light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

// Recursive function redraws every time screen is refreshed (around 60 frames per second)
const render = () => {
    requestAnimationFrame(render);
    mesh.position.x = meshPostionX;
    renderer.render(scene, camera);
}

render();

const moveShape = (direction) => {

    direction === 'left' ? meshPostionX -= 1 : meshPostionX += 1;
}

window.addEventListener('keyup', (e) => {
    e.keyCode === 37 ? moveShape('left') : e.keyCode === 39 ? moveShape('right') : null;
})