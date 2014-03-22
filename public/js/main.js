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
    var rodgeometry = new THREE.CubeGeometry(1, 20, 1);
    var rodmaterial = new THREE.MeshLambertMaterial({
        color: 0xA1582B
    });
    rod = new THREE.Mesh(rodgeometry, rodmaterial);
    rod.position.x = -200;
    rod.position.y = 100;
    rod.position.z = 170;
    rod.rotation.y = 0.5;
    rod.rotation.x = 0.8;
    scene.add(rod);

    // renderer

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
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

setTimeout(function() {
    render();
}, 1000);


////////////////////////////////////////////////////////////////////////////////
//      Leap stuff                        //
//////////////////////////////////////////////////////////////////////////////////
var controller = new Leap.Controller();

controller.on('connect', function() {
    console.log("Leap Successfully connected.");
});

controller.on('animationFrame', function(frame) {
    // your code here
    try {
        var pointables = frame.hands;
        // leapObj.posX = (pointables[0].palmPosition[0]);
        // leapObj.posY = (pointables[0].palmPosition[2]);
        // leapObj.posZ = (pointables[0].palmPosition[1]);
        leapObj.rotX = (pointables[0]._rotation[2]);
        leapObj.rotY = (pointables[0]._rotation[1]);
        leapObj.rotZ = (pointables[0]._rotation[0]);

        // console.log(hand.rotY, rod.rotation.y);
        $('.debug').html(pointables.length + ' pointables visible');
        updateRod();

    } catch (e) {
        $('.debug').html('No fingers visible');
        // console.log('no fingers in frame')
    }
});

controller.connect();

function updateRod() {
    // console.log('x')
    try {
        // rod.rotation.y = leapObj.rotY;
        // rod.rotation.z = leapObj.rotZ;
        // rod.rotation.x = leapObj.rotX;
        rod.rotation.y = phoneObj.rotY;
        rod.rotation.z = phoneObj.rotZ;
        rod.rotation.x = phoneObj.rotX;

        // rod.position.x = -200 + hand.posX;
        // rod.position.y = 100 + hand.posY;
        // rod.position.z = 170 + hand.posZ;
        render();
    } catch (r) {
        console.log(r);
    }
}


//frame data from pointables[0]
// {
//     "currentFrameRate": 110.353,
//     "gestures": [],
//     "hands": [{
//         "direction": [0.175676, 0.712037, -0.679809],
//         "id": 91,
//         "palmNormal": [0.066374, -0.697544, -0.713461],
//         "palmPosition": [-11.5446, 111.338, 121.84],
//         "palmVelocity": [-16.6101, 13.4554, 37.319],
//         "r": [
//             [0.998765, -0.0377558, -0.0322841],
//             [0.0376253, 0.999281, -0.00464149],
//             [0.0324361, 0.00342106, 0.999468]
//         ],
//         "s": 0.964387,
//         "sphereCenter": [-20.4518, 121.949, 82.7682],
//         "sphereRadius": 57.6195,
//         "stabilizedPalmPosition": [-11.437, 111.156, 121.517],
//         "t": [13.2385, -27.7748, 9.86725],
//         "timeVisible": 4.95334
//     }],
//     "id": 104202,
//     "interactionBox": {
//         "center": [0, 200, 0],
//         "size": [218.235, 218.235, 159.739]
//     },
//     "pointables": [{
//         "direction": [0.114013, 0.222534, -0.968235],
//         "handId": 91,
//         "id": 65,
//         "length": 88.9332,
//         "stabilizedTipPosition": [28.3325, 151.65, 36.7221],
//         "timeVisible": 0.723107,
//         "tipPosition": [28.3325, 151.65, 36.7221],
//         "tipVelocity": [32.4968, 121.294, 84.2556],
//         "tool": true,
//         "touchDistance": 0.429397,
//         "touchZone": "hovering",
//         "width": 7.95148
//     }],
//     "r": [
//         [0.447448, -0.365734, -0.816106],
//         [-0.370331, -0.906411, 0.203162],
//         [-0.81403, 0.211325, -0.541015]
//     ],
//     "s": -74.2159,
//     "t": [2239.6, -11758, 3927.1],
//     "timestamp": 35002793167
// },




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////      Socket Stuff      ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var currentURL = window.location.href;
var loc = window.location;
if(loc.port != undefined && loc.port > 1){
    var currentURL = loc.protocol + '//' + loc.hostname + ':' + loc.port;
}else{
    var currentURL = loc.protocol + '//' + loc.hostname;
}
console.log(window.location);
console.log(currentURL)

var socket = io.connect(currentURL);

   // let's assume that the client page, once rendered, knows what room it wants to join
var room = generateRoomId();

$(function(){
    $('.urlFounded').html(currentURL);
    $('.roomGenerated').html(room);
    $('.instruct').fadeIn('fast')
})

socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   socket.emit('room', room);
   socket.emit('message', {msg: 'client joined room with ID '+ room});
   console.log('joined room');
});

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});

socket.on('motionDataOut', function(data) {
   // console.log('Incoming motionData:', data);
   // Tilt Left/Right [gamma]
   // Tilt Front/Back [beta]
   // Direction [alpha]

   $('.debug').html('gamma: ' + data.gamma + ' <br>beta:' + data.beta + ' <br> alpha: ' + data.alpha);
   phoneObj.rotY = deg2rad(data.alpha);
   phoneObj.rotX = deg2rad(data.beta);
   phoneObj.rotZ = deg2rad(data.gamma);

   updateRod();
});

function deg2rad(angle) {

  return angle * .017453292519943295; // (angle / 180) * Math.PI;
}

function rad2deg(angle) {

  return angle * 57.29577951308232; // angle / Math.PI * 180
}

function generateRoomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}