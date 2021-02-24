var saveFile = document.getElementById("saveBtn");
saveFile.addEventListener("click", function() {
    // Membuat document baru berupa text
    var textDoc = document.createElement('a');
    var stringFinal = '';
    
    if(coorGaris.length != 0){
        stringFinal += encodeURI(coorGaris.join('\n')) + '\ngaris\n';
    }
    if(coorSquare.length != 0){
        stringFinal += encodeURI(coorSquare.join('\n')) + '\nkotak\n';
    }
    if(coorPoly.length != 0){
        stringFinal += encodeURI(coorPoly.join('\n')) + '\npolygon\n';
    }
    textDoc.href = 'data:attachment/text,' + stringFinal;
    textDoc.target = '_blank';
    textDoc.download = 'myFile.txt';
    textDoc.click();
});

var loadFile = document.getElementById("loadFile");
loadFile.addEventListener("change", function() {
    var fr = new FileReader();
    fr.onload = function() {
        // console.log(fr.result);

        // Misahin line by line
        var lines = this.result.split('\n');
        for (var line = 0; line < lines.length; line++){
            if(lines[line] === "kotak" || lines[line] === "garis" || lines[line] === "polygon"){
                console.log("masuk shape");
                if(lines[line] === "garis"){
                    console.log("ada garis");
                    for (i = 0; i<lines.length; i++){
                        if(lines[i] === "garis"){
                            break;
                        }
                        console.log(lines[i]);
                        coorGaris.push(parseFloat(lines[i]));
                    }
                    console.log(coorGaris);
                    makeGaris(coorGaris, coorGaris.length/5);
                }
                else if(lines[line] === "kotak"){
                    
                    for (i = 0; i<lines.length; i++){
                        if(lines[i] === "garis"){
                            coorSquare = []; //kalo ketemu garis, kosongin dulu
                        }
                        if(lines[i] === "kotak"){
                            break;
                        }
                        coorSquare.push(parseFloat(lines[i]));
                    }
                    console.log(coorSquare);
                    makePersegi(coorSquare, coorSquare.length/5);
                }
                else if(lines[line] === "polygon"){
                    console.log("masuk polygon");
                    for (i = 0; i<lines.length; i++){
                        if(lines[i] === "garis"){
                            coorSquare = []; //kalo ketemu garis, kosongin dulu
                        }
                        if(lines[i] === "kotak"){
                            coorSquare = [];
                        }
                        if(lines[i] === "polygon"){
                            break;
                        }
                        coorPoly.push(parseFloat(lines[i]));
                    }
                    // console.log(coorPoly);
                    // editMode = 1;
                    // drawMode = 1;
                    console.log(coorPoly);
                    makePoligon(coorPoly, (coorPoly.length)/5);
                }
            }
            else{
                // console.log(lines);
                // console.log("masuk else");
            }
            // console.log(lines[line]);
        }
    }

    fr.readAsText(this.files[0]);
});