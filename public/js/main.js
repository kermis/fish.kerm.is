var debug = true;

if (!Detector.webgl) Detector.addGetWebGLMessage();

//three.js vars
var container, stats;

var camera, controls, scene, renderer;

var cross, rod, duck;

//leap vars
var leapObj = {};

//socket Phone vars
var phoneObj = {};

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.01, 10000);
    // camera.position.x = -260;
    // camera.position.y = 900;
    // camera.position.z = -1700;

    // //so it's facing the water
    // camera.rotation.x= -2.67462254031122
    // camera.rotation.y= -0.22271657229140362
    // camera.rotation.z= -2.9402317812933236
    // // These are for fancy overview

    camera.position.x = -200;
    camera.position.y = 100;
    camera.position.z = 150;

    //so it's facing the water
    camera.rotation.y = 85;

    // world

    scene = new THREE.Scene();
    // scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    //landscape
    var loader1 = new THREE.ObjectLoader();
    loader1.load('/models/landscape.js', function(mesh) {
        // console.log(mesh);
        scene.add(mesh);
        mesh.position.set(0, -200, 0);

    });

    var duckScale = 0.2;
    var ducky = new THREE.ObjectLoader();
    ducky.load('/models/duck.js', function(mesh) {
        duck = mesh;
        mesh.scale.set(duckScale, duckScale, duckScale);
        mesh.position.set(-200, 23, 400);
        scene.add(mesh);

    });
    // duck = ducky;
    //
    // lights
    var light = new THREE.HemisphereLight(0xFFE7B3, 1.2)
    scene.add(light)

    //sky
    var geometrySky = new THREE.SphereGeometry(4500, 32, 32)
    var materialSky = new THREE.MeshBasicMaterial()
    materialSky.map = THREE.ImageUtils.loadTexture('../img/sf2.jpg')
    materialSky.side = THREE.BackSide
    var sky = new THREE.Mesh(geometrySky, materialSky)
    scene.add(sky);

    //fishing rod
    var rodgeometry = new THREE.CubeGeometry(1, 80, 1);
    var rodmaterial = new THREE.MeshLambertMaterial({
        color: 0xA1582B
    });
    rod = new THREE.Mesh(rodgeometry, rodmaterial);
    rod.position.x = -200;
    rod.position.y = 90;
    rod.position.z = 160;
    rod.rotation.y = 0.5;
    rod.rotation.x = 0.8;
    scene.add(rod);

    // renderer

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.outstretch = 2.0; // stretches the apparent z-direction
    renderer.outshift = 3.0; // makes the scene come ne.earer
    // renderer.setClearColor(scene.fog.color, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    // controls.handleResize();

    render();

}

function animate() {

    // console.log(duck);
    render();

    requestAnimationFrame(animate);
    // controls.update();

}

var duckDirection = 'R';

function render() {

    renderer.render(scene, camera);
    try {
        if (duck.position.x < -300) {
            duckDirection = 'L';
        }
        if (duck.position.x > 0) {
            duckDirection = 'R'
        }
        if (duckDirection == 'L') {
            // duck.rotation.y = 180 * Math.PI / 180;
            duck.rotation.y += 1 * Math.PI / 180;
            duck.position.x += 1;
        }
        if (duckDirection == 'R') {
            duck.rotation.y += 1 * Math.PI / 180;
            duck.position.x -= 1;
        }

        // console.log(duck.position.x)


        // console.log(duck.position);
    } catch (e) {}
    stats.update();

}

function updateRod() {
    // console.log('x')
    try {
        if (leapController.leapConnected) {
            rod.rotation.y = leapController.leapObj.rotY;
            rod.rotation.z = leapController.leapObj.rotZ;
            rod.rotation.x = leapController.leapObj.rotX;
        } else {
            rod.rotation.y = socketController.phoneObj.rotY;
            rod.rotation.z = socketController.phoneObj.rotZ;
            rod.rotation.x = socketController.phoneObj.rotX;
        }
        // rod.position.x = -200 + hand.posX;
        // rod.position.y = 100 + hand.posY;
        // rod.position.z = 170 + hand.posZ;
        render();
    } catch (r) {
        console.log(r);
    }
}

setTimeout(function() {
    render();
}, 1000);