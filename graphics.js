var canvas;
var gl;
var program;
var vertexShader;
var fragmentShader;
var vertexShaderText;
var fragmentShaderText;
var coorGaris=[];
var idxInitGaris=0;
var coorSquare=[];
var coorPoly =[];
var identityMatrix = [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
];
var squareCount;
//boolean mode
var editMode=0; //false
var drawMode=0; //false

function getMouseCoor(event){
    coorX = event.offsetX;
    coorY = canvas.clientHeight - event.offsetY;
}

function distanceTwoPoint(x1,y1,x2,y2){
    var dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    return dist;
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
function clear(){
    clearPoligon();
    clearGaris();
    clearSquare();
    document.getElementById("persegiEnlarge").style.display = "none";
    var element = document.getElementById("yourShape");
    while (element.firstChild) {
        element.firstChild.remove()
    }
    idxInitGaris=0;
}
function initWebGL() {
    clear();
    canvas = document.getElementById('game-surface');
    canvas.removeEventListener("click", drawShape);
    squareCount = 0;
    document.getElementById("persegiForm").style.display = "none";
    document.getElementById("persegiEnlarge").style.display = "none";

    gl = canvas.getContext("webgl");
    if (!gl){
        alert('Your browser does not support WebGL');
    }

    vertexShaderText = `attribute vec4 vPosition;
    attribute vec3 vertColor;
    varying vec3 fragColor;
    uniform mat4 transformMat;
    uniform vec2 resolution;
    void main(){
        fragColor = vertColor;
        vec2 position = (transformMat * vPosition).xy;
        vec2 scaled = position / resolution;
        vec2 timesTwo = scaled * 2.0;
        vec2 clipSpace = timesTwo - 1.0;
        gl_Position = vec4(clipSpace, 0, 1);
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

function drawGaris(e){
    if(drawMode===1){
        var shapeColor = hexToRgb(document.getElementById("shpaeColor").value);
        getMouseCoor(e);
        console.log(coorX);
        console.log(coorY);
        coorGaris.push(coorX);
        coorGaris.push(coorY);
        coorGaris.push(0);
        coorGaris.push(shapeColor[0],shapeColor[1],shapeColor[2]);
    
        if(coorGaris.length%12==0){
            idxInitGaris+=1;
            makeGaris(coorGaris,coorGaris.length/6)
            
        }
    }
}

function drawKotak(e){
    if(drawMode===1){
        var shapeColor = hexToRgb(document.getElementById("shpaeColor").value);
        getMouseCoor(e);
        console.log(coorX);
        console.log(coorY);
        coorSquare.push(coorX);
        coorSquare.push(coorY);
        coorSquare.push(shapeColor[0],shapeColor[1],shapeColor[2]);

        // Bikin langsung dari size yang udah dimasukin
        var size = parseInt(document.getElementById("persegiSize").value);

        coorSquare.push(coorX + size, coorY, shapeColor[0],shapeColor[1],shapeColor[2])
        coorSquare.push(coorX + size, coorY + size, shapeColor[0],shapeColor[1],shapeColor[2])
        coorSquare.push(coorX, coorY + size, shapeColor[0],shapeColor[1],shapeColor[2])
        console.log(coorSquare);

        if(coorSquare.length%20==0){
            makePersegi(coorSquare,coorSquare.length/5)
            document.getElementById("persegiEnlarge").style.display = "block";
            squareCount++;
        }
    }
    
}

function drawPoligon(e){
    if(drawMode===1){
        var shapeColor = hexToRgb(document.getElementById("shpaeColor").value);
        getMouseCoor(e);
        console.log(coorX);
        console.log(coorY);
        coorPoly.push(coorX);
        coorPoly.push(coorY);
        coorPoly.push(shapeColor[0],shapeColor[1],shapeColor[2]); //RGB

        //Jangan dipanggil ketika baru dapat dua titik
        //Setelah titik ketiga, shape harus selalu diupdate dan draw dibuat ulang dengan array yang sama
        if((coorPoly.length > 10) && (coorPoly.length%5==0)){
            makePoligon(coorPoly,(coorPoly.length)/5);
        }
    }
}

function drawShape(e,shape){
    console.log(shape)
    if(shape==="garis"){
        console.log("masuk garis")
        drawGaris(e); //Dipisah biar bisa diremove pas clear
    }

    if(shape==="kotak"){
        console.log("masuk kotak")
        drawKotak(e);
    }

    if(shape==="polygon"){
        console.log("masuk pol")
        drawPoligon(e);
    } 
}

var drawBtn = document.getElementById("drawBtn");
// draw mode
drawBtn.addEventListener("click", function(){
    drawMode=1;
    editMode=0;

    var ptagDraw = document.getElementById("canvasMode");
    ptagDraw.innerHTML = "Draw Mode"
  

    clear()
    var shape = document.getElementById("shapeOption").value;
    console.log(shape)

    canvas.addEventListener("click", e=>drawShape(e,shape)); 
});

// editMode
editBtn.addEventListener("click", function(){
    editMode=1;
    drawMode=0;
    var idxEdit=0;
    var editCoordIdx=-1;
    var minDist=5;
    
    var ptag = document.getElementById("canvasMode");
    ptag.innerHTML = "Edit Mode"

    var shape = document.getElementById("shapeOption").value;
    console.log(shape)
  
    canvas.addEventListener("click", function(e){
        if(editMode===1 && shape==="garis"){ 
            getMouseCoor(e);
            idxEdit++;
        
            //if idxEdit ganjil -> pilih titik dari coorGaris yg mau diedit
            if(idxEdit%2==1){
                for(var j=0;j<coorGaris.length;j+=6){
                    error=distanceTwoPoint(coorX,coorY,coorGaris[j],coorGaris[j+1])
                    //galat = 3.0
                    if(error<3.0){
                        if(error<minDist){
                            minDist=error;
                            //simpen current position to edit
                            editCoordIdx = j;
                        }
                    }
                }
            }else{ //if idxEdit genap -> pilih titik'
                if(editCoordIdx===-1){
                    //titik yang dipilih tidak masuk range
                    console.log("Tidak ada titik yang memenuhi")
                }else{
                    //ganti koordinat
                    coorGaris[editCoordIdx]=coorX;
                    coorGaris[editCoordIdx+1]=coorY;
                    //gambar ulang garis
                    makeGaris(coorGaris,coorGaris.length/6)
                }
                editCoordIdx=-1;
                minDist=5;
            }
            
        }
        else if (editMode === 1 && shape==="polygon"){
            getMouseCoor(e);
            idxEdit++;

            //if idxEdit ganjil -> pilih titik dari coorPoly yg mau diedit
            if(idxEdit%2==1){
                for(var j=0;j<coorPoly.length;j+=5){
                    error=distanceTwoPoint(coorX,coorY,coorPoly[j],coorPoly[j+1])
                    //galat = 3.0
                    if(error<3.0){
                        if(error<minDist){
                            minDist=error;
                            //simpen current position to edit
                            editCoordIdx = j;
                        }
                    }
                }
            }else{ //if idxEdit genap -> pilih titik'
                if(editCoordIdx===-1){
                    //titik yang dipilih tidak masuk range
                    console.log("Tidak ada titik yang memenuhi")
                }else{
                    //ganti koordinat
                    coorPoly[editCoordIdx]=coorX;
                    coorPoly[editCoordIdx+1]=coorY;
                    //gambar ulang poligon
                    makePoligon(coorPoly,(coorPoly.length)/5);
                }
                editCoordIdx=-1;
                minDist=5;
            }
        }
    
    })
    
    
})

//Ganti Warna Polygon
var gantiWarnaPolyBtn = document.getElementById("gantiWarnaPolyBtn");

gantiWarnaPolyBtn.addEventListener("click", function() {
    var shapeColor = hexToRgb(document.getElementById("shpaeColor").value);
    for (i = 0; i < coorPoly.length; i++){
        if(i%5 == 2){ //R
            coorPoly[i] = shapeColor[0];
        }
        if(i%5 == 3){ //G
            coorPoly[i] = shapeColor[1];
        }
        if(i%5 == 4){ //B
            coorPoly[i] = shapeColor[2];
        }
    }
    makePoligon(coorPoly, (coorPoly.length)/5);
    console.log("Ganti warna");
});

window.onload = initWebGL();

var clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click",initWebGL);

var shapeOption = document.getElementById("shapeOption");
shapeOption.addEventListener("change", () => {
    document.getElementById("persegiEnlarge").style.display = "none";
    if (shapeOption.value == "kotak"){
        document.getElementById("persegiForm").style.display = "block";
    } else {
        document.getElementById("persegiForm").style.display = "none";
        
    }
});

var enlargeBtn = document.getElementById("enlargeBtn");
enlargeBtn.addEventListener("click", () => {
    var amount = document.getElementById("enlargeVal").value;
    var scaleMat = [
        amount, 0.0, 0.0, 0.0,
        0.0, amount, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];

    var transform = gl.getUniformLocation(program, "transformMat");
    gl.uniformMatrix4fv(transform, false, new Float32Array(scaleMat));    
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (var i = 0; i < squareCount; i++){
        gl.drawArrays(gl.TRIANGLE_FAN, i * 4, 4);
    }
});