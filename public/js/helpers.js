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

function makeCrossAndSetPosition(objectToAddTo, x, y, z) {
    var geometry = new THREE.CubeGeometry(1, 100, 1)
    var material = new THREE.MeshBasicMaterial()
    var stick = new THREE.Mesh(geometry, material)
    stick.position = new THREE.Vector3(x, y, z);

    stick2 = stick.clone();
    stick2.rotation.x = deg2rad(90);

    stick3 = stick.clone();
    stick3.rotation.z = deg2rad(90);

    objectToAddTo.add(stick);
    objectToAddTo.add(stick2);
    objectToAddTo.add(stick3);

}

function reduceTo360(angle) {
    var newAngle = angle;
    while (newAngle <= 0) {
        newAngle += 360
    };
    while (newAngle >= 360) {
        newAngle -= 360
    };
    return newAngle;
}