var game = {
	music: null,
    start: function() {
        $('.info').fadeOut();
        rendering = true;
        playing = true;
        gameStarted = true;
        $('.info-score').addClass('active')

        this.music = createjs.Sound.play("vogeltjesdans", {
            loop: -1,
            volume: 0.5
        });

        scoreTick();

    },
    pause: function() {
        if (playing) {
        	game.music.pause();
        	playing = false;
        	rendering = false;
            $('.pause').fadeIn(100);
        }else{
        	$('.pause').fadeOut(100);
        	playing = true;
        	rendering = true;
        	game.music.resume();
        	scoreTick();
        }
    },
    endGame: function() {
        var newTicket = $('.info-score').clone();
        newTicket.removeClass('active');
        newTicket.removeClass('ripping');

        rendering = false;
        gameStarted = false;
        $('.info-score').addClass('ripping');
        createjs.Sound.play('rip', {
            volume: 0.3
        });
        setTimeout(function() {

        	//TODO: add level*remaningTime to score

            $('.info-score').removeClass('ripping').addClass('big')
            $('.next-level-button').delay(2500).fadeIn()
            $('.ticket-holder').append(newTicket)
        }, 1000)
    },
    updateScoreInfo: function() {

        if (score <= 0) {
            score = 0;
        }

        $('.info-score .score').html(score);
        $('.info-score .subtitle').html('level ' + level);
        $('.info-score .ducks_remaining .ducks').html(ducksRemaining);
        $('.info-score .time_remaining .time').html(timeRemaining);

    },
    nextLevel: function() {
        $('.big').css({
            right: '500%'
        });
        //only do this after the big ticket is gone from the screen
        setTimeout(function() {
            $('.big').remove();

            level++;
            timeRemaining = Math.round(200 / level);

            builder.removeDucks();
            builder.buildDucks();

            ducksRemaining = 24;

            speedMultiplier += 0.4;

            playing = true;
            gameStarted = true;
            rendering = true;


            game.updateScoreInfo();
            $('.info-score').addClass('active');

            scoreTick();
        }, 500)
    },
    showScore: function(posX, posY, posZ, score, color) {

        var materialFront = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1
        });

        var materialSide = new THREE.MeshBasicMaterial({
            color: '#FFF',
            transparent: true,
            opacity: 0.5
        });

        var materialArray = [materialFront, materialSide];

        var textGeom = new THREE.TextGeometry(score, {
            size: 10,
            height: 4,
            curveSegments: 3,
            font: "helvetiker",
            weight: "bold",
            style: "normal",
            bevelThickness: 0,
            bevelSize: 0,
            bevelEnabled: false,
            material: 0,
            extrudeMaterial: 1
        });
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var textMesh = new THREE.Mesh(textGeom, textMaterial);

        textGeom.computeBoundingBox();
        var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
        textMesh.position.set(posX, posY, posZ);
        textMesh.rotation.set(0, 3.141592653, 0);

        scene.add(textMesh);

        var positionInterval = setInterval(function() {
            textMesh.position.y += 0.4;
        }, 20);
        var opacityInterval;

        setTimeout(function() {
            opacityInterval = setInterval(function() {
                textMesh.material.materials[0].opacity -= 0.1;
                textMesh.material.materials[1].opacity -= 0.1;
            }, 150)
        }, 300);

        setTimeout(function() {
            clearInterval(positionInterval)
            clearInterval(opacityInterval)
            scene.remove(textMesh);
        }, 3000)


    }
}
