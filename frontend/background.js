class Background {
    constructor(context, squareWidth, squareHeight) {
        this.ctx = context;
        this.squareWidth = squareWidth || 20;
        this.squareHeight = squareHeight || 20;
    }
    render() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
        let cols = Math.ceil(innerWidth/this.squareWidth);
        let rows = Math.ceil(innerHeight/this.squareHeight);

        for (let i=0; i < cols; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.squareWidth*i, 0);
            this.ctx.lineTo(this.squareWidth*i, innerHeight);
            this.ctx.stroke();
        }
        for (let i=0; i < rows; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.squareHeight*i);
            this.ctx.lineTo(innerWidth, this.squareHeight*i);
            this.ctx.stroke();
        }
    }
    setSquareDimensions(width, height) {
        this.squareWidth = width;
        this.squareHeight = height;
    }
}