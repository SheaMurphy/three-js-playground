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
    // camera.position.z = 50;
    // camera.position.y = 325;

    camera.position.z = 150;
    camera.position.y = 55;

    // CONTROLS
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.addEventListener('change', render)

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

const getRow = (numBricks, yOffset) => {
    let row = new THREE.Group();

    for (let i = 0; i < numBricks; i++) {
        let brick = getBrick();
        brick.position.x += (12 + 2) * i;
        row.add(brick);
    }

    row.position.y += 10 * yOffset;
    return row;
}

const getWall = (numBricks) => {
    let wall = new THREE.Group();
    let row = getRow();

    for (let i = 0; i < 5; i++) {
        const isEvenRow = i % 2 == 0;
        row = getRow(numBricks, i);
        isEvenRow ? row.position.x -= 5 : row.position.x += 5;
        wall.add(row);
    }

    wall.position.x -= 50;
    wall.position.y -= 25;
    return wall;
}

const getWalls = () => {
    let wallOne = getWall(8);
    wallOne.rotation.y += 30;

    let wallTwo = getWall(8);
    wallTwo.rotation.y += 30;
    wallTwo.position.x += 150;
    wallTwo.position.z -= 30;

    let wallThree = getWall(12);
    wallThree.rotation.y -= 2.95;
    wallThree.position.x += 145;
    wallThree.position.z -= 30;

    let three = new THREE.Group();
    three.add(wallOne);
    three.add(wallTwo);
    three.add(wallThree);

    three.rotation.y -= 0.2;
    three.position.z -= 100;
    three.position.x += 20;

    let wallFour = getWall(12);
    wallFour.position.z = 2;

    let walls = new THREE.Group();
    walls.add(three);
    walls.add(wallFour);

    return walls;
}

const getTower = () => {
    let tower = new THREE.Group();

    let cylinderGeo = new THREE.CylinderGeometry(20, 20, 70, 20, 20),
        cylinderMat = new THREE.MeshLambertMaterial({ color: 0x9c9b98 }),
        cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);

    let roofGeo = new THREE.ConeGeometry(25, 25, 64, 64),
        roofMat = new THREE.MeshLambertMaterial({ color: 0xd65b42 }),
        roofMesh = new THREE.Mesh(roofGeo, roofMat);

    roofMesh.position.y += 45;
    tower.position.y += 10;

    tower.add(cylinderMesh);
    tower.add(roofMesh);
    return tower;
}

const getTowers = () => {
    let towers = new THREE.Group();

    let tower = getTower();
    tower.position.x += 60;
    tower.position.z += 10;
    towers.add(tower);

    let towerTwo = getTower();
    towerTwo.position.x -= 95;
    towerTwo.position.z += 8;
    towers.add(towerTwo);

    let towerThree = getTower();
    towerThree.position.x -= 90;
    towerThree.position.z -= 118;
    towers.add(towerThree);

    let towerFour = getTower();
    towerFour.position.x += 68;
    towerFour.position.z -= 116;
    towers.add(towerFour);

    return towers;
}

const getKeep = () => {
    let keep = new THREE.Group();

    let cylinderGeo = new THREE.CylinderGeometry(30, 30, 30, 8, 8),
        cylinderMat = new THREE.MeshLambertMaterial({ color: 0x9c9b98 }),
        cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);

    let roofGeo = new THREE.ConeGeometry(35, 35, 10, 10),
        roofMat = new THREE.MeshLambertMaterial({ color: 0xd65b42 }),
        roofMesh = new THREE.Mesh(roofGeo, roofMat);

    roofMesh.position.y += 32;

    keep.add(cylinderMesh);
    keep.add(roofMesh);

    keep.position.y -= 10;

    return keep;
}

const buildCastle = () => {

    let castle = new THREE.Group();

    let walls = getWalls();
    walls.position.x -= 50;
    castle.add(walls);

    let towers = getTowers();
    castle.add(towers);

    castle.position.x += 15;
    castle.position.z += 50;

    scene.add(castle);

    let keep = getKeep();
    scene.add(keep);

}

// RANOM HELPER FUCNTIONS
const randomFloatGenerator = (min, max) => Math.random() * (max - min) + min;
const randomIntegerGenerator = (min, max) => Math.floor(Math.random() * (max - min) + min);

init();
animate();
buildCastle();
render();
