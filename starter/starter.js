let scene, camera, renderer, shape;

let xRotation = 0;
let yRotation = 0.005;

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // initCube();
    initSphere();

    camera.position.z = 10;
}

const initCube = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 4);
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const texture = new THREE.TextureLoader().load('brick.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    shape = new THREE.Mesh(geometry, material);
    scene.add(shape);
}

const initSphere = () => {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const texture = new THREE.TextureLoader().load('planet-x.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    shape = new THREE.Mesh(geometry, material);
    scene.add(shape);
}

const animate = () => {
    requestAnimationFrame(animate);

    shape.rotation.x += xRotation;
    shape.rotation.y += yRotation;

    renderer.render(scene, camera);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const rotatePlanet = (direction) => {
    switch (direction) {
        case 'left':
            yRotation -= 0.0025;
            break;
        case 'right':
            yRotation += 0.0025;
            break;
        case 'up':
            xRotation += 0.0025;
            break;
        case 'down':
            xRotation -= 0.0025;
            break;
        default:
            xRotation = 0;
            yRotation = 0;
            break;


    }
}

const onWindowKeyPress = (e) => {

    switch (e.keyCode) {
        case 32:
            rotatePlanet('stop');
            break;
        case 38:
            zoomCamera('in');
            break;
        case 40:
            zoomCamera('out');
            break;
        case 65:
            rotatePlanet('left');
            break;
        case 68:
            rotatePlanet('right');
            break;
        case 83:
            rotatePlanet('down');
            break;
        case 87:
            rotatePlanet('up');
            break;
        default:
            null;
            break;
    }

}

const zoomCamera = (direction) => {
    direction === 'in' ? camera.position.z += 0.1 : camera.position.z -= 0.1;
}

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keydown', onWindowKeyPress);


init();
animate();