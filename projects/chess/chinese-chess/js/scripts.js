const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
const canvasBound = canvas.getBoundingClientRect();
const bKing     = document.getElementById("bKing");
const bRook      = document.getElementById("bRook");
const bHorse    = document.getElementById("bHorse");
const bCannon   = document.getElementById("bCannon");
const bServant  = document.getElementById("bServant");
const bElephant = document.getElementById("bElephant");
const bPawn     = document.getElementById("bPawn");
const wKing     = document.getElementById("wKing");
const wRook      = document.getElementById("wRook");
const wHorse    = document.getElementById("wHorse");
const wCannon   = document.getElementById("wCannon");
const wServant  = document.getElementById("wServant");
const wElephant = document.getElementById("wElephant");
const wPawn     = document.getElementById("wPawn");
const eButton = document.getElementById("evaluateButton");
const bRandomButton = document.getElementById("blackMoveRandomButton");
const wRandomButton = document.getElementById("whiteMoveRandomButton");


const boardInit = [
    [-6,-5,-2,-3,-7,-3,-2,-5,-6],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,-4, 0, 0, 0, 0, 0,-4, 0],
    [-1, 0,-1, 0,-1, 0,-1, 0,-1],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [ 0, 4, 0, 0, 0, 0, 0, 4, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 6, 5, 2, 3, 7, 3, 2, 5, 6]
];
const pieceScore = [
    null,
    10, //pawn
    15, //elephant
    10, //servant
    40, //cannon
    35, //horse
    50, //rook
    900 //king
]
const posScoreTable = [
    //null
    [],

    //1 pawn
    [
        [-5,-3,-1,-1,-1,-1,-1,-3,-5],[-2,-1,1.5,3,4,3,1.5,-1,-2],[-0.5,1.5,2.5,3.5,3.5,3.5,2.5,1.5,-0.5],[0,1,2,2.5,2.5,2.5,2,1,0],[0.5,0.5,1.5,2,2,2,1.5,0.5,0.5],[0,,1,,1,,1,,0],[0,,0,,0,,0,,0],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,]
    ],
    
    //2 elephant
    [
        [,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,-1,,,,-1,,],[,,,,,,,,],[-2,,,,3,,,,-2],[,,,,,,,,],[,,0,,,,0,,]
    ],
    
    //3 servant
    [
        [,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,-2,,-2,,,],[,,,,-1,,,,],[,,,0,,0,,,]
    ],
    
    //4 cannon
    [
        [1,1.5,1.5,0,0,0,1.5,1.5,1],[0.5,1,1,1,1,1,1,1,0.5],[0.5,0,0,0.5,2,0.5,0,0,0.5],[0.5,0,0,1,2,1,0,0,0.5],[0.5,0,0,1,2,1,0,0,0.5],[-0.5,0,0,1,2,1,0,0,-0.5],[-0.5,0,0,1,2,1,0,0,-0.5],[-0.5,0,0,0,1,0,0,0,-0.5],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1.5,-1.5,-3,-4,-3,-1.5,-1.5,-1]
    ],
    
    //5 horse
    [
        [-4,-2,-1,-2,-2,-2,-1,-2,-4],[-3,1,0.5,0.5,1,0.5,1.5,-2,-3],[-2,0.5,1.5,1,1.5,1,1.5,0.5,-2],[-2,1,2,2,1.5,2,2,1,-2],[-2,1.5,1.5,1.5,1,1.5,1.5,1.5,-2],[-2,1,1,1,0.5,1,1,1,-2],[-2,0.5,1,1,0,1,1,0.5,-2],[-2,0.5,1,0.5,0,0.5,1,0.5,-2],[-3,-2,0,-2,-4,-2,0,-2,-3],[-4,-3,-3,-4,-5,-4,-3,-3,-4]
    ],
    
    //6 rook
    [
        [0.5,0.5,0.5,1,1,1,0.5,0.5,0.5],[0.5,1.5,1,0.5,0.5,0.5,1,1.5,0.5],[0.5,0,0,0.5,0.5,0.5,0,0,0.5],[0.5,0,0,0,0,0,0,0,0.5],[-0.5,0,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,0,-0.5],[0,0,0,1,1,1,0,0,0],[0,0.5,0,1,0,1,0,0.5,0]
    ],
    
    //7 king
    [
        [,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,-4,-5,-4,,,],[,,,-2,-3,-2,,,],[,,,0,0,0,,,]
    ]
];
const drawCoord = false;
var mX, mY; //mouse pos
var bX = 0, bY = 0; //last clicked coords
var sX = 0, sY = 0, sPiece = 0; //selected piece
var dPiece = 0; //destination piece
var dX = 0, dY = 0; //delta coords
var logicError = "";
var validNocap = [[0]];
var validCap = [[0]];
var flagDrawCaptureHighlight = false;
var moveCount = 0;
var blackValid = [], whiteValid = []; //all valid moves
var score = 0; //evaluation score

/*
0: empty
1: pawn
2: elephant
3: servant
4: cannon
5: horse
6: rook
7: king
+: White    -: Black
*/

var tileSize = 80;
var w = 9 * tileSize;
var h = 10 * tileSize;
canvas.width = w;
canvas.height = h;
const outboardColour     = '#AAAF9D';
const inboardColour      = '#B3C49B';
const lineColour         = '#609868';
const highlightColour    = '#38887C';
const highlightCapColour = '#9A4155';
var board = boardInit;
redraw();
var hasSelected = false;
canvas.addEventListener('mousedown', function (e) { onClicked(e) });
eButton.addEventListener('mousedown', function () { evaluate() });
bRandomButton.addEventListener('mousedown', function () { blackRandomMove() });
wRandomButton.addEventListener('mousedown', function () { whiteRandomMove() });

//================================================================
function drawBoard() {
    drawRect(0, 0, w, h, outboardColour);
    drawRect(0.5 * tileSize, 0.5 * tileSize, 8 * tileSize, 9 * tileSize, inboardColour);
    for (let i = 0; i < 9; i++) {
        drawLine((i + 0.5) * tileSize, tileSize / 2, (i + 0.5) * tileSize, 4.5 * tileSize, lineColour);
    }
    for (let i = 0; i < 9; i++) {
        drawLine((i + 0.5) * tileSize, 5.5 * tileSize, (i + 0.5) * tileSize, 9.5 * tileSize, lineColour);
    }
    for (let i = 0; i < 10; i++) {
        drawLine(tileSize / 2, (i + 0.5) * tileSize, 8.5 * tileSize, (i + 0.5) * tileSize, lineColour);
    }
    drawLine(tileSize / 2, tileSize / 2, tileSize / 2, 9.5 * tileSize);
    drawLine(8.5 * tileSize, tileSize / 2, 8.5 * tileSize, 9.5 * tileSize);
    drawLine(3.5 * tileSize, 0.5 * tileSize, 5.5 * tileSize, 2.5 * tileSize);
    drawLine(3.5 * tileSize, 2.5 * tileSize, 5.5 * tileSize, 0.5 * tileSize);
    drawLine(3.5 * tileSize, 7.5 * tileSize, 5.5 * tileSize, 9.5 * tileSize);
    drawLine(3.5 * tileSize, 9.5 * tileSize, 5.5 * tileSize, 7.5 * tileSize);
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
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j++) {
            switch (board[i][j]) {
                case 1: { piece = wPawn; break; }
                case 2: { piece = wElephant; break; }
                case 3: { piece = wServant; break; }
                case 4: { piece = wCannon; break; }
                case 5: { piece = wHorse; break; }
                case 6: { piece = wRook; break; }
                case 7: { piece = wKing; break; }
                case -1: { piece = bPawn; break; }
                case -2: { piece = bElephant; break; }
                case -3: { piece = bServant; break; }
                case -4: { piece = bCannon; break; }
                case -5: { piece = bHorse; break; }
                case -6: { piece = bRook; break; }
                case -7: { piece = bKing; break; }
                default: { noDraw = true; break; }
            }
            if (!noDraw) { c.drawImage(piece, j * tileSize, i * tileSize, tileSize, tileSize) };
            noDraw = false;
        }
    }
}
function redraw() {
    drawBoard();
    drawPiece();
    if (drawCoord) { drawCoords(); }
    return;
}
function drawCoords() {
    for (let i = 1; i <= 10; i++) {
        drawText(i, tileSize / 10, (i - 0.35) * tileSize, 'white');
    }
}
function drawText(text, x, y, colour) {
    c.font = 'bold 30px sans-serif';
    c.fillStyle = colour;
    c.fillText(text, x, y);
    return;
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
    if ( mX < 0 |  mX > 9 * tileSize) { return; }
    if ( mY < 0 |  mY > 10 * tileSize) { return; }
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
        enumerateLocalValidMoves();
        highlightValidMoves();
    }
    drawPiece();
    if (hasSelected) {
        highlightValidCapMoves();
    }
    flagDrawCaptureHighlight = true;
    return;
}
function enforceMove(x1, y1, x2, y2) {
    board[y2][x2] = board[y1][x1];
    board[y1][x1] = 0;
    //redraw
    redraw();
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
                if (sPiece > 0 && bY <= 4) {
                    return false;
                }
                if (sPiece < 0 && bY >= 5) {
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
            if (!(bX >= 3 && bX <= 5)) {
                return false;
            }
            if (sPiece > 0 && bY >= 7 && bY <= 9) {
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
        case 6: { //rook
            logicError = "Invalid rook";
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
            if (!(bX >= 3 && bX <= 5)) {
                return false;
            }
            if (sPiece > 0 && bY >= 7 && bY <= 9) {
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
function enumerateLocalValidMoves() {
    validNocap = [];
    validCap = [];
    sPiece = board[sY][sX];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 10; j++) {
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
    //console.log(validNocap);
    //console.log(validCap);
}
function highlightValidMoves() {
    if (!hasSelected) {
        redraw();
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
        redraw();
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
//=================================================================
//=================================================================
//=================================================================
function enumerateValidMoves() {
    blackValid = [];
    whiteValid = [];
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 9; x++) {
            sX = x;
            sY = y;
            sPiece = board[y][x];
            if (sPiece == 0) {
                continue;
            }

            for (let yy = 0; yy < 10; yy++) {
                for (let xx = 0; xx < 9; xx++) {
                    bX = xx;
                    bY = yy;
                    dPiece = board[yy][xx];
                    dX = bX - sX;
                    dY = bY - sY;
                    if (logicCheck()) {
                        if (sPiece > 0) {
                            whiteValid.push([x, y, xx, yy]);
                        } else {
                            blackValid.push([x, y, xx, yy]);
                        }
                    }
                }
            }
        }
    }
    //console.clear();
    //console.log(blackValid);
    //console.log("========================");
    //console.log(whiteValid);
    //console.log("========================");
    return;
}
function evaluate() {
    score = 0;
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 9; x++) {
            var piece = board[y][x];
            if (piece == 0) { continue;}
            score += Math.sign(piece) * (pieceScore[Math.abs(piece)] + positionScore(piece, x, y));
        }
    }
    console.log("Score: " + score);
    return;
}
function positionScore(piece, x, y) {
    if (piece < 0) {
        return posScoreTable[Math.abs(piece)][9 - y][x];
    } else {
        return posScoreTable[piece][y][x];
    }
}
//=================================================================
function whiteRandomMove() {
    enumerateValidMoves();
    var move = whiteValid[Math.floor(Math.random() * whiteValid.length)];
    console.log(move);
    //parse
    x1 = move[0];
    y1 = move[1];
    x2 = move[2];
    y2 = move[3];
    enforceMove(x1, y1, x2, y2);
    return;
}
function blackRandomMove() {
    enumerateValidMoves();
    var move = blackValid[Math.floor(Math.random() * blackValid.length)];
    console.log(move);
    //parse
    x1 = move[0];
    y1 = move[1];
    x2 = move[2];
    y2 = move[3];
    enforceMove(x1, y1, x2, y2);
    return;
}