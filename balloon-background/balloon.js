class Balloon {

    wholeBalloon;
    balloonTop;
    balloonBottom;
    basket;

    constructor() {

    }

    init = () => {
        let basketGeo = new THREE.BoxGeometry(7, 7, 7),
            balloonTopGeo = new THREE.SphereGeometry(16, 32, 32);

        // const material = new THREE.MeshLambertMaterial({ color: 0xf0f8ff });

        const balloonTexture = new THREE.TextureLoader().load('blue-waves.jpg');
        const balloonMaterial = new THREE.MeshLambertMaterial({ map: balloonTexture });

        const basketTexture = new THREE.TextureLoader().load('wicker.jpg');
        const basketMaterial = new THREE.MeshLambertMaterial({ map: basketTexture });

        this.basket = new THREE.Mesh(basketGeo, basketMaterial);
        this.balloonTop = new THREE.Mesh(balloonTopGeo, balloonMaterial);
        this.balloonBottom = createLathe();

        const topExtra = 8.5;

        this.balloonTop.position.y += 42.5;
        this.balloonBottom.position.y += 36;
        this.basket.position.y += 20;

        this.wholeBalloon = { balloonBottom, balloonTop, basket };
    }

    moveBalloon = (direction) => {
        switch (direction) {
            case 'left':
                for (const shape in wholeBalloon) {
                    wholeBalloon[shape].translateX(-0.2);
                }
                break;

            case 'right':
                for (const shape in wholeBalloon) {
                    wholeBalloon[shape].translateX(0.2);
                }
                break;
            case 'up':
                for (const shape in wholeBalloon) {
                    wholeBalloon[shape].translateY(0.2);
                }
                break;
            case 'down':
                for (const shape in wholeBalloon) {
                    wholeBalloon[shape].translateY(0.2);
                }
                break;
            default:
                break;

        }
    }

    setStart = () => {
        for (const shape in balloon.wholeBalloon) {
            wholeBalloon[shape].scale.set(0.75, 0.75, 0.75);
            wholeBalloon[shape].position.x -= 150;

            animateBalloon();
        }
    }

    animate = () => {
        if (wholeBalloon.balloonTop.position.x < 400) {
            moveBalloon('right');
            setTimeout(animateBalloon, 20)
            for (const shape in wholeBalloon) {
                wholeBalloon[shape].translateZ(-0.05);
            }
        }
        else {
            for (const shape in wholeBalloon) {
                wholeBalloon[shape].translateX(-500);
            }
        }
    }
}