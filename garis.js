
var makeGaris = function(garisVertices){

    var garisVertexBufferObject = gl.createBuffer();
    //binding buffer yang baru dibuat ke active buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, garisVertexBufferObject);
    //specify data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(garisVertices), gl.STATIC_DRAW);

    // Get the attribute location
    var coord = gl.getAttribLocation(program, "vPosition");
    var colorAttributeLocation = gl.getAttribLocation(program, 'vertColor');

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0); // Ada ininya kayak segitiga biar bisa ganti warna?
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
        6 * Float32Array.BYTES_PER_ELEMENT,
        //0ffset from the beginning of a single vertex to this attribute
        3 * Float32Array.BYTES_PER_ELEMENT //skip X and Y
    );

    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    gl.enableVertexAttribArray(colorAttributeLocation);

    /*============ Drawing the triangle =============*/
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.LINES, 0, 6);

}

var segitigaBtn = document.getElementById("garisBtn");
var coorGaris=[];

segitigaBtn.addEventListener("click", function(){
    var x1 = document.getElementById("inputx1Garis").value;
    var y1 = document.getElementById("inputy1Garis").value;
    var x2 = document.getElementById("inputx2Garis").value;
    var y2 = document.getElementById("inputy2Garis").value;
    var r = document.getElementById("inputR").value;
    var g = document.getElementById("inputG").value;
    var b = document.getElementById("inputB").value;
    coorGaris.push(parseFloat(x1));
    coorGaris.push(parseFloat(y1));
    coorGaris.push(0);
    coorGaris.push(parseFloat(r));
    coorGaris.push(parseFloat(g));
    coorGaris.push(parseFloat(b));
    coorGaris.push(parseFloat(x2));
    coorGaris.push(parseFloat(y2));
    coorGaris.push(0);
    coorGaris.push(parseFloat(r));
    coorGaris.push(parseFloat(g));
    coorGaris.push(parseFloat(b));

    console.log(coorGaris);

    makeGaris(coorGaris)
});

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