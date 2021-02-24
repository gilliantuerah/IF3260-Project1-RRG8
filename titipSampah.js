/*
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
                */

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