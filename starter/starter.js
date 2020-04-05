let scene, camera, renderer, shape, raycaster;

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

    // Click stuff
    raycaster = new THREE.Raycaster();

    // starting zoom
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
    const texture = new THREE.TextureLoader().load('world.jpg');
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

// Experimenting code - not needed for three.js setup

const reset = () => {
    xRotation = 0;
    yRotation = 0.005;
    scene.remove(shape);
    initSphere();
    document.getElementById('planet-tag').innerHTML = 'Earth';
    chosenPlanetPosition = planets.length;
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
        case 67:
            togglePlanets();
            break;
        case 68:
            rotatePlanet('right');
            break;
        case 82:
            reset();
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

const zoomCamera = (direction) => {
    direction === 'in' ? camera.position.z += 0.1 : camera.position.z -= 0.1;
}

const planets = ['mercurymap.jpg', 'venusmap.jpg', 'world.jpg', 'mars.jpg', 'jupiter.jpg', 'saturnmap.jpg', 'uranus.jpg', 'neptune.jpg', 'brick.jpg'];
let chosenPlanetPosition = planets.length;

const getPlanet = () => {
    chosenPlanetPosition++;
    if (chosenPlanetPosition > planets.length - 1) chosenPlanetPosition = 0;
    return planets[chosenPlanetPosition];
}

const updatePlanetTagHTML = () => {
    let tag;
    switch (chosenPlanetPosition) {
        case 0:
            tag = 'mercury';
            break;
        case 1:
            tag = 'venus';
            break;
        case 2:
            tag = 'earth';
            break;
        case 3:
            tag = 'mars';
            break;
        case 4:
            tag = 'jupiter';
            break;
        case 5:
            tag = 'saturn';
            break;
        case 6:
            tag = 'uranus';
            break;
        case 7:
            tag = 'neptune';
            break;
        default:
            tag = 'brick';
            break;
    }
    document.getElementById('planet-tag').innerHTML = tag;
}

const togglePlanets = () => {
    shape.material.map = THREE.ImageUtils.loadTexture(getPlanet());
    shape.material.needsUpdate = true;
    updatePlanetTagHTML();
}

// let isMouseDown = false;
// let mouseDownIntersects = false;
// mouse = new THREE.Vector2();
// let mouseX;
// let mouseY;
// let body = document.body;

// const checkIntersect = () => {
//     raycaster.setFromCamera(mouse, camera);
//     var intersects = raycaster.intersectObject(shape);
//     intersects.length > 0 ? mouseDownIntersects = true : mouseDownIntersects = false;
//     console.log(mouseDownIntersects)
// }

// const handleMouseDown = (e) => {
//     isMouseDown = true;
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// }

// const handleMouseUp = () => {
//     isMouseDown = false;
//     rotatePlanet('stop')
//     mouseX = 0;
//     mouseY = 0;
// }

// const handleMouseMove = (e) => {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
//     checkIntersect();
//     // mouseDownIntersects ? body.style.cursor = 'grab' : body.style.cursor = 'auto';

//     if (isMouseDown && mouseDownIntersects) {
//         if (e.clientX > mouseX) rotatePlanet('right');
//         else if (e.clientX < mouseX) rotatePlanet('left');
//         else if (e.clientY < mouseY) rotatePlanet('down');
//         else if (e.clientY > mouseY) rotatePlanet('up');
//         else rotatePlanet('stop')
//     }
// }

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keydown', onWindowKeyPress);
// window.addEventListener('mousedown', handleMouseDown);
// window.addEventListener('mouseup', handleMouseUp);
// window.addEventListener('mousemove', handleMouseMove);

init();
animate();