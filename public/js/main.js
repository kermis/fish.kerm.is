// require([], function() {
//     // detect WebGL
//     if (!Detector.webgl) {
//         Detector.addGetWebGLMessage();
//         throw 'WebGL Not Available'
//     }
//     // setup webgl renderer full page
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);
//     // setup a scene and camera
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
//     camera.position.x = -200;
//     camera.position.y = 100;
//     camera.position.z = 150;

//     //so it's facing the water
//     camera.rotation.y = 85;


//     // declare the rendering loop
//     var onRenderFcts = [];

//     // handle window resize events
//     var winResize = new THREEx.WindowResize(renderer, camera)

//     //////////////////////////////////////////////////////////////////////////////////
//     //      default 3 points lightning                  //
//     //////////////////////////////////////////////////////////////////////////////////

//     // var frontLight = new THREE.DirectionalLight('white', 1)
//     // frontLight.position.set(0.5, 2.5, 2)
//     // scene.add(frontLight)


//     //////////////////////////////////////////////////////////////////////////////////
//     //      add an object and make it move                  //
//     //////////////////////////////////////////////////////////////////////////////////
//     // var geometry = new THREE.CubeGeometry(1, 1, 1);
//     // var material = new THREE.MeshPhongMaterial();
//     // var mesh = new THREE.Mesh(geometry, material);
//     // scene.add( mesh );

//     var loader1 = new THREE.ObjectLoader();
//     loader1.load('/models/landscape.js', function(mesh) {
//         // console.log(mesh);
//         scene.add(mesh);
//         mesh.position.set(0, -100, 0);

//     });


//     onRenderFcts.push(function(delta, now) {
//         // scene.rotateX(0.5 * delta);
//         // mesh.rotateY(2.0 * delta);
//     })

//     //////////////////////////////////////////////////////////////////////////////////
//     //      Camera Controls                         //
//     //////////////////////////////////////////////////////////////////////////////////

//     document.addEventListener('mousemove', function(event) {

//         // mouse.x = (event.clientX / window.innerWidth) - 0.5
//         // mouse.y = (event.clientY / window.innerHeight) - 0.5
//     }, false)

//     var camRot = {
//         y: 85,
//         x: 0
//     };
//     var camMoveAmount = 0.1;
//     document.addEventListener('keydown', function(event) {
//         console.log(event.keyCode);
//         switch (event.keyCode) {
//             case 37: //left
//                 camRot.y += camMoveAmount;
//                 break;
//             case 39: //right
//                 camRot.y -= camMoveAmount;
//                 break;
//             case 38: //up
//                 camRot.x -= camMoveAmount;
//                 break;
//             case 40: //up
//                 camRot.x += camMoveAmount;
//                 break;

//         }

//     }, false)


//     onRenderFcts.push(function(delta, now) {

//         camera.rotation.y = camRot.y;
//         camera.rotation.x = camRot.x;
//         // camera.position.x += (mouse.x * 5000 - camera.position.x) * (delta * 3)
//         // camera.position.y += (mouse.y * 700 - camera.position.y+200) * (delta * 3)
//         // camera.lookAt(scene.position)
//     })

//     //////////////////////////////////////////////////////////////////////////////////
//     //      render the scene                        //
//     //////////////////////////////////////////////////////////////////////////////////
//     onRenderFcts.push(function() {
//         renderer.render(scene, camera);
//     })

//     //////////////////////////////////////////////////////////////////////////////////
//     //      Rendering Loop runner                       //
//     //////////////////////////////////////////////////////////////////////////////////
//     var lastTimeMsec = null
//     requestAnimationFrame(function animate(nowMsec) {
//         // keep looping
//         requestAnimationFrame(animate);
//         // measure time
//         lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
//         var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
//         lastTimeMsec = nowMsec
//         // call each update function
//         onRenderFcts.forEach(function(onRenderFct) {
//             onRenderFct(deltaMsec / 1000, nowMsec / 1000)
//         })
//     })

//     //////////////////////////////////////////////////////////////////////////////////
//     //      Leap stuff                        //
//     //////////////////////////////////////////////////////////////////////////////////
//     // var controller = new Leap.Controller();

//     // controller.on('connect', function() {
//     //   console.log("Leap Successfully connected.");
//     // });

//     // controller.on('animationFrame', function(frame) {
//     //   // your code here

//     //   try{

//     //     var trsf = frame.hands[0].direction[0]+','+frame.hands[0].direction[1]+','+frame.hands[0].direction[2]+','+frame.hands[0]._rotation[0];
//     //     // console.log(frame.hands[0]._rotation[0]);
//     //     $('.debug').html(trsf);
//     //     $('#xx').css('transform','rotate3d('+trsf+')');
//     //     $('#xx').css('-webkit-transform','rotate3d('+trsf+')');

//     //      // console.log(frame.fingers[0].direction);
//     //     }
//     //     catch(e){
//     //         $('.debug').html('No fingers visible');
//     //         // console.log('no fingers in frame')
//     //     }
//     // });

//     // controller.connect();
//     //
//     //
//     //
//     // //Helper functions

// })

if (!Detector.webgl) Detector.addGetWebGLMessage();

//three.js vars
var container, stats;

var camera, controls, scene, renderer;

var cross, rod, duck;

//leap vars
var leapObj = {};

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
    // scene.add(rod);

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
        rod.rotation.y = leapObj.rotY;
        rod.rotation.z = leapObj.rotZ;
        rod.rotation.x = leapObj.rotX;

        // rod.position.x = -200 + hand.posX;
        // rod.position.y = 100 + hand.posY;
        // rod.position.z = 170 + hand.posZ;
        render();
    } catch (r) {
        console.log(r);
    }
}

// var room = 123;

// var motionReceiveName = 'motionData' + room;
// console.log(motionReceiveName);

// var socket = io.connect('http://localhost:8080');




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




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////      Socket Stuff      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var socket = io.connect('http://localhost:8080');
var socket = io.connect('http://pdntspaa.herokuapp.com');

   // let's assume that the client page, once rendered, knows what room it wants to join
var room = "abc123";

socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   socket.emit('room', room);
   console.log('joined room');
});

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});

socket.on('motionDataOut', function(data) {
   // console.log('Incoming motionData:', data);
   $('.debug').html('gamma: ' + data.gamma + ' <br>beta:' + data.beta + ' <br> alpha: ' + data.alpha);
});