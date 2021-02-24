function saveToTXT() {
    var text = [];
    startPoint = 0;
    for (i = 0; i < ListOfState.length; i++) {
        state = ListOfState[i];
        text.push(state);
        // if(state === "garis"){
        //     for (j = startPoint; j < (startPoint + 6); j++) {
        //         valueNum = ListOfValue[j];
        //         valueStr = valueNum.toString();
        //         text.push(valueStr);
        //     }
        //     startPoint = startPoint + 6;
        // }
        // if(state === "kotak"){
        //     for (j = startPoint; j < (startPoint + 6); j++) {
        //         valueNum = ListOfValue[j];
        //         valueStr = valueNum.toString();
        //         text.push(valueStr);
        //     }
        //     startPoint = startPoint + 5;
        // }
        if(state === "polygon"){
            for (j = startPoint; j < (startPoint + 6); j++) {
                buffer = [];
                text.push(state)
            }
            startPoint = startPoint + 5;
        }
    }
    console.log(text);
}

function openFromTXT() {
    //Open file
    ListOfState = ["polygon"];
    ListOfValue = [
        -0.37, 0.24, 0, 0, 0, 
        0.03249999999999997, 0.42666666666666675, 0, 0, 0, 
        0.4424999999999999, -0.21333333333333337, 0, 0, 0, 
        0.33000000000000007, -0.6666666666666667, 0, 0, 0, 
        -0.31499999999999995, -0.77, 0, 0, 0
    ];
    text = [];
    
    for (isi in text) {
        if(isi === "kotak" | isi === "garis" | isi === "polygon")
        {
            ListOfState.push(isi);
        }
        else
        {
            ListOfValue.push(isi);
        }
    }
    start = 0
    for (state in ListOfState)
    {
        if (state === "kotak")
        {
            for (i = start; i< start + 5; i++)
            {
                coorSquare.push(ListOfState[i])
            }
            start += 5;
        } else if (state === "garis")
        {
            for (i = start; i< start + 5; i++)
            {
                coorGaris.push(ListOfState[i])
            }
            start += 6;
        } else if (state === "polygon")
        {
            for (i = start; i< start + 5; i++)
            {
                coorPoly.push(ListOfState[i])
            }
            start += 5;
        }
    }
    // makeGaris();
    // makePersegi();
    // makePoligon(coorPoly, (coorPoly.length)/5);
    console.log(coorPoly);

}

let inputFileBtn = document.querySelector('input');
// let textarea = document.querySelector('textarea');

inputFileBtn.addEventListener('change', () => {
    text = [];
    let files = input.files;
 
    if(files.length == 0) return;
 
    const file = files[0];
 
    let reader = new FileReader();
 
    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        text.push(file);
        console.log(text)
    };
 
    reader.onerror = (e) => alert(e.target.error.name);
 
    reader.readAsText(file); 
    
});