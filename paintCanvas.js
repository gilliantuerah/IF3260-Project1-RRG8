/* Koordinat mouse (kebutuhan save) */
var mousex = 0;
var mousey = 0;

/* Array of Shapes */
var shapes = [];

/* Current states of things */
var current = {
    /* Bakal ada garis, persegi, dan polygon */
    
}

/* Render canvas dari kosong */
function redrawCanvas() {
    gl.clearColor(current.bgcolor.red, current.bgcolor.green, current.bgcolor.blue, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for (let shape of shapes) {
        shape.draw();
    }
}

// Get koordinat mouse
function getMouseCoordinate(e) {
    mousex = (e.offsetX / canvas.clientWidth) * 2 - 1
    mousey = (1 - (e.offsetY / canvas.clientHeight)) * 2 - 1
}