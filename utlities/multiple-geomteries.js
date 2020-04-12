const addShape = () => {
    let geometry = new THREE.BoxGeometry(10, 10, 10),
        material = new THREE.MeshNormalMaterial({ color: 0xff00ff }),
        num = 5,
        distance = 30;

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = distance * i;
            mesh.position.z = distance * j;
            scene.add(mesh);
        }
    }

}
