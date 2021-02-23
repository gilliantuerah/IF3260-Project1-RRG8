function clearSquare(){
    if(coorSquare.length!==0){
        coorSquare=[];
    }
}

var makePersegi = function(squareVertices, numberOfVert) {
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    var colorAttributeLocation = gl.getAttribLocation(program, 'vertColor');

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(
        //attr location
        colorAttributeLocation,
        //number of elements per attribute
        3,
        //type of elements
        gl.FLOAT,
        //is the data normalized
        false,
        //size of an individual vertex
        5 * Float32Array.BYTES_PER_ELEMENT,
        //0ffset from the beginning of a single vertex to this attribute
        2 * Float32Array.BYTES_PER_ELEMENT //skip X and Y
    );

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(colorAttributeLocation);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, numberOfVert);
}

// var persegiBtn = document.getElementById("persegiBtn");
// persegiBtn.addEventListener("click", function(){
//     makePersegi(
//         [// X, Y          R, G, B
//             -0.5,-0.5,  0.0, 1.0, 1.0,
//             -0.5,0.5,   0.0, 1.0, 1.0,
//             0.5,0.5,    0.0, 1.0, 1.0,
//             0.5,-0.5,   0.0, 1.0, 1,0
//         ]    
//     );
// });