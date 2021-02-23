var makeSegitiga = function(triangleVertices){
    /*
    === create buffer ===
    */
    
    var triangleVertexBufferObject = gl.createBuffer();
    //binding buffer yang baru dibuat ke active buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    //specify data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    

    var positionAttributeLocation = gl.getAttribLocation(program, 'vPosition');
    var colorAttributeLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        //attr location
        positionAttributeLocation,
        //number of elements per attribute
        2,
        //type of elements
        gl.FLOAT,
        //is the data normalized
        false,
        //size of an individual vertex
        5 * Float32Array.BYTES_PER_ELEMENT,
        //0ffset from the beginning of a single vertex to this attribute
        0
    );

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

    //enable attribute for use
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(colorAttributeLocation);

    /*
    param of drawArrays: 
    - what u want to draw (mostly triangle)
    - how many vertex u want to skip
    - how many vertex to draw
    */
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    
};
// }

var segitigaBtn = document.getElementById("segitigaBtn");
segitigaBtn.addEventListener("click", function(){
    makeSegitiga(
        [// X, Y          R, G, B
            0,0.5,     1.0, 1.0, 0.0,
            -0.5,-0.5,   0.7, 0.0, 1.0,
            0.5,-0.5,    0.1, 1.0, 0.6,
        ]    
    );
});