function deg2rad(angle) {

    return angle * .017453292519943295; // (angle / 180) * Math.PI;
}

function rad2deg(angle) {

    return angle * 57.29577951308232; // angle / Math.PI * 180
}

function generateRoomId() {
    var text = "";
    var possible = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function rgbToHex(r,g,b){
    var bin = r << 16 | g << 8 | b;
    return (function(h){
        return new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
}