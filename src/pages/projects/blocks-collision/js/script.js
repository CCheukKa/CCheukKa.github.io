var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

canvas.width = 1500;
canvas.height = 700;

//
class Block {
    constructor(pos, vel = 0, mass = 1) {
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.length = 40 * Math.sqrt(this.mass);
        blockList.push(this);
    }
}
//

const palette = [ /*canvas*/ '#1a2b47', '#25a282', '#bebe9d', '#cdab6b', '#c84c2b', '#287287', '#f0bb5e', '#a2837d', '#d26931'];
const timeStepMS = 1;
const blockList = [];

//
const block1 = new Block(500, 0, 1);
const block2 = new Block(1000, -5, 10);
//

setInterval(function() {
    physics();
    redraw();
}, timeStepMS);

//===================================================================

function physics() {
    blockList.forEach(block => {
        block.pos += block.vel * timeStepMS / 5;
    });
    if (block1.pos <= 0) {
        block1.pos -= block1.vel;
        block1.vel *= -1;
        block1.pos = block1.vel - block1.pos;
    }
    if (block1.pos + block1.length >= block2.pos) {
        block1.vel = block2.vel;
        block2.vel = 0;
    }
}

function redraw() {
    drawRect(0, 0, canvas.width, canvas.height, palette[1]);
    drawRect(20, 0, canvas.width, canvas.height - 20, palette[0]);

    drawRect(block1.pos + 20, canvas.height - 20 - block1.length, block1.length, block1.length, palette[2]);
    drawRect(block2.pos + 20, canvas.height - 20 - block2.length, block2.length, block2.length, palette[3]);

    return;
}

function drawRect(x1, y1, dx, dy, colour) {
    c.fillStyle = colour;
    c.fillRect(x1, y1, dx, dy);
    return;
}