function clearPoligon(){
    if(coorPoly.length!==0){
        coorPoly=[];
    }
}

function makePoligon(polygonVertices, numOfVertices) {
    var polygonBuffer = gl.createBuffer();
    // Binding buffernya
    gl.bindBuffer(gl.ARRAY_BUFFER, polygonBuffer);
    // Isi data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygonVertices), gl.STATIC_DRAW);

    //Ambil koordinat titik dan angka
    var loc = gl.getAttribLocation(program, "vPosition");
    var colLoc = gl.getAttribLocation(program, "vertcolor");
    var transform = gl.getUniformLocation(program, "transformMat");
    var res = gl.getUniformLocation(program, "resolution");

    // Masukkan rule atribut
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);

    gl.uniformMatrix4fv(transform, false, new Float32Array(identityMatrix));
    gl.uniform2fv(res, [canvas.clientWidth, canvas.clientHeight]);

    // Masukkan atribut
    gl.enableVertexAttribArray(loc);
    gl.enableVertexAttribArray(colLoc);

    // Render poligonnya
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, numOfVertices);
}