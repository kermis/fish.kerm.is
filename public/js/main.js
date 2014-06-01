var rendering = true;
var score = 0;
var ducksRemaining = 24;
var timeRemaining = 120;

var container, stats, camera, controls, scene, renderer, cross, rod, sky;
var duckPivot1, duckPivot2, duckPivot3, rodPivot, fisherObject, stringLord;
var playing, gameStarted, gameOver = false; speedMultiplier = 1, level = 1;

var ducks = [], leapObj = [], strings = [], duckTargets = [], nonPhysiStrings = [], strings = [];

var pondCenterX = -160;
var pondCenterY = 23;
var pondCenterZ = 550;

if (!Detector.webgl) Detector.addGetWebGLMessage();

$(function() {

    // Preloading all the stuff
    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("complete", handleComplete, this);
    queue.on("progress", handleProgress, this);
    queue.loadManifest([{
        id: "ammo",
        src: "/js/libs/ammo.js"
    }, {
        id: "landscape",
        src: "/models/landscape.js"
    }, {
        id: "ducky",
        src: "/models/duck.js"
    }, {
        id: "ship",
        src: "/models/pirateship.js"
    }, {
        id: "visser",
        src: "/models/visser.js"
    }, {
        id: "vogeltjesdans",
        src: "/sound/vogeltjesdans.mp3"
    }, {
        id: "quack",
        src: "/sound/quack.mp3"
    }, {
        id: "rip",
        src: "/sound/paper-rip.low.mp3"
    }]);


})

function handleComplete() {
    $('.overlay').delay(10).fadeOut('slow');
    init();
    animate();
}

function handleProgress(e) {
    var percentLoaded = Math.round(e.loaded * 100);
    $('.percentLoaded').html(percentLoaded + ' %');
    $('.progress').css('width', percentLoaded + '%')
}

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
    scene.setGravity(new THREE.Vector3(0, -1400, 0));

    builder.buildScene();

    builder.makePivots();

    builder.buildFishingRod();

    builder.buildDucks();

    builder.buildFishermen();


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

    window.addEventListener('resize', onWindowResize, false);

    rod.updateNonPhysiStringsWithThePositionsOfThePhysiStrings();

}

function animate() {

    if (rendering) {
        render();
        scene.simulate();
    }

    rod.moveRodStrings('nothing'); // --> bugfix: so the string doesn't get stuck
    requestAnimationFrame(animate);
}


function render() {

    renderer.render(scene, camera);
    try {

        duckPivot1.rotation.y += 0.002 * speedMultiplier;
        duckPivot2.rotation.y -= 0.005 * speedMultiplier;
        duckPivot3.rotation.y += 0.004 * speedMultiplier;
        sky.rotation.y -= 0.002;

    } catch (e) {
        console.log(e);
    }

    stats.update();

}

function scoreTick() {
    //ticks once a second for the score, checks for remaining time
    if (timeRemaining == 0) {
        game.endGame();
    }

    if (gameStarted && timeRemaining > 0) {

        timeRemaining -= 1;
        game.updateScoreInfo();

        setTimeout(function() {
            if(playing){
                scoreTick();
            }
        }, 1000)
    }
}
