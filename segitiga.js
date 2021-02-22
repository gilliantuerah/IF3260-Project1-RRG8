
// function makeSegitiga(){
var vertexShaderText = 
[
    'precision mediump float;', 
    '',
    'attribute vec2 vertPosition;', //vec2 --> indicates x and y component
    'attribute vec3 vertColor;', 
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    'fragColor = vertColor;',
    'gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');


var fragmentShaderText=
[
    'precision mediump float;', 
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    'gl_FragColor = vec4(fragColor,1.0);', //R,G,B,opacity
    '}'
].join('\n');
var makeCanvas = function(){
    /*
    === initialize webgl ===
    */
    var canvas = document.getElementById("game-surface");
    var gl = canvas.getContext("webgl");

    if(!gl){
       console.log("tetot webgl not supported kak")
       gl = canvas.getContext("experimental-webg");
    }

    if(!gl){
       alert("browser kamu cupu ayo beli baru");
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    return gl
}
var makeSegitiga = function(triangleVertices){
    console.log("helo im here");
  
    
    gl = makeCanvas()
    
    /*
    === create shaders ===
    */
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);


    //set shader source
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

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

    /*
    === create buffer ===
    */
    


    var triangleVertexBufferObject = gl.createBuffer();
    //binding buffer yang baru dibuat ke active buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    //specify data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    

    var positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttributeLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        //attr location
        positionAttributeLocation,
        //number of elements per attribute
        2,
        //type of elements
        gl.FLOAT,
        //is the data normalized
        gl.FALSE,
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
        gl.FALSE,
        //size of an individual vertex
        5 * Float32Array.BYTES_PER_ELEMENT,
        //0ffset from the beginning of a single vertex to this attribute
        2 * Float32Array.BYTES_PER_ELEMENT //skip X and Y
    );

    //enable attribute for use
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(colorAttributeLocation);

    /*
    === render ===
    */

    gl.useProgram(program);
    /*
    param of drawArrays: 
    - what u want to draw (mostly triangle)
    - how many vertex u want to skip
    - how many vertex to draw
    */
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
console.log("helo");

var clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click",makeCanvas);
console.log("helo");
// function vertexShader (vertPosition, vertColor){
//     return{
//         fragColor: vertColor,
//         gl_Position: [vertPosition.x, vertPosition.y, 0.0, 1,0] //vertex mau digambar dimana
//     };
// };