var duckling = {
    quack: function() {
        createjs.Sound.play('quack');
        setTimeout(function() {
            createjs.Sound.play('quack');
        }, 250)
    },
    quackalot: function() {
        //quack x 6
        createjs.Sound.play('quack');
        var quackInterval = setInterval(function() {
            createjs.Sound.play('quack')
        }, 250)
        setTimeout(function() {
            clearInterval(quackInterval)
        }, 1500)
    },
    removeDuck: function(duck) {


        if (!duck.killed) {

            duckling.quack()

            duck.killed = true;

            var pos = new THREE.Vector3();
            pos.setFromMatrixPosition(duck.matrixWorld);

            var color = duck.children[1].children[0].material.color;
            color = '#' + rgbToHex(color.r * 255, color.g * 255, color.b * 255);

            game.showScore(pos.x, pos.y + 10, pos.z - 10, duck.score, color)


            score += duck.score;

            duckling.killTheDuck(duck);

            ducksRemaining--;
            if (ducksRemaining == 0) {

                setTimeout(function() {
                    game.endGame();
                }, 2000);
            };

            game.updateScoreInfo();
        }
    },
    killTheDuck: function(duck) {
        var intval = setInterval(function() {
            duck.position.y += 0.5
            duck.scale.x = duck.scale.x * 0.9;
            duck.scale.y = duck.scale.y * 0.9;
            duck.scale.z = duck.scale.z * 0.9;
            // duck.rotation.z += 0.1
        }, 20)

        setTimeout(function() {
            duckPivot1.remove(duck);
            duckPivot2.remove(duck);
            duckPivot3.remove(duck);
            clearInterval(intval);
        }, 2000)

    },
    checkCollision: function() {

        var duckHit = false;

        var stringsYouCanCatchWith = [strings[6], strings[17], strings[20]]

        // console.log('stringX ->', strings[17].position.x)

        duckPivot1.updateMatrixWorld();
        duckPivot2.updateMatrixWorld();
        duckPivot3.updateMatrixWorld();

        var marge = 15;

        for (var i = 0; i < ducks.length; i++) {
            ducks[i].updateMatrixWorld();
            var vector = new THREE.Vector3();
            vector.setFromMatrixPosition(duckTargets[i].matrixWorld);

            var str1 = new THREE.Vector3(strings[6].position.x, strings[6].position.y, strings[6].position.z);
            var str2 = new THREE.Vector3(strings[17].position.x, strings[17].position.y, strings[17].position.z);
            var str3 = new THREE.Vector3(strings[20].position.x, strings[20].position.y, strings[20].position.z);


            if (vector.distanceTo(str1) < marge || vector.distanceTo(str2) < marge || vector.distanceTo(str3) < marge) {
                duckling.removeDuck(ducks[i]);
                duckHit = true;
            }

        };

        if (!duckHit) {
            score -= 5;
        } else {
            timeRemaining += 2;
        }

        game.updateScoreInfo();
    }
}
