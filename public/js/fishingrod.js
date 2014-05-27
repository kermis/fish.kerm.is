var rod = {
    setRodAndStringPosition: function(rotation) {
        var zSet = 0;
        var xSet = 0;

        var rodLengthFromPivot = 160;

        var xPos = (Math.cos(deg2rad(rotation)) * rodLengthFromPivot);
        var yPos = (Math.sin(deg2rad(rotation)) * rodLengthFromPivot);

        stringLord.position.set(-(192 + xPos),
            86 + yPos,
            fisherObject.position.z
        );
        stringLord.__dirtyPosition = true;
    },
    updateNonPhysiStringsWithThePositionsOfThePhysiStrings: function() {
        for (var i = 0; i < strings.length; i++) {
            nonPhysiStrings[i].position.set(strings[i].position.x, strings[i].position.y, strings[i].position.z)
            nonPhysiStrings[i].rotation.set(strings[i].rotation.x, strings[i].rotation.y, strings[i].rotation.z)
        };

        setTimeout(function() {
            rod.updateNonPhysiStringsWithThePositionsOfThePhysiStrings();
        }, 1000 / 30)
    },
    moveRodStrings: function(direction) {
        switch (direction) {
            case 'up':
                rodPivot.rotation.x += deg2rad(1);
                break;
            case 'down':
                rodPivot.rotation.x -= deg2rad(1);
                break;
            case 'left':
                break;
            case 'right':
                break;
            case 'nothing':
                rodPivot.rotation.x += 0.0000000000001;
                break;
        }


        var rotation = reduceTo360(rad2deg(rodPivot.rotation.x) + 54);
        // console.log(Math.round(rotation));
        rod.setRodAndStringPosition(rotation);
    }
}
