// Biar gampang masukin RGB
class Color {
    constructor(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }
}

class Shape {
    constructor(x1, x2, y1, y2, warna, isFilled, extraparam = false)
    {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.warna = warna;
        this.theta = false;

        this.isFilled = (filled === true || filled === false) ? filled : (console.log("Masukan tidak valid!"), false);
    }
    materialize(){}
}

//Bentuk spesial
class Triangle extends Shape {
    constructor(x1, y1, x2, y2, warna, isFilled, thirdPoint)
    {
        super(x1, y1, x2, y2, color, isFilled)
        this.x3 = thirdPoint[0];
        this.y3 = thirdPoint[1];
    }
    draw() {
        let x1 = this.x1;
        let x2 = this.x2;
        let x3 = this.x3;
        let y1 = this.y1;
        let y2 = this.y2;
        let y3 = this.y3;
        this.materialize([
                [x1, y1],
                [x2, y2],
                [x3, y3]
            ],
            this.filled ? gl.TRIANGLE_FAN : gl.LINE_LOOP
        );
    }
}