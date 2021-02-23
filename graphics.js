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
function clear(){
    clearGaris();
    clearSquare();
    var element = document.getElementById("yourShape");
    while (element.firstChild) {
        element.firstChild.remove()
    }
    idxInitGaris=0;
}
function initWebGL() {
    clear();
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
                idxInitGaris+=1;
                makeGaris(coorGaris,coorGaris.length/6)
                //judul
                var tag = document.createElement("h1");
                var text = document.createTextNode("Garis ke-"+idxInitGaris);
                tag.appendChild(text);
                //form rgb
                var formRGB = document.createElement("form");
                formRGB.className="inputFormGarisRGB";
                //div R
                var divR = document.createElement("div");
                divR.className = "form-group col-md-9";
                var labelR = document.createElement("label");
                var textR = document.createTextNode("R");
                labelR.appendChild(textR);
                var inputR = document.createElement("input");
                inputR.className="form-control";
                inputR.id="inputR"+idxInitGaris;
                inputR.type="text";
                inputR.placeholder=coorGaris[(idxInitGaris-1)*12+3];
                var smallR = document.createElement("small");
                smallR.className="form-text text-muted";
                var textRSmall = document.createTextNode("Silakan ubah nilai R");
                smallR.appendChild(textRSmall);
                divR.appendChild(labelR);
                divR.appendChild(inputR);
                divR.appendChild(smallR);
                formRGB.appendChild(divR);
                //div G
                var divG = document.createElement("div");
                divG.className = "form-group col-md-9";
                var labelG = document.createElement("label");
                var textG = document.createTextNode("G");
                labelG.appendChild(textG);
                var inputG = document.createElement("input");
                inputG.className="form-control";
                inputG.id="inputG"+idxInitGaris;
                inputG.type="text";
                inputG.placeholder=coorGaris[(idxInitGaris-1)*12+4];
                var smallG = document.createElement("small");
                smallG.className="form-text text-muted";
                var textGSmall = document.createTextNode("Silakan ubah nilai G");
                smallG.appendChild(textGSmall);
                divG.appendChild(labelG);
                divG.appendChild(inputG);
                divG.appendChild(smallG);
                formRGB.appendChild(divG);
                //div B
                var divB = document.createElement("div");
                divB.className = "form-group col-md-9";
                var labelB = document.createElement("label");
                var textB = document.createTextNode("B");
                labelB.appendChild(textB);
                var inputB = document.createElement("input");
                inputB.className="form-control";
                inputB.id="inputB"+idxInitGaris;
                inputB.type="text";
                inputB.placeholder=coorGaris[(idxInitGaris-1)*12+5];
                var smallB = document.createElement("small");
                smallB.className="form-text text-muted";
                var textBSmall = document.createTextNode("Silakan ubah nilai B");
                smallB.appendChild(textBSmall);
                divB.appendChild(labelB);
                divB.appendChild(inputB);
                divB.appendChild(smallB);
                formRGB.appendChild(divB);

                var tagRGB = document.createElement("p");
                var textRGB = document.createTextNode("R: "+coorGaris[(idxInitGaris-1)*12+3]+" G: "+coorGaris[(idxInitGaris-1)*12+4]+" B: "+coorGaris[(idxInitGaris-1)*12+5]);
                tagRGB.appendChild(textRGB);

                var element = document.getElementById("yourShape");
                element.appendChild(tag);
                element.appendChild(tagRGB);
                element.appendChild(formRGB);

                //edit button
                /*
                var btnCont = document.createElement("div");
                btnCont.className="buttonContainer"
                var editBtn = document.createElement("button");
                var textEditBtn = document.createTextNode("Change Color");
                editBtn.type="button";
                editBtn.className="btn btn-info editBtn";
                editBtn.id = idxInitGaris;
                editBtn.appendChild(textEditBtn);
                btnCont.appendChild(editBtn);
                element.appendChild(btnCont);
                */
                
            }
            console.log(coorGaris)
            console.log(shapeColor)
            console.log(shape)


        })

        for (var i=0; i<idxInitGaris; i++){
            //red
            //green
            //blue
        }

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

            // Bikin langsung dari size yang udah dimasukin
            var size = document.getElementById("persegiSize").value;
            console.log(size);
            var convertedSize = (size / Math.min(canvas.clientHeight, canvas.clientWidth)) * 2;
            console.log(convertedSize);

            coorSquare.push(coorX + convertedSize, coorY, shapeColor[0],shapeColor[1],shapeColor[2])
            coorSquare.push(coorX + convertedSize, coorY + convertedSize, shapeColor[0],shapeColor[1],shapeColor[2])
            coorSquare.push(coorX, coorY + convertedSize, shapeColor[0],shapeColor[1],shapeColor[2])
        
            if(coorSquare.length%20==0){
                makePersegi(coorSquare,coorSquare.length/5)
            }
            console.log(coorSquare)
            console.log(shapeColor)
            console.log(shape)
        })
    
    }

    if(shape==="polygon"){
        canvas.addEventListener("click", function(e){
            var shapeColor = hexToRgb(document.getElementById("shpaeColor").value);
            getMouseCoor(e);
            console.log(coorX);
            console.log(coorY);
            coorPoly.push(coorX);
            coorPoly.push(coorY);
            coorPoly.push(shapeColor[0],shapeColor[1],shapeColor[2]); //RGB

            //Jangan dipanggil ketika baru dapat dua titik
            //Setelah titik ketiga, shape harus selalu diupdate dan draw dibuat ulang dengan array yang sama
            if((coorPoly.length > 10) && (coorSquare.length%5==0)){
                makePoligon(coorPoly,(coorPoly.length)/5);
            }
            console.log(coorPoly)
            console.log(shapeColor)
            console.log(shape)
        })
    }
    
});


window.onload = initWebGL();

var clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click",initWebGL);

var persegiSize = document.getElementById("persegiForm");
persegiSize.style.display = "none";

var shapeOption = document.getElementById("shapeOption");
shapeOption.addEventListener("change", () => {
    if (shapeOption.value == "kotak"){
        persegiSize.style.display = "block";
    } else {
        persegiSize.style.display = "none";
    }
})