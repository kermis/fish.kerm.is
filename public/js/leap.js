////////////////////////////////////////////////////////////////////////////////
//      Leap stuff                        //
//////////////////////////////////////////////////////////////////////////////////
var controller, leapObj, leapConnected;

var count = 0;

var leapController = {
    leapObj : {},
    leapConnected: false,
    init: function() {
        controller = new Leap.Controller();
        controller.connect();

        controller.on('connect', this.controllerConnected)
        controller.on('animationFrame', this.onAnimationframe)
    },
    controllerConnected: function() {
        console.log('Leap connected')
        $('.debug').html('To play with the Leap, use your arm as a fishing rod and press the space bar to pull the fish up')
        this.leapConnected = true;
    },
    onAnimationframe: function(frame) {
        count++;


        if(count > 2){
        try {
            var pointables = frame.hands;

            if(count > 10 || 1){

                var rotation = (rad2deg(pointables[0].pitch())-45)*1.5;
                rodPivot.rotation.x = deg2rad(rotation);
                rod.moveRodStrings('nothing'); // to stabilize

            }

            updateRod();

        } catch (e) {
        //     console.log('error',e);
        }
    }

},
}

leapController.init();