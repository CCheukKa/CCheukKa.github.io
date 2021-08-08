const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
const canvasBound = canvas.getBoundingClientRect();
const bKing     = document.getElementById("bKing");
const bCar      = document.getElementById("bCar");
const bHorse    = document.getElementById("bHorse");
const bCannon   = document.getElementById("bCannon");
const bServant  = document.getElementById("bServant");
const bElephant = document.getElementById("bElephant");
const bPawn     = document.getElementById("bPawn");
const wKing     = document.getElementById("wKing");
const wCar      = document.getElementById("wCar");
const wHorse    = document.getElementById("wHorse");
const wCannon   = document.getElementById("wCannon");
const wServant  = document.getElementById("wServant");
const wElephant = document.getElementById("wElephant");
const wPawn     = document.getElementById("wPawn");

const boardInit = [
    [-2,-3,-7,-3,-2],
    [-6,-5, 0,-5,-6],
    [ 0,-4, 0,-4, 0],
    [-1,-1,-1,-1,-1],
    [ 0, 0, 0, 0, 0],
    [ 1, 1, 1, 1, 1],
    [ 0, 4, 0, 4, 0],
    [ 6, 5, 0, 5, 6],
    [ 2, 3, 7, 3, 2]
];
var mX, mY, bX = 0, bY = 0, sX = 0, sY = 0, sPiece = 0, dPiece = 0;
var dX = 0, dY = 0;
var logicError = "";
var validNocap = [[0]];
var validCap = [[0]];
var flagDrawCaptureHighlight = false;

/*
0: empty
1: pawn
2: elephant
3: servant
4: cannon
5: horse
6: car
7: king
+: White    -: Black
*/

var tileSize = 80;
var w = 5 * tileSize;
var h = 9 * tileSize;
canvas.width = w;
canvas.height = h;
const outboardColour     = '#AAAF9D';
const inboardColour      = '#B3C49B';
const lineColour         = '#609868';
const highlightColour    = '#38887C';
const highlightCapColour = '#9A4155';
var board = boardInit;
drawBoard();
drawPiece();
var hasSelected = false;
canvas.addEventListener('mousedown', function (e) { onClicked(e) });





//================================================================
function drawBoard() {
    drawRect(0, 0, w, h, outboardColour);
    drawRect(0.5 * tileSize, 0.5 * tileSize, 4 * tileSize, 8 * tileSize, inboardColour);
    for (let i = 0; i < 5; i++) {
        drawLine((i + 0.5) * tileSize, tileSize / 2, (i + 0.5) * tileSize, 8.5 * tileSize, lineColour);
    }
    for (let i = 0; i < 10; i++) {
        drawLine(tileSize / 2, (i + 0.5) * tileSize, 4.5 * tileSize, (i + 0.5) * tileSize, lineColour);
    }
    drawLine(1.5 * tileSize, 0.5 * tileSize, 3.5 * tileSize, 2.5 * tileSize);
    drawLine(1.5 * tileSize, 2.5 * tileSize, 3.5 * tileSize, 0.5 * tileSize);
    drawLine(1.5 * tileSize, 6.5 * tileSize, 3.5 * tileSize, 8.5 * tileSize);
    drawLine(1.5 * tileSize, 8.5 * tileSize, 3.5 * tileSize, 6.5 * tileSize);
    return;
}
function drawRect(x1, y1, x2, y2, colour) {
        c.fillStyle = colour;
        c.fillRect(x1, y1, x2, y2);
        return;
}
function drawLine(x1, y1, x2, y2, colour) {
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineWidth = 6;
    c.strokeStyle = colour;
    c.stroke();
}
function drawPiece() {
    var piece;
    var noDraw = false;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 5; j++) {
            switch (board[i][j]) {
                case 1: { piece = wPawn; break; }
                case 2: { piece = wElephant; break; }
                case 3: { piece = wServant; break; }
                case 4: { piece = wCannon; break; }
                case 5: { piece = wHorse; break; }
                case 6: { piece = wCar; break; }
                case 7: { piece = wKing; break; }
                case -1: { piece = bPawn; break; }
                case -2: { piece = bElephant; break; }
                case -3: { piece = bServant; break; }
                case -4: { piece = bCannon; break; }
                case -5: { piece = bHorse; break; }
                case -6: { piece = bCar; break; }
                case -7: { piece = bKing; break; }
                default: { noDraw = true; break; }
            }
            if (!noDraw) { c.drawImage(piece, j * tileSize, i * tileSize, tileSize, tileSize) };
            noDraw = false;
        }
    }
}
//================================================================
function getMousePos(event) {
     mX = event.clientX - canvasBound.left;
     mY = event.clientY - canvasBound.top;
    return;
}
function onClicked(event) {
    getMousePos(event);
     mX -= 10;
     mY -= 10;
    if ( mX < 0 |  mX > 5 * tileSize) { return; }
    if ( mY < 0 |  mY > 9 * tileSize) { return; }
    bX = Math.floor(mX / tileSize);
    bY = Math.floor(mY / tileSize);

    if (!hasSelected) { //select
        sPiece = board[bY][bX];
        if (sPiece == 0) {
            return;
        }
        sX = bX;
        sY = bY;
        hasSelected = true;
    } else { //place
        hasSelected = false;
        dPiece = board[bY][bX];
        dX = bX - sX;
        dY = bY - sY;
        if (logicCheck() == false) {
            console.log(logicError);
            highlight();
            return;
        }
        board[bY][bX] = sPiece;
        board[sY][sX] = 0;
    }
    drawBoard();
    if (hasSelected) {
        highlight();
        enumerateValidMoves();
        highlightValidMoves();
    }
    drawPiece();
    if (hasSelected) {
        highlightValidCapMoves();
    }
    flagDrawCaptureHighlight = true;
    return;
}
//================================================================
function logicCheck() {
    if (sPiece * dPiece > 0) {
        logicError = "Friendly fire";
        return false;
    }
    switch (Math.abs(sPiece)) {
        case 1: { //pawn
            logicError = "Invalid pawn";
            if (sPiece > 0) {
                if (bY > sY) { return false; }
                if (sY >= 5 && dX != 0) { return false;}
            } else {
                if (bY < sY) { return false; }
                if (sY <= 4 && dX != 0) { return false;}
            }
            if (dX ** 2 + dY ** 2 != 1) {
                return false;
            }
            return true;
        }
        case 2: { //elephant
            logicError = "Invalid elephant";
            if (Math.abs(dX) == 2 && Math.abs(dY) == 2) {
                if (sPiece > 0 && bY < 4) {
                    return false;
                }
                if (sPiece < 0 && bY > 5) {
                    return false;
                }
                if (dX == dY) { //down-right
                    let j = Math.min(bX, sX) + 1;
                    for (let i = Math.min(bY, sY) + 1; i < Math.max(bY, sY); i++) {
                        if (board[i][j] != 0) {
                            return false;
                        }
                        j++;
                    }
                } else { //up-right
                    let j = Math.max(bX, sX) - 1;
                    for (let i = Math.min(bY, sY) + 1; i < Math.max(bY, sY); i++) {
                        if (board[i][j] != 0) {
                            return false;
                        }
                        j--;
                    }
                }
                return true;
            }
            return false;
        }
        case 3: { //servant
            logicError = "Invalid servant";
            if (Math.abs(dX) != 1 | Math.abs(dY) != 1) {
                return false;
            }
            if (!(bX >= 1 && bX <= 3)) {
                return false;
            }
            if (sPiece > 0 && bY >= 6 && bY <= 8) {
                return true;
            }
            if (sPiece < 0 && bY >= 0 && bY <= 2) {
                return true;
            }
            return false;
        }
        case 4: { //cannon
            logicError = "Invalid cannon";
            var obstacleCount = 0;
            if (bX == sX | bY == sY) {
                if (bX == sX) { //vertical
                    for (let i = Math.min(bY, sY) + 1; i < Math.max(bY, sY); i++) {
                        if (board[i][bX] != 0) {
                            obstacleCount++;
                        }
                    }
                } else { //horizontal
                    for (let i = Math.min(bX, sX) + 1; i < Math.max(bX, sX); i++) {
                        if (board[bY][i] != 0) {
                            obstacleCount++;
                        }
                    }
                }
                if ((dPiece == 0 && obstacleCount > 0) | (sPiece * dPiece < 0 && obstacleCount != 1)) {
                    return false;                    
                }
                return true;
            }
            return false;
        }
        case 5: { //horse
            logicError = "Invalid horse";
            if ((dX) ** 2 + (dY) ** 2 != 5) {
                return false;
            }
            if (Math.abs(dX) > Math.abs(dY)) { //horizontal
                return board[sY][(bX + sX) / 2] == 0;
            } else { //vertical
                return board[(bY + sY) / 2][sX] == 0;
            }
        }
        case 6: { //car
            logicError = "Invalid car";
            if (bX == sX | bY == sY) {
                if (bX == sX) { //vertical
                    for (let i = Math.min(bY, sY) + 1; i < Math.max(bY, sY); i++) {
                        if (board[i][bX] != 0) {
                            return false;
                        }
                    }
                } else { //horizontal
                    for (let i = Math.min(bX, sX) + 1; i < Math.max(bX, sX); i++) {
                        if (board[bY][i] != 0) {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        }
        case 7: { //king
            logicError = "Invalid king";
            if (dX ** 2 + dY ** 2 != 1) {
                return false;
            }
            if (!(bX >= 1 && bX <= 3)) {
                return false;
            }
            if (sPiece > 0 && bY >= 6 && bY <= 8) {
                return true;
            }
            if (sPiece < 0 && bY >= 0 && bY <= 2) {
                return true;
            }
            return false;
        }   
        default: {
            logicError = "NULL";
            return false;
        }
    }
}
//================================================================
function enumerateValidMoves() {
    validNocap = [];
    validCap = [];
    sPiece = board[sY][sX];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 9; j++) {
            bX = i, bY = j;
            dPiece = board[j][i];
            dX = bX - sX;
            dY = bY - sY;
            if (logicCheck()) {
                if (dPiece == 0) {
                    validNocap.push([bX, bY]);
                } else {
                    validCap.push([bX, bY]);
                }
            }
        }
    }
}
function highlightValidMoves() {
    if (!hasSelected) {
        drawBoard();
        drawPiece();
        return;
    }
    c.globalAlpha = 0.6;
    c.fillStyle = highlightColour;
    
    validNocap.forEach(coord => {
        for (let i = 0; i < 2; i++) {
            c.beginPath();
            c.arc((coord[0] + 0.5) * tileSize, (coord[1] + 0.5) * tileSize, 0.2 * tileSize - 0.05 * tileSize * i, 0, 2 * Math.PI);
            c.fill();
        }
    });

    c.globalAlpha = 1.0;
    c.beginPath();
}
function highlightValidCapMoves(){
    c.globalAlpha = 0.4;
    c.fillStyle = highlightCapColour;
    
    validCap.forEach(coord => {
        for (let i = 0; i < 2; i++) {
            c.beginPath();
            c.arc((coord[0] + 0.5) * tileSize, (coord[1] + 0.5) * tileSize, 0.55 * tileSize - 0.15 * tileSize * i, 0, 2 * Math.PI);
            c.fill();
        }
    });

    c.globalAlpha = 1.0;
    c.beginPath();
}
function highlight() {
    if (!hasSelected) {
        drawBoard();
        drawPiece();
        return;
    }
    c.globalAlpha = 0.3;
    c.fillStyle = highlightColour;
    for (let i = 0; i < 4; i++) {
        c.beginPath();
        c.arc((sX + 0.5) * tileSize, (sY + 0.5) * tileSize, 0.6 * tileSize - 0.15 * tileSize * i, 0, 2 * Math.PI);
        c.fill();
    }

    c.globalAlpha = 1.0;
    c.beginPath();
}