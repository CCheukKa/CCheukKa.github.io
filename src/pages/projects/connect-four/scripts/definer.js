const s = document.getElementById('board');
const i = document.getElementById('indicator-board');
const gameContainer = document.getElementById('game-container');

const tileSize = 60;
const width = tileSize * 7;
const height = tileSize * 6;
s.style.width = width;
s.style.height = height;
i.style.width = width;
i.style.height = height;
gameContainer.style.width = `${width}px`;
gameContainer.style.height = `${height}px`;
const boardInit = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];
var board = boardInit;

class PieceEvent {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
    }
}