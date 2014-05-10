var debug = false;

if (!Detector.webgl) Detector.addGetWebGLMessage();

//three.js vars
var container, stats;

var camera, controls, scene, renderer;

var cross, rod;

var sky;

var ducks = [];

//leap vars
var leapObj = {};

//socket Phone vars
var phoneObj = {};

//pivot points for ducks and other things
var duckPivot1, duckPivot2, duckPivot3, rodPivot;

//container object
var fisherObject;

//strings from the rod
var strings = [];

//cannon js variables
var world, solver;


init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 10, 10000);

    camera.position.x = -200;
    camera.position.y = 100;
    camera.position.z = 150;

    //so it's facing the water
    camera.rotation.y = 85;

    // world

    // scene = new THREE.Scene();
    Physijs.scripts.worker = '/js/libs/physijs_worker.js';
    Physijs.scripts.ammo = '/js/libs/ammo.js';


    // Pysics stuff
    scene = new Physijs.Scene({
        fixedTimeStep: 1 / 120
    });
    scene.setGravity(new THREE.Vector3(0, -800, 0));


    var pondCenterX = -160;
    var pondCenterY = 23;
    var pondCenterZ = 550;

    //Three pivot points, for three circles of ducks, at three different speeds, and radii
    duckPivot1 = new THREE.Object3D();
    duckPivot2 = new THREE.Object3D();
    duckPivot3 = new THREE.Object3D();

    duckPivot1.position.x = duckPivot2.position.x = duckPivot3.position.x = pondCenterX;
    duckPivot1.position.z = duckPivot2.position.z = duckPivot3.position.z = pondCenterZ;
    duckPivot1.position.y = duckPivot2.position.y = duckPivot3.position.y = pondCenterY;

    scene.add(duckPivot1);
    scene.add(duckPivot2);
    scene.add(duckPivot3);


    var numberOfStrings = 14;

    var str = new THREE.Object3D();
    // str.position = new THREE.Vector3(pondCenterX - 90, 40, pondCenterZ);
    scene.add(str);


    var emptyObj = new Physijs.BoxMesh(new THREE.CubeGeometry( 0, 0, 0), new THREE.MeshBasicMaterial());


    for (var i = 0; i < numberOfStrings; i++) {
        var geometry = new THREE.BoxGeometry(0.5, 9, 0.5, 1, 1, 1)
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial(),
            0.1, //friction
            0.00 //bounce
        );
        strings[i] = new Physijs.BoxMesh(geometry, material);

        strings[i].position.x = pondCenterX - 95;
        strings[i].position.z = pondCenterZ;
        strings[i].position.y = 169 - (i * 10);
        scene.add(strings[i]);
    }

    // scene.add(str);
    var x = new THREE.Vector3(pondCenterX - 95, pondCenterY + 169, pondCenterZ);

    //First contraint
    var constraint = new Physijs.HingeConstraint(
        strings[0], // First object to be constrained
        rodPivot, // OPTIONAL second object - if omitted then physijs_mesh_1 will be constrained to the scene
        x, // point in the scene to apply the constraint
        new THREE.Vector3(1, 0, 0) // Axis along which the hinge lies - in this case it is the X axis
    );
    scene.addConstraint(constraint);

    //all the other constraints
    var constraints = [];
    for (var i = 1; i < strings.length; i++) {
        // strings[i]
        constraints[i] = new Physijs.HingeConstraint(strings[i], strings[i - 1], strings[i - 1].position, new THREE.Vector3(0, 0, 1));
        scene.addConstraint(constraints[i]);
        constraints[i].setLimits(0.001, 0.01, 0.0, 0.0);
        constraints[i].enableAngularMotor(0, 0);
    };


    constraint.setLimits(
        0.001, // minimum angle of motion, in radians
        0.01, // maximum angle of motion, in radians
        0.0, // applied as a factor to constraint error
        0.0 // controls bounce at limit (0.0 == no bounce)
    );

    constraint.enableAngularMotor(0, 0);
    // constraint.disableMotor();


    //landscape
    var landscape = new THREE.ObjectLoader();
    landscape.load('/models/landscape.js', function(mesh) {
        // console.log(mesh);
        scene.add(mesh);

        var land = mesh.children[0];
        var water = mesh.children[1];

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

        for (var i = 0; i < numberOfDucks; i++) {

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
        ducks[8].rotation.set(0, deg2rad(270 + 180), 0);
        ducks[9].position.set(70 * rScale, 0, 70 * rScale);
        ducks[9].rotation.set(0, deg2rad(225 + 180), 0);
        ducks[10].position.set(0 * rScale, 0, 100 * rScale);
        ducks[10].rotation.set(0, deg2rad(180 + 180), 0);
        ducks[11].position.set(-70 * rScale, 0, 70 * rScale);
        ducks[11].rotation.set(0, deg2rad(135 + 180), 0);
        ducks[12].position.set(-100 * rScale, 0, 0 * rScale);
        ducks[12].rotation.set(0, deg2rad(90 + 180), 0);
        ducks[13].position.set(-70 * rScale, 0, -70 * rScale);
        ducks[13].rotation.set(0, deg2rad(45 + 180), 0);
        ducks[14].position.set(0 * rScale, 0, -100 * rScale);
        ducks[14].rotation.set(0, deg2rad(0 + 180), 0);
        ducks[15].position.set(70 * rScale, 0, -70 * rScale);
        ducks[15].rotation.set(0, deg2rad(315 + 180), 0);


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


    //Little Fishing Man
    fisherObject = new THREE.Object3D();
    rodPivot = new THREE.Object3D();

    fisherObject.add(rodPivot);

    var fishingRod;
    rodPivot.position.set(0, 140, -70)

    makeCrossAndSetPosition(fisherObject, rodPivot.position.x,rodPivot.position.y,rodPivot.position.z)

    var fishermen = new THREE.ObjectLoader();
    var fisherMenScale = 0.45;
    fishermen.load('/models/visser.js', function(fisherMesh) {

        //the fishing rod
        fishingRod = fisherMesh.children[0].children[0];
        fishingRod.position.set(0, 80, -55);
        rodPivot.rotation.y = deg2rad(0);
        rodPivot.add(fishingRod);

        // rodPivot.rotation.x = deg2rad(90);

        //scale the model
        fisherObject.scale.set(fisherMenScale, fisherMenScale, fisherMenScale);

        //set the dude and his seat in the middle of the pond
        fisherObject.position.set(pondCenterX, pondCenterY, pondCenterZ)

        //rotate the dude and his seat 90 degrees;
        fisherObject.rotation.y = deg2rad(90)

        //add the fisherman model to the object
        fisherObject.add(fisherMesh);

        //scale the seat of the fisherMen
        // console.log(fisherObject);
        fisherObject.children[1].children[0].children[9].scale.set(0.75, 1, 0.75);

    });

    scene.add(fisherObject);

    //
    // lights
    var light = new THREE.HemisphereLight(0xFFE7B3, 1.2)
    scene.add(light)

    //sky
    var geometrySky = new THREE.SphereGeometry(4500, 32, 32)
    var materialSky = new THREE.MeshBasicMaterial()
    materialSky.map = THREE.ImageUtils.loadTexture('../img/sky.jpg')
    materialSky.side = THREE.BackSide
    sky = new THREE.Mesh(geometrySky, materialSky)
    scene.add(sky);


    // renderer // can also be angaglyph or some other fancy stuff
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.outstretch = 2.0; // stretches the apparent z-direction
    renderer.outshift = 3.0; // makes the scene come nearer
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

    render();

    requestAnimationFrame(animate);

    scene.simulate();

    // controls.update();

}


function render() {

    renderer.render(scene, camera);
    try {

        duckPivot1.rotation.y += 0.002;
        duckPivot2.rotation.y -= 0.005;
        duckPivot3.rotation.y += 0.01;
        sky.rotation.y -= 0.002;

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

document.onkeydown = handleKeyDown;

function handleKeyDown(e) {
    //up -> 38
    //down -> 40
    //left -> 37
    //right -> 39

    switch (e.keyCode) {
        case 38:
            rodPivot.rotation.x += deg2rad(30);
            break;
        case 40:
            rodPivot.rotation.x -= deg2rad(30);
            break;
        case 37:
            fisherObject.rotation.y -= deg2rad(30);
            //the seat
            fisherObject.children[1].children[0].children[9].rotation.y += deg2rad(30);
            break;
        case 39:
            fisherObject.rotation.y += deg2rad(30);
            //the seat
            fisherObject.children[1].children[0].children[9].rotation.y -= deg2rad(30);
            break;
    }
    // var pos = rodPivot.position;
    strings[0].position.x = rodPivot.position.x;
    strings[0].position.y = rodPivot.position.y;
    strings[0].position.z = rodPivot.position.z;
    strings[0].__dirtyPosition = true;
}

setTimeout(function() {
    render();
}, 1000);


function makeCrossAndSetPosition(objectToAddTo, x,y,z){
    var geometry = new THREE.CubeGeometry(1, 100, 1)
    var material = new THREE.MeshBasicMaterial()
    var stick = new THREE.Mesh(geometry, material)
    stick.position = new THREE.Vector3( x, y, z );

    stick2 = stick.clone();
    stick2.rotation.x = deg2rad(90);

    stick3 = stick.clone();
    stick3.rotation.z = deg2rad(90);

    objectToAddTo.add(stick);objectToAddTo.add(stick2);objectToAddTo.add(stick3);

}