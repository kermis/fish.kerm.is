/////////////////////////////////////
/////   Socket Stuff
////////////////////////////////////
var room = generateRoomId();
var socketController = {
    currentURL: window.location.href,
    loc: window.location,
    room: '',
    socket: io.connect(this.currentURL),
    phoneObj: { rotX: 0, rotY: 0, rotZ:0},
    controllerJoined: false,
    init: function() {


        //To catch when there is a port in the url, mainly for testing
        if (this.loc.port != undefined && this.loc.port > 1) {
            this.currentURL = this.loc.protocol + '//' + this.loc.hostname + ':' + this.loc.port;
        } else {
            this.currentURL = this.loc.protocol + '//' + this.loc.hostname;
        }
    },
    connect: function() {
        socketController.socket.on('connect', this.socketConnected);
        socketController.socket.on('message', this.socketMessage);
        socketController.socket.on('pulled', this.pulled);
        socketController.socket.on('motionDataOut', this.socketMotionDataOut);

        this.updateInstructions();
    },
    socketConnected: function() {
        // Connected, let's sign-up for to receive messages for this room
        socketController.socket.emit('room', room);
        socketController.socket.emit('message', {
            msg: 'client joined room with ID ' + room
        });
    },
    socketMessage: function(data) {
        console.log('Incoming message:', data);
        if(data.msg.indexOf('mobile joined') != -1 && ! socketController.controllerJoined){
            game.start();
            socketController.controllerJoined = true;
        }
    },
    pulled: function(data){
        // console.log(data);
        duckling.checkCollision();
    },
    socketMotionDataOut: function(data) {
        // console.log('Incoming motionData:', data);
        // Tilt Left/Right [gamma]
        // Tilt Front/Back [beta]
        // Direction [alpha]

        $('.debug').html('<br>beta:' + data.beta);
        // phoneObj.rotY = deg2rad(data.alpha);

        if(data){
        var rotation = deg2rad(data.beta)-45;
            rodPivot.rotation.x = rotation;
        }

        rod.moveRodStrings('nothing');
    },
    updateInstructions: function() {
        $('.urlFounded').html(this.currentURL);
        $('.roomGenerated').html(this.room);
        $('.instruct').fadeIn('fast')

        var genURL = this.currentURL+'/mobile/#' + room;

        $('.room_id').html(room);

        $('.instruct').qrcode({
            text: genURL,
            render: "canvas",
            background: "#FFFFFF",
            foreground: "#000000",
            width: 200,
            height: 200
        });
    }

}

socketController.init();
socketController.connect();
