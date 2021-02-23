var canvas;
var gl;
var program;
var vertexShader;
var fragmentShader;
var vertexShaderText;
var fragmentShaderText;
var coorGaris=[];
var coorSquare=[];

function getMouseCoor(event){
    coorX = (event.offsetX / canvas.clientWidth) * 2 - 1
    coorY = (1 - (event.offsetY / canvas.clientHeight)) * 2 - 1
}

function hexToRgb(hex) {
    var hasil = []
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    r= parseInt(result[1], 16);
    g= parseInt(result[2], 16);
    b= parseInt(result[3], 16);
    hasil.push(r,g,b);
    return result ? hasil : null;
}
function initWebGL() {
    clearGaris();
    clearSquare();
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

var drawBtn = document.getElementById("drawBtn");
drawBtn.addEventListener("click", function(){
    var shape = document.getElementById("shapeOption").value;
    console.log(shape)
    if(shape==="garis"){
        canvas.addEventListener("click", function(e){
            var shapeColor = hexToRgb(document.getElementById("shpaeColor").value);
            getMouseCoor(e);
            console.log(coorX);
            console.log(coorY);
            coorGaris.push(coorX);
            coorGaris.push(coorY);
            coorGaris.push(0);
            coorGaris.push(shapeColor[0],shapeColor[1],shapeColor[2]);
        
            if(coorGaris.length%12==0){
                makeGaris(coorGaris,coorGaris.length/6)
            }
            console.log(coorGaris)
            console.log(shapeColor)
            console.log(shape)
        })
    }
    if(shape==="kotak"){
        canvas.addEventListener("click", function(e){
            var shapeColor = hexToRgb(document.getElementById("shpaeColor").value);
            getMouseCoor(e);
            console.log(coorX);
            console.log(coorY);
            coorSquare.push(coorX);
            coorSquare.push(coorY);
            coorSquare.push(shapeColor[0],shapeColor[1],shapeColor[2]);
        
            if(coorSquare.length%20==0){
                makePersegi(coorSquare,coorSquare.length/5)
            }
            console.log(coorSquare)
            console.log(shapeColor)
            console.log(shape)
        })
    
    }
    
});


window.onload = initWebGL();

var clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click",initWebGL);