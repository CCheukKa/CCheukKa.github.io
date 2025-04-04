const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
const scoreText = document.getElementById("scoreText");
const heldPieceCanvas = document.getElementById("heldPieceCanvas");
const heldC = heldPieceCanvas.getContext("2d");
const speedText = document.getElementById("speedText");

const tileSize = 30;
const xCount = 10;
const yCount = 20;
const width = tileSize * xCount;
const height = tileSize * yCount;
canvas.width = width;
canvas.height = height;
heldPieceCanvas.width = 4 * tileSize;
heldPieceCanvas.height = 4 * tileSize;

var timeStepMS = 1000;
const minTimeStep = 100;
const timeStepDec = 50;
const blockPalette = ['#61a6b4', '#F4CF5E', '#9eba6d', '#d1781D', '#e27e80', '#007a90', '#7061b1'];
// const blockPalette = ['#a87398', '#fadf8c', '#9eba6d', '#f4c392', '#e27e80', '#61a6b4', '#7061b1'];
const palette = ['#303030', '#202020', '#424242'];
//
var globalDead = false;
const cycleSpeed = 50;
var cycleCount = 0;
var score = 0;
var currentTetromino;
var skipDropThisFrame = false;
var noRender = false;
var blockPlaced = false;
var heldPiece = -1;
var alreadyHeld = false;
var stat = [0, 0, 0, 0, 0, 0, 0];
//
class Tetromino {
    constructor(type, x, y) {
        if (!isWithinInclusiveRange(type, 0, 6)) {
            delete this;
            return false;
        }
        this.x = x;
        this.y = y;
        this.type = type;
        this.children = [];
        for (let i = 0; i < 4; i++) {
            this.children.push(new Block(i, this));
        }
        initialiseChildren(this);
    }
}
class Block {
    constructor(id, parent) {
        this.id = id;
        this.parent = parent;
        this.x, this.y;
    }
}
//
var tile = [
    []
];
for (let y = 0; y < yCount + 1; y++) {
    tile[y] = [];
    for (let x = 0; x < xCount; x++) {
        tile[y].push(0);
    }
}
//
disableScroll();
document.addEventListener('keydown', function(e) { keyDown(e.code) });
spawnTetromino();
render();
setInterval(function() {
    if (cycleCount >= timeStepMS) {
        cycleCount = 0;
        if (!skipDropThisFrame) {
            moveVertical(currentTetromino);
        }
        skipDropThisFrame = false;
    }
    cycleCount += cycleSpeed;
    speedText.textContent = 'Current speed: ' + timeStepMS + 'ms per tick';
    if (timeStepMS <= minTimeStep) {
        speedText.textContent += ' | (Max speed)';
    }
    console.log(stat);
}, cycleSpeed);

//===================================================================
function spawnTetromino(type) {
    if (currentTetromino) {
        currentTetromino.children.forEach(child => {
            delete child;
        });
        delete currentTetromino;
    }
    let randomType = Math.floor(Math.random() * 7);
    stat[randomType]++;
    if (isWithinInclusiveRange(type, 0, 6)) {
        randomType = type;
    }
    switch (randomType) {
        case 0:
        case 1:
            currentTetromino = new Tetromino(randomType, Math.floor((xCount - 1) / 2) + 0.5, yCount - 1.5);
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            currentTetromino = new Tetromino(randomType, Math.floor((xCount - 1) / 2), yCount - 2);
            break;
    }
}

function moveVertical(parent) {
    skipDropThisFrame = true;
    let blocked = false;
    parent.children.forEach(child => {
        if (child.y - 1 < 0) {
            blocked = true;
            return;
        }
        if (tile[child.y - 1][child.x] != 0) {
            blocked = true;
            return;
        }
    })
    if (blocked) {
        placeBlock(parent);
        return;
    }
    parent.y--;
    parent.children.forEach(child => {
        child.y--;
    })
    if (noRender) {
        noRender = false;
        return;
    }
    render();
    return;
}

function initialiseChildren(parent) {
    parent.children.forEach(child => {
        switch (parent.type) {
            case 0:
                { //line
                    child.y = parent.y + 0.5;
                    switch (child.id) {
                        case 0:
                            child.x = parent.x - 1.5;
                            break;
                        case 1:
                            child.x = parent.x - 0.5;
                            break;
                        case 2:
                            child.x = parent.x + 0.5;
                            break;
                        case 3:
                            child.x = parent.x + 1.5;
                            break;
                    }
                    break;
                }
            case 1:
                { //square
                    switch (child.id) {
                        case 0:
                            child.x = parent.x - 0.5;
                            child.y = parent.y - 0.5;
                            break;
                        case 1:
                            child.x = parent.x - 0.5;
                            child.y = parent.y + 0.5;
                            break;
                        case 2:
                            child.x = parent.x + 0.5;
                            child.y = parent.y - 0.5;
                            break;
                        case 3:
                            child.x = parent.x + 0.5;
                            child.y = parent.y + 0.5;
                            break;
                    }
                    break;
                }
            case 2:
                { //S-block
                    switch (child.id) {
                        case 0:
                            child.x = parent.x - 1;
                            child.y = parent.y;
                            break;
                        case 1:
                            child.x = parent.x;
                            child.y = parent.y;
                            break;
                        case 2:
                            child.x = parent.x;
                            child.y = parent.y + 1;
                            break;
                        case 3:
                            child.x = parent.x + 1;
                            child.y = parent.y + 1;
                            break;
                    }
                    break;
                }
            case 3:
                { //L-block
                    switch (child.id) {
                        case 0:
                            child.x = parent.x + 1;
                            child.y = parent.y + 1;
                            break;
                        case 1:
                            child.x = parent.x - 1;
                            child.y = parent.y;
                            break;
                        case 2:
                            child.x = parent.x;
                            child.y = parent.y;
                            break;
                        case 3:
                            child.x = parent.x + 1;
                            child.y = parent.y;
                            break;
                    }
                    break;
                }
            case 4:
                { //S-reverse
                    switch (child.id) {
                        case 0:
                            child.x = parent.x - 1;
                            child.y = parent.y + 1;
                            break;
                        case 1:
                            child.x = parent.x;
                            child.y = parent.y + 1;
                            break;
                        case 2:
                            child.x = parent.x;
                            child.y = parent.y;
                            break;
                        case 3:
                            child.x = parent.x + 1;
                            child.y = parent.y;
                            break;
                    }
                    break;
                }
            case 5:
                { //L-reverse
                    switch (child.id) {
                        case 0:
                            child.x = parent.x - 1;
                            child.y = parent.y + 1;
                            break;
                        case 1:
                            child.x = parent.x - 1;
                            child.y = parent.y;
                            break;
                        case 2:
                            child.x = parent.x;
                            child.y = parent.y;
                            break;
                        case 3:
                            child.x = parent.x + 1;
                            child.y = parent.y;
                            break;
                    }
                    break;
                }
            case 6:
                { //T-block
                    switch (child.id) {
                        case 0:
                            child.x = parent.x;
                            child.y = parent.y + 1;
                            break;
                        case 1:
                            child.x = parent.x - 1;
                            child.y = parent.y;
                            break;
                        case 2:
                            child.x = parent.x;
                            child.y = parent.y;
                            break;
                        case 3:
                            child.x = parent.x + 1;
                            child.y = parent.y;
                            break;
                    }
                    break;
                }
        }
    });
}

function moveHorizontal(direction, parent) {
    let abort = false;
    parent.children.forEach(child => {
        if (!isWithinInclusiveRange(child.x + direction, 0, xCount - 1)) {
            abort = true;
            return;
        }
        if (tile[child.y][child.x + direction] != 0) {
            abort = true;
            return;
        }
    });

    if (abort) { return; }
    parent.x += direction;
    parent.children.forEach(child => {
        child.x += direction;
    });
    render();
    return;
}

function rotate(direction, parent) {
    let abort = false;
    parent.children.forEach(child => {
        var xParented = child.x - parent.x;
        var yParented = child.y - parent.y;
        if (tile[parent.y - (direction == 1) * xParented + (direction == -1) * xParented][parent.x + (direction == 1) * yParented - (direction == -1) * yParented] != 0) {
            abort = true;
            return;
        }
    });
    if (abort) { return; }
    parent.children.forEach(child => {
        var xParented = child.x - parent.x;
        var yParented = child.y - parent.y;
        child.x = parent.x + (direction == 1) * yParented - (direction == -1) * yParented;
        child.y = parent.y - (direction == 1) * xParented + (direction == -1) * xParented;
    });
    render();
    return;
}

function placeBlock(parent) {
    parent.children.forEach(block => {
        tile[block.y][block.x] = block.parent.type + 1;
    })
    blockPlaced = true;
    alreadyHeld = false;
    spawnTetromino();
    lineClear();
    render();
    deathCheck();
    return;
}

function hardDrop(parent) {
    while (!blockPlaced) {
        noRender = true;
        moveVertical(parent);
    }
    noRender = false;
    blockPlaced = false;
    skipDropThisFrame = false;
    return;
}

function lineClear() {
    let linesCleared = 0;
    for (let y = 0; y < yCount; y++) {
        let abort = false;
        for (let x = 0; x < xCount; x++) {
            if (tile[y][x] == 0) {
                abort = true;
                break;
            }
        }
        if (!abort) {
            linesCleared++;
            for (let x = 0; x < xCount; x++) {
                tile[y][x] = 0;
            }
            for (let yUp = y; yUp < yCount - 1; yUp++) {
                for (let x = 0; x < xCount; x++) {
                    tile[yUp][x] = tile[yUp + 1][x];
                }
            }
            y--;
        }
    }
    score += Math.pow(linesCleared, 2);
    if (linesCleared) {
        timeStepMS = clamp(timeStepMS - timeStepDec, minTimeStep, timeStepMS);
    }
    return;
}

function deathCheck() {
    let isDead = false;
    for (let x = 0; x < xCount; x++) {
        if (tile[yCount - 2][x] != 0) {
            isDead = true;
            break;
        }
    }
    if (isDead) {
        drawRect(0, 0, width, height, palette[0]);
        drawText('DEAD', width / 2, height / 2, 0, 'red', 'white');
        globalDead = true;
    }
    return;
}

function holdPiece() {
    if (alreadyHeld) {
        return;
    }
    let flag = heldPiece;
    heldPiece = currentTetromino.type;
    if (isWithinInclusiveRange(flag, 0, 6)) {
        spawnTetromino(flag);
    } else {
        spawnTetromino();
    }
    render();
    skipDropThisFrame = true;
    alreadyHeld = true;
    return;
}
//===================================================================
function keyDown(key) {
    //console.log(key + ' pressed');
    switch (key) {
        case 'ArrowLeft':
            moveHorizontal(-1, currentTetromino);
            break;
        case 'ArrowRight':
            moveHorizontal(1, currentTetromino);
            break;
        case 'KeyX':
        case 'ArrowUp':
            rotate(1, currentTetromino);
            break;
        case 'KeyZ':
            rotate(-1, currentTetromino);
            break;
        case 'ArrowDown':
            moveVertical(currentTetromino);
            break;
        case 'Space':
            hardDrop(currentTetromino);
            break;
        case 'ShiftLeft':
        case 'ShiftRight':
            holdPiece();
            break;
        case 'KeyR':
            location.reload();
            break;
        default:
            return;
    }
    return;
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.querySelector('html').scrollTop = window.scrollY;
    return;
}
//===================================================================
function render() {
    if (globalDead) {
        return;
    }
    scoreText.textContent = 'Score: ' + score;
    drawBoard();
    drawGrid();
    drawGhost();
    drawCurrentPiece();
    drawHeldPiece();
    return;
}

function drawCurrentPiece() {
    currentTetromino.children.forEach(block => {
        drawRect(block.x * tileSize, height - (block.y + 1) * tileSize, tileSize, tileSize, blockPalette[currentTetromino.type]);
    });
    return;
}

function drawBoard() {
    drawRect(0, 0, width, height, palette[1]);
    for (let x = 0; x < xCount; x++) {
        for (let y = 0; y < yCount - 1; y++) {
            if (tile[y][x] != 0) {
                drawRect(x * tileSize, height - ((y + 1) * tileSize), tileSize, tileSize, blockPalette[tile[y][x] - 1]);
            }
        }
    }
    return;
}

function drawGrid() {
    for (let x = 0; x < xCount; x++) {
        drawLine(x * tileSize, 0, x * tileSize, height, palette[0]);
    }
    for (let y = 0; y < yCount; y++) {
        drawLine(0, y * tileSize, width, y * tileSize, palette[0]);
    }
    return;
}

function drawGhost() {
    var xGhost = [];
    var yGhost = [];
    let blocked = false;
    currentTetromino.children.forEach(block => {
        xGhost.push(block.x);
        yGhost.push(block.y);
    });
    while (!blocked) {
        for (let i = 0; i < 4; i++) {
            if (yGhost[i] - 1 < 0) {
                blocked = true;
                break;
            }
            if (tile[yGhost[i] - 1][xGhost[i]] != 0) {
                blocked = true;
                break;
            }
        }
        if (!blocked) {
            for (let i = 0; i < 4; i++) {
                yGhost[i]--;
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        drawRect(xGhost[i] * tileSize, height - (yGhost[i] + 1) * tileSize, tileSize, tileSize, palette[2]);
    }
}

function drawHeldPiece() {
    //drawBoard
    drawRectHeld(0, 0, 4 * tileSize, 4 * tileSize, palette[1]);
    //drawGrid
    for (let i = 0; i < 4; i++) {
        drawLineHeld(i * tileSize, 0, i * tileSize, 4 * tileSize, palette[0]);
        drawLineHeld(0, i * tileSize, 4 * tileSize, i * tileSize, palette[0]);
    }
    //
    if (!isWithinInclusiveRange(heldPiece, 0, 6)) { return; }
    //drawPiece
    var xHeld = [];
    var yHeld = [];
    switch (heldPiece) {
        case 0: //line
            xHeld = [0, 1, 2, 3];
            yHeld = [2, 2, 2, 2];
            break;
        case 1: //square
            xHeld = [1, 1, 2, 2];
            yHeld = [1, 2, 1, 2];
            break;
        case 2: //S-block
            xHeld = [1, 2, 2, 3];
            yHeld = [2, 1, 2, 1];
            break;
        case 3: //L-block
            xHeld = [1, 2, 3, 3];
            yHeld = [2, 2, 1, 2];
            break;
        case 4: //S-reverse
            xHeld = [1, 2, 2, 3];
            yHeld = [1, 1, 2, 2];
            break;
        case 5: //L-reverse
            xHeld = [1, 1, 2, 3];
            yHeld = [1, 2, 2, 2];
            break;
        case 6: //T-block
            xHeld = [1, 2, 2, 3];
            yHeld = [2, 1, 2, 2];
            break;
    }
    for (let i = 0; i < 4; i++) {
        drawRectHeld(xHeld[i] * tileSize, yHeld[i] * tileSize, tileSize, tileSize, blockPalette[heldPiece]);
    }
    //
    return;
}
//===================================================================
function drawRect(x1, y1, dx, dy, colour) {
    c.fillStyle = colour;
    c.fillRect(x1, y1, dx, dy);
    return;
}

function drawRectHeld(x1, y1, dx, dy, colour) {
    heldC.fillStyle = colour;
    heldC.fillRect(x1, y1, dx, dy);
    return;
}

function drawLine(x1, y1, x2, y2, colour) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineWidth = 1;
    c.strokeStyle = colour;
    c.stroke();
    return;
}

function drawLineHeld(x1, y1, x2, y2, colour) {
    heldC.beginPath();
    heldC.moveTo(x1, y1);
    heldC.lineTo(x2, y2);
    heldC.lineWidth = 1;
    heldC.strokeStyle = colour;
    heldC.stroke();
    return;
}

function drawText(text, x, y, alignment, colour, strokeColour) {
    c.font = '100px Trebuchet MS';

    switch (alignment) {
        case 0:
        case 'center':
            c.textAlign = 'center';
            break;
        case 1:
        case 'left':
            c.textAlign = 'left';
            break;
        case 2:
        case 'right':
            c.textAlign = 'right';
            break;

        default:
            break;
    }

    c.fillStyle = colour;
    c.fillText(text, x, y + 5);

    if (strokeColour) {
        c.font = '100px Trebuchet MS';
        c.strokeStyle = strokeColour;
        c.strokeText(text, x, y + 5);
    }

    return;
}
//===================================================================
function clamp(x, limit1, limit2) {
    if (limit1 > limit2) { return clamp(x, limit2, limit1); }
    if (x < limit1) { return limit1; }
    if (x > limit2) { return limit2; }
    return x;
}

function isWithinInclusiveRange(test, lower, upper) {
    if (lower > upper) { return isWithinInclusiveRange(test, upper, lower) }
    return (lower <= test && test <= upper);
}

function isWithinExclusiveRange(test, lower, upper) {
    if (lower > upper) { return isWithinExclusiveRange(test, upper, lower) }
    return (lower < test && test < upper);
}