function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    // controls.handleResize();

    render();

}

document.onkeydown = handleKeyDown;
function handleKeyDown(e) {
    //up -> 38
    //down -> 40
    //left -> 37
    //right -> 39
    //space -> 32
    //escape -> 27

    if (playing) {
        switch (e.keyCode) {
            case 38:
                rod.moveRodStrings('up');
                break;
            case 40:
                rod.moveRodStrings('down');

                break;
            case 37:
                rod.moveRodStrings('left');

                break;
            case 39:
                rod.moveRodStrings('right');

                break;
            case 32:
            	e.preventDefault();
                duckling.checkCollision();
                break;
        }
    }

    if (e.keyCode == 27) {
    	e.preventDefault();
        game.pause()
        return false;
    }

}
