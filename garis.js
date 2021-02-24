function clearGaris(){
    if(coorGaris.length!==0){
        coorGaris=[];
    }
}


function makeGaris(garisVertices, numberOfLine){

    var garisVertexBufferObject = gl.createBuffer();
    //binding buffer yang baru dibuat ke active buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, garisVertexBufferObject);
    //specify data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(garisVertices), gl.STATIC_DRAW);

    // Get the attribute location
    var coord = gl.getAttribLocation(program, "vPosition");
    var colorAttributeLocation = gl.getAttribLocation(program, 'vertColor');
    var transform = gl.getUniformLocation(program, "transformMat");
    var res = gl.getUniformLocation(program, "resolution");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0); // Ada ininya kayak segitiga biar bisa ganti warna?
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
    gl.uniformMatrix4fv(transform, false, new Float32Array(identityMatrix));
    gl.uniform2fv(res, [canvas.clientWidth, canvas.clientHeight]);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    gl.enableVertexAttribArray(colorAttributeLocation);

    /*============ Drawing the line =============*/
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Draw the line
    gl.drawArrays(gl.LINES, 0, numberOfLine);

}




// segitigaBtn.addEventListener("click", function(){
//     var x1 = document.getElementById("inputx1Garis").value;
//     var y1 = document.getElementById("inputy1Garis").value;
//     var x2 = document.getElementById("inputx2Garis").value;
//     var y2 = document.getElementById("inputy2Garis").value;
//     var shapeColor = hexToRgb(document.getElementById("shpaeColor").value);
//     coorGaris.push(parseFloat(x1));
//     coorGaris.push(parseFloat(y1));
//     coorGaris.push(0);
//     coorGaris.push(shapeColor[0],shapeColor[1],shapeColor[2]);
//     coorGaris.push(parseFloat(x2));
//     coorGaris.push(parseFloat(y2));
//     coorGaris.push(0);
//     coorGaris.push(shapeColor[0],shapeColor[1],shapeColor[2]);


//     console.log(coorGaris);
//     console.log(shapeColor[0]);
//     makeGaris(coorGaris)
// });




/*
        [// X, Y          R, G, B
            -0.7,-0.1,0,  0.0,0.0,0.0, 
            -0.3,0.6,0,   0.0,0.0,0.0,
    
            -0.3,-0.3,0,  0.0,0.0,0.0,
            0.2,0.6,0,    0.0,0.0,0.0,
    
            0.3,-0.3,0,   0.0,0.0,0.0,
            0.7,0.6,0,    0.0,0.0,0.0
        ]
        */