var debug = false;

if (!Detector.webgl) Detector.addGetWebGLMessage();

//three.js vars
var container, stats;

var camera, controls, scene, renderer;

var cross, rod;

var ducks = [];

//leap vars
var leapObj = {};

//socket Phone vars
var phoneObj = {};

//pivot points for ducks
var duckPivot1, duckPivot2, duckPivot3;

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

    //Three pivot points, for three circles of ducks, at three different speeds
    duckPivot1 = new THREE.Object3D();
    duckPivot2 = new THREE.Object3D();
    duckPivot3 = new THREE.Object3D();

    duckPivot1.position.x = duckPivot2.position.x = duckPivot3.position.x = -160;
    duckPivot1.position.z = duckPivot2.position.z = duckPivot3.position.z = 550;
    duckPivot1.position.y = duckPivot2.position.y = duckPivot3.position.y = 23;

    scene.add(duckPivot1);
    scene.add(duckPivot2);
    scene.add(duckPivot3);


    //landscape
    var landscape = new THREE.ObjectLoader();
    landscape.load('/models/landscape.js', function(mesh) {
        // console.log(mesh);
        scene.add(mesh);

        var land = mesh.children[0];
        var water = mesh.children[1];

        mesh.position.set(0, -200, 0);

    });


    // Ducks
    var duckScale = 0.2;
    var numberOfDucks = 24;
    var ducky = new THREE.ObjectLoader();
    // scale of the radius
    var rScale = 1;
    ducky.load('/models/duck.js', function(mesh) {
        //console.log(duck);

        mesh.scale.set(duckScale, duckScale, duckScale);
        mesh.position.set(-200, 23, 400);
        for (var i = 0; i < numberOfDucks-1; i++) {

            //clone the mesh, so we can have moe then one duck
            var meshX = mesh.clone();
            ducks[i] = meshX;

            // give random color;
            // for (var i = 0; i < meshX.children[4].children.length; i++) {
            //     var mat = meshX.children[4].children[i].material;
            //     mat.color.r = Math.random();
            //     mat.color.g = Math.random();
            //     mat.color.b = Math.random();
            //     //console.log(mat.color)
            // };


            ducks[i].position.set(100, 0, 0);
            if (i < 8) {
                ducks[i].scale.x = ducks[i].scale.y = ducks[i].scale.z = 1 * duckScale;
                duckPivot1.add(ducks[i])
            } else if (i < 16) {
                ducks[i].scale.x = ducks[i].scale.y = ducks[i].scale.z = 0.75 * duckScale;
                duckPivot2.add(ducks[i])
            } else {
                ducks[i].scale.x = ducks[i].scale.y = ducks[i].scale.z = 0.5 * duckScale;
                duckPivot3.add(ducks[i])
            }


        };
        rScale = 2
        ducks[0].position.set(100 * rScale, 0, 0 * rScale);
        ducks[0].rotation.set(0, deg2rad(270), 0);

        ducks[1].position.set(70 * rScale, 0, 70 * rScale);
        ducks[1].rotation.set(0, deg2rad(225), 0);

        ducks[2].position.set(0 * rScale, 0, 100 * rScale);
        ducks[2].rotation.set(0, deg2rad(180), 0);

        ducks[3].position.set(-70 * rScale, 0, 70 * rScale);
        ducks[3].rotation.set(0, deg2rad(135), 0);

        ducks[4].position.set(-100 * rScale, 0, 0 * rScale);
        ducks[4].rotation.set(0, deg2rad(90), 0);

        ducks[5].position.set(-70 * rScale, 0, -70 * rScale);
        ducks[5].rotation.set(0, deg2rad(45), 0);

        ducks[6].position.set(0 * rScale, 0, -100 * rScale);
        ducks[6].rotation.set(0, deg2rad(0), 0);

        ducks[7].position.set(70 * rScale, 0, -70 * rScale);
        ducks[7].rotation.set(0, deg2rad(315), 0);


        rScale = 1.3;
        ducks[8].position.set(100 * rScale, 0, 0 * rScale);
        ducks[8].rotation.set(0, deg2rad(270), 0);
        ducks[9].position.set(70 * rScale, 0, 70 * rScale);
        ducks[9].rotation.set(0, deg2rad(225), 0);
        ducks[10].position.set(0 * rScale, 0, 100 * rScale);
        ducks[10].rotation.set(0, deg2rad(180), 0);
        ducks[11].position.set(-70 * rScale, 0, 70 * rScale);
        ducks[11].rotation.set(0, deg2rad(135), 0);
        ducks[12].position.set(-100 * rScale, 0, 0 * rScale);
        ducks[12].rotation.set(0, deg2rad(90), 0);
        ducks[13].position.set(-70 * rScale, 0, -70 * rScale);
        ducks[13].rotation.set(0, deg2rad(45), 0);
        ducks[14].position.set(0 * rScale, 0, -100 * rScale);
        ducks[14].rotation.set(0, deg2rad(0), 0);
        ducks[15].position.set(70 * rScale, 0, -70 * rScale);
        ducks[15].rotation.set(0, deg2rad(315), 0);


        rScale = 0.8
        ducks[16].position.set(100 * rScale, 0, 0 * rScale);
        ducks[16].rotation.set(0, deg2rad(270), 0);
        ducks[17].position.set(70 * rScale, 0, 70 * rScale);
        ducks[17].rotation.set(0, deg2rad(225), 0);
        ducks[18].position.set(0 * rScale, 0, 100 * rScale);
        ducks[18].rotation.set(0, deg2rad(180), 0);
        ducks[19].position.set(-70 * rScale, 0, 70 * rScale);
        ducks[19].rotation.set(0, deg2rad(135), 0);
        ducks[20].position.set(-100 * rScale, 0, 0 * rScale);
        ducks[20].rotation.set(0, deg2rad(90), 0);
        ducks[21].position.set(-70 * rScale, 0, -70 * rScale);
        ducks[21].rotation.set(0, deg2rad(45), 0);
        ducks[22].position.set(0 * rScale, 0, -100 * rScale);
        ducks[22].rotation.set(0, deg2rad(0), 0);
        ducks[23].position.set(70 * rScale, 0, -70 * rScale);
        ducks[23].rotation.set(0, deg2rad(315), 0);



    });

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
    // scene.add(rod);

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


function render() {

    renderer.render(scene, camera);
    try {

        duckPivot1.rotation.y += 0.002;
        duckPivot2.rotation.y += 0.005;
        duckPivot3.rotation.y += 0.01;

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
