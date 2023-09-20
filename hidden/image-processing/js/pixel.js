class Pixel {
    constructor(r = 0, g = 0, b = 0, isSigned = false) {
        this.r = r;
        this.g = g;
        this.b = b;

        if (isSigned) {
            this.r = this.r;
            this.g = this.g;
            this.b = this.b;
        }
    }

    set colour([r, g, b]) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    get colour() {
        return [this.r, this.g, this.b];
    }

    set value(value) {
        this.r = value;
        this.g = value;
        this.b = value;
    }

    get value() {
        return (this.r + this.g + this.b) / 3;
    }

    scale(factor = 1) {
        return new Pixel(this.r * factor, this.g * factor, this.b * factor);
    }

    get collapsed() {
        let average = (this.r + this.g + this.b) / 3;
        return new Pixel(average, average, average);
    }
}