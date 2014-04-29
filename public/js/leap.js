////////////////////////////////////////////////////////////////////////////////
//      Leap stuff                        //
//////////////////////////////////////////////////////////////////////////////////
var leapController = {
    controller: new Leap.Controller(),
    leapObj : {},
    leapConnected: false,
    init: function() {
        controller.connect();

        this.controller.on('connect', controllerConnected)
        this.controller.on('animationFrame', onAnimationframe)
    },
    controllerConnected: function() {
        if (debug) {
            console.log("Leap Successfully connected.");
        }
        this.leapConnected = true;
    },
    onAnimationframe: function(frame) {
        // your code here
        try {
            var pointables = frame.hands;
            // leapObj.posX = (pointables[0].palmPosition[0]);
            // leapObj.posY = (pointables[0].palmPosition[2]);
            // leapObj.posZ = (pointables[0].palmPosition[1]);
            this.leapObj.rotX = (pointables[0]._rotation[2]);
            this.leapObj.rotY = (pointables[0]._rotation[1]);
            this.leapObj.rotZ = (pointables[0]._rotation[0]);

            // console.log(hand.rotY, rod.rotation.y);
            $('.debug').html(pointables.length + ' pointables visible');
            updateRod();

        } catch (e) {
            $('.debug').html('No fingers visible');
            // console.log('no fingers in frame')
        }
    }

}
