var builder = {
    buildDucks: function() {
        // Ducks
        var duckScale = 0.2;
        var numberOfDucks = 24;
        var ducky = new THREE.ObjectLoader();
        // scale of the radius
        var rScale = 1;
        ducky.load('/models/duck.js', function(mesh) {

            mesh.scale.set(duckScale, duckScale, duckScale);

            for (var i = 0; i < numberOfDucks; i++) {

                var meshX = mesh.clone();

                ducks[i] = meshX;


                ducks[i].children[1].children[0].material = new THREE.MeshLambertMaterial({
                    color: '#' + getRandomColor()
                });

                ducks[i].score = Math.ceil(Math.random() * 20)

                // duckTargets, on which we test the hits
                var box = new THREE.Mesh(
                    new THREE.CubeGeometry(150, 120, 70, 1, 1, 1),
                    new THREE.MeshNormalMaterial({
                        transparent: true,
                        opacity: 0
                    }));

                duckTargets[i] = box;
                ducks[i].add(box);

                //Add the ducks to the correct pivot point/circle
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
    },
    removeDucks:function(){
    	for (var i = 0; i < ducks.length; i++) {
    		duckPivot1.remove(ducks[i]);
    		duckPivot2.remove(ducks[i]);
    		duckPivot3.remove(ducks[i]);
    	};
    	ducks = [];
    	duckTargets = [];
    },
    buildFishermen: function() {
        //Little Fishing Man
        fisherObject = new THREE.Object3D();
        rodPivot = new THREE.Object3D();

        fisherObject.add(rodPivot);

        var fishingRod;
        rodPivot.position.set(0, 140, -70)

        // makeCrossAndSetPosition(fisherObject, rodPivot.position.x, rodPivot.position.y, rodPivot.position.z)

        var fishermen = new THREE.ObjectLoader();
        var fisherMenScale = 0.45;
        fishermen.load('/models/visser.js', function(fisherMesh) {

            //the fishing rod
            fishingRod = fisherMesh.children[0].children[0];
            fishingRod.position.set(0, 125, -95);
            fishingRod.scale.set(1, 1.4, 1)
            rodPivot.rotation.y = deg2rad(0);
            rodPivot.add(fishingRod);

            //scale the model
            fisherObject.scale.set(fisherMenScale, fisherMenScale, fisherMenScale);

            //set the dude and his seat in the middle of the pond
            fisherObject.position.set(pondCenterX, pondCenterY, pondCenterZ)

            //rotate the dude and his seat 90 degrees;
            fisherObject.rotation.y = deg2rad(90)

            //add the fisherman model to the object
            fisherObject.add(fisherMesh);


        });

        scene.add(fisherObject);
    },
    buildFishingRod: function() {
        var numberOfStrings = 22;

        var str = new THREE.Object3D();
        // str.position = new THREE.Vector3(pondCenterX - 90, 40, pondCenterZ);
        scene.add(str);


        var emptyObj = new Physijs.BoxMesh(new THREE.CubeGeometry(0, 0, 0), new THREE.MeshBasicMaterial());

        var stringGeometry = new THREE.SphereGeometry(5, 5, 5)
        var stringGeometryXL = new THREE.BoxGeometry(0.5, 11, 0.5, 1, 1, 1)
        var stringMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x000000
            }),
            0.0, //friction
            0.00 //bounce
        );
        var stringMaterialTransparent = Physijs.createMaterial(
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0
            }),
            0.0, //friction
            0.00 //bounce
        );


        for (var i = 0; i < numberOfStrings; i++) {

            strings[i] = new Physijs.BoxMesh(stringGeometry, stringMaterialTransparent, 1);
            nonPhysiStrings[i] = new THREE.Mesh(stringGeometryXL, stringMaterial);

            strings[i].position.set(pondCenterX - 130, 200 - (i * 10), pondCenterZ)
            nonPhysiStrings[i].position.set(pondCenterX - 130, 200 - (i * 10), pondCenterZ)

            strings[i].__dirtyPosition = true;
            scene.add(strings[i]);
            scene.add(nonPhysiStrings[i])
        }

        var fishingBlocksScale = 5;

        nonPhysiStrings[6].scale.set(fishingBlocksScale, 1, fishingBlocksScale)
        nonPhysiStrings[17].scale.set(fishingBlocksScale, 1, fishingBlocksScale)
        nonPhysiStrings[20].scale.set(fishingBlocksScale, 1, fishingBlocksScale)

        stringLord = new Physijs.BoxMesh(stringGeometry, stringMaterial, 0);
        stringLord.position.set(pondCenterX - 130, 210, pondCenterZ);
        stringLord.__dirtyPosition = true;

        scene.add(stringLord);

        //First contraint, separate, because it has to be 'static'
        var constraint = new Physijs.HingeConstraint(
            strings[0], // First object to be constrained
            stringLord, // OPTIONAL second object
            new THREE.Vector3(stringLord.position.x, stringLord.position.y, stringLord.position.z), // point in the scene to apply the constraint
            new THREE.Vector3(1, 0, 0) //x-axis-hing
        );
        scene.addConstraint(constraint);
        constraint.setLimits(0.001, 0.01, 0.0, 0.0);

        constraint.enableAngularMotor(0, 0);



        //all the other constraints
        var constraints = [];
        for (var i = 1; i < strings.length; i++) {
            constraints[i] = new Physijs.HingeConstraint(strings[i], strings[i - 1], strings[i - 1].position, new THREE.Vector3(0, 0, 1));
            scene.addConstraint(constraints[i]);
            constraints[i].setLimits(0.001, 0.001, 0.1, 0.0);
        };
    },
    makePivots: function() {
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
    },
    buildScene: function() {
        //landscape
        var landscape = new THREE.ObjectLoader();
        landscape.load('/models/landscape.js', function(mesh) {
            scene.add(mesh);

            var land = mesh.children[0];
            var water = mesh.children[1];

        });

        var shipLoader = new THREE.ObjectLoader();
        shipLoader.load('/models/pirateship.js', function(mesh){
        	scene.add(mesh);

        	mesh.scale.set(20,20,20)
        	mesh.position.set(1600, 100, 2000);
        	mesh.rotation.y = 3;
        	mesh.rotation.z = 0.2;
        })

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
    }
}
