
var vertCodeGaris = 
[
    'attribute vec3 coordinates;',
    '',
    'void main()',
    '{',
    'gl_Position = vec4(coordinates, 1.0);',
    '}'
].join('\n');

var fragCodeGaris=
[
    'void main()',
    '{',
    'gl_FragColor = vec4(0.0, 0.0, 0.0,1.0);', //R,G,B,opacity
    '}'
].join('\n');

var makeGaris = function(garisVertices){
    gl = makeCanvas()

    

    /*
    === create shaders ===
    */
   var vertexShader = gl.createShader(gl.VERTEX_SHADER);
   var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);


   //set shader source
   gl.shaderSource(vertexShader, vertCodeGaris);
   gl.shaderSource(fragmentShader, fragCodeGaris);

   //compile
   gl.compileShader(vertexShader);
   //debug
   if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
       console.error('ERRORR compiling vertex shader', gl.getShaderInfoLog(vertexShader));
       return;
   }

   gl.compileShader(fragmentShader);
   //debug
   if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
       console.error('ERRORR compiling fragment shader', gl.getShaderInfoLog(fragmentShader));
       return;
   }

   //program in opengl
   var program = gl.createProgram()
   gl.attachShader(program, vertexShader);
   gl.attachShader(program, fragmentShader);

   //link the program together
   gl.linkProgram(program);
   //debug
   if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
       console.error('ERRORR linking program', gl.getProgramInfoLog(program));
       return;
   }

   //to validating the program
   gl.validateProgram(program);
   if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
       console.error('ERRORR validating program', gl.getProgramInfoLog(program));
       return;
   }

   // Use the combined shader program object
   gl.useProgram(program);


    var garisVertexBufferObject = gl.createBuffer();
    //binding buffer yang baru dibuat ke active buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, garisVertexBufferObject);
    //specify data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(garisVertices), gl.STATIC_DRAW);

    // Get the attribute location
    var coord = gl.getAttribLocation(program, "coordinates");

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);


    /*============ Drawing the triangle =============*/
    

    // Draw the triangle
    gl.drawArrays(gl.LINES, 0, 6);

}

var segitigaBtn = document.getElementById("garisBtn");
segitigaBtn.addEventListener("click", function(){
    makeGaris(
        [// X, Y          R, G, B
            -0.7,-0.1,0,
            -0.3,0.6,0,
    
            -0.3,-0.3,0,
            0.2,0.6,0,
    
            0.3,-0.3,0,
            0.7,0.6,0 
        ]
    )
});