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
renderer.setClearColor('#F0F8FF');
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
})


// SHAPES

// SPHERE
let geometry = new THREE.SphereGeometry(1, 100, 100);

// Box
// let geometry = new THREE.BoxGeometry(1, 1, 0.5);
let material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });
let mesh = new THREE.Mesh(geometry, material)
mesh.position.y = -2;
let meshPostionX = 0;

let blockGeo = new THREE.BoxGeometry(1000, 0, 0);
let blockMaterial = new THREE.MeshLambertMaterial({ color: 0xefefee });
let blockMesh = new THREE.Mesh(blockGeo, blockMaterial);
blockMesh.position.y = -2;
blockMesh.position.z = 2;


// rabbitMesh.position.z = 2;

scene.add(mesh);
scene.add(blockMesh);

let light = new THREE.PointLight(0xFFFFFF, 1, 500);
let lightPostions = [-100, 0, 5];

const setUpLight = () => {
    light.position.set(...lightPostions);
    scene.add(light);
}

const moveLight = () => {

    let x = lightPostions[0];
    let y = lightPostions[1];

    if (x >= -100 && x < 0 && y >= 0 && y < 100) {
        x += 0.5;
        y += 0.5;
    } else if (x >= 0 && x < 100 && y <= 100 && y > 0) {
        x += 0.5;
        y -= 0.5;
    } else if (x <= 100 && x > 0 && y <= 0 && y > -100) {
        x -= 0.5;
        y -= 0.5;
    } else {
        x -= 0.5;
        y += 0.5;
    }

    lightPostions[0] = x;
    lightPostions[1] = y;

    //     if (lightPostions[0] < 0) {
    //         lightPostions[0] += 1;
    //         lightPostions[1] += 1;
    //     } else if (lightPostions[0] < 100) {
    //         lightPostions[0] += 1;
    //         lightPostions[1] -= 1;
    // }
}

// Recursive function redraws every time screen is refreshed (around 60 frames per second)
const render = () => {
    requestAnimationFrame(render);
    mesh.position.x = meshPostionX;
    moveLight();
    setUpLight();
    renderer.render(scene, camera);
}

render();

// const moveShape = (direction) => {
//     direction === 'left' ? meshPostionX -= 0.1 : meshPostionX += 0.1;
// }

// window.addEventListener('keydown', (e) => {
//     e.keyCode === 37 ? moveShape('left') : e.keyCode === 39 ? moveShape('right') : null;
// })

let currentPos = 30;

const moveRabbit = (direction) => {
    direction === 'left' ? currentPos -= 10 : currentPos += 10;
    rabbit.style.left = `${currentPos}px`
}

window.addEventListener('keydown', (e) => {
    e.keyCode === 37 ? moveRabbit('left') : e.keyCode === 39 ? moveRabbit('right') : null;
})

// GSAP (2nd CDN) Timeline for stringing animations

// this.tl = new TimelineMax().delay(.3);
// this.tl.to(mesh.scale, 1, { x: 2, ease: Expo.easeOut })
// this.tl.to(mesh.scale, 1, { y: 2, ease: Expo.easeOut }, "-=1")
// this.tl.to(mesh.scale, 1, { z: 2, ease: Expo.easeOut }, "-=1")
// this.tl.to(mesh.rotation, 3, { y: 4, ease: Expo.easeOut })
const rabbit = document.getElementById('rabbit');
rabbit.style.left = '30px';
setTimeout(() => rabbit.classList.remove('rabbitLoad'), 6000)