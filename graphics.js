var canvas;
var gl;
var program;
var vertexShader;
var fragmentShader;
var vertexShaderText;
var fragmentShaderText;
var coorGaris=[];

function initWebGL() {
    clearGaris();
    canvas = document.getElementById('game-surface');

    gl = canvas.getContext("webgl");
    if (!gl){
        alert('Your browser does not support WebGL');
    }

    vertexShaderText = `attribute vec4 vPosition;
    attribute vec3 vertColor;
    varying vec3 fragColor;
    void main(){
        fragColor = vertColor;
        gl_Position = vPosition;
    }`;
    fragmentShaderText = `precision mediump float;

    varying vec3 fragColor;
    void main(){
        gl_FragColor = vec4(fragColor, 1.0);
    }`;

    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.compileShader(vertexShader); 

    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    gl.compileShader(fragmentShader);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(program);
}



window.onload = initWebGL();

var clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click",initWebGL);