const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
const canvasBound = canvas.getBoundingClientRect();
const bPawn = document.getElementById("bPawn");
const bKnight = document.getElementById("bKnight");
const bBishop = document.getElementById("bBishop");
const bRook = document.getElementById("bRook");
const bQueen = document.getElementById("bQueen");
const bKing = document.getElementById("bKing");
const wPawn = document.getElementById("wPawn");
const wKnight = document.getElementById("wKnight");
const wBishop = document.getElementById("wBishop");
const wRook = document.getElementById("wRook");
const wQueen = document.getElementById("wQueen");
const wKing = document.getElementById("wKing");
const boardInit = [
    [5, 3, 2, 4],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [-1, -1, -1, -1],
    [-5, -3, -2, -4],
    [-6, -3, -2, -4],
    [-1, -1, -1, -1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [6, 3, 2, 4]
];
var mX, mY, bX = 0,
    bY = 0,
    sX = 0,
    sY = 0,
    sPiece = 0,
    dPiece = 0;
var dX = 0,
    dY = 0;
var wCastleQueen = true,
    wCastleKing = true,
    bCastleQueen = true,
    bCastleKing = true;
var enpassantSquare = [8, 8],
    enpassantVictim = [8, 8];
var isPromoting = false,
    wPromoting;
var logicError = "";
var validX = [0],
    validY = [0];

/*
0: empty
1: pawn
2: knight
3: bishop
4: rook
5: queen
6: king
+: White    -: Black
*/

var tileSize = 60;
var boardSize = 12 * tileSize;
canvas.width = boardSize;
canvas.height = boardSize;
const black = '#D18B47';
const white = '#FFCE9E';
const highlightColour = '#2D5675';
var board = boardInit;
drawBoard();
drawPiece();
var hasSelected = false;
canvas.addEventListener('mousedown', function(e) { onClicked(e) });





//================================================================
function drawBoard() {
    var isBlack = true;
    for (let j = 4; j > 0; j--) {
        for (let i = 0; i < 16; i++) {
            if (isBlack) {
                colour = black;
            } else {
                colour = white;
            }
            drawCircle(boardSize / 2, boardSize / 2, tileSize * (j + 2), i * 360 / 16 + 90, (i + 1) * 360 / 16 + 90, colour);
            isBlack = !isBlack;
        }
        isBlack = !isBlack;
    }
    drawCircle(boardSize / 2, boardSize / 2, 2 * tileSize, 0, 360, "#202022");
}

function drawRect(x1, y1, x2, y2, colour) {
    c.fillStyle = colour;
    c.fillRect(x1, y1, x2, y2);
    return;
}

function drawPiece() {
    var piece;
    var noDraw = false;
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 4; j++) {
            switch (board[i][j]) {
                case 1:
                    { piece = wPawn; break; }
                case 2:
                    { piece = wKnight; break; }
                case 3:
                    { piece = wBishop; break; }
                case 4:
                    { piece = wRook; break; }
                case 5:
                    { piece = wQueen; break; }
                case 6:
                    { piece = wKing; break; }
                case -1:
                    { piece = bPawn; break; }
                case -2:
                    { piece = bKnight; break; }
                case -3:
                    { piece = bBishop; break; }
                case -4:
                    { piece = bRook; break; }
                case -5:
                    { piece = bQueen; break; }
                case -6:
                    { piece = bKing; break; }
                default:
                    { noDraw = true; break; }
            }
            if (!noDraw) {
                c.drawImage(piece, boardCoord2CanvasCoord(i, j)[0] - tileSize / 2, boardCoord2CanvasCoord(i, j)[1] - tileSize / 2, tileSize, tileSize);
            }
            noDraw = false;
        }
    }
}

function drawCircle(x, y, r, sA, eA, colour) {
    c.beginPath();
    c.arc(x, y, r, deg2rad(sA), deg2rad(eA));
    c.fillStyle = colour;
    c.lineTo(x, y);
    c.fill();
}

function deg2rad(deg) {
    return deg / 180 * Math.PI;
}

function boardCoord2CanvasCoord(radial, ring) {
    var theta = 270 - (360 / 32 + radial * 360 / 16); //real polar coords
    var radius = tileSize * (2.5 + ring);
    var x = Math.cos(deg2rad(theta)) * radius;
    var y = Math.sin(deg2rad(theta)) * radius;
    return [x + boardSize / 2, -y + boardSize / 2];
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
    if (mX < 0 | mX > 8 * tileSize) { return; }
    if (mY < 0 | mY > 8 * tileSize) { return; }
    if (isPromoting) {
        if (wPromoting) {
            promote(1);
        } else {
            promote(-1);
        }
        return;
    }
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
        enumerateValidMoves();
        highlightValidMoves();
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
    if (hasSelected) { highlight(); }
    drawPiece();
    if (isPromoting) {
        if (wPromoting) {
            promote(1);
        } else {
            promote(-1);
        }
    }
    return;
}
//================================================================
function promote(side) {
    isPromoting = true;
    drawBoard();
    drawPiece();
    if (side > 0) {
        wPromoting = true;
        c.globalAlpha = 0.5;
        drawRect(0, 0, 8 * tileSize, 8 * tileSize, '#000000')
        c.globalAlpha = 0.7;
        c.drawImage(wQueen, 1 * tileSize, 1 * tileSize, 3 * tileSize, 3 * tileSize);
        c.drawImage(wRook, 4 * tileSize, 1 * tileSize, 3 * tileSize, 3 * tileSize);
        c.drawImage(wBishop, 1 * tileSize, 4 * tileSize, 3 * tileSize, 3 * tileSize);
        c.drawImage(wKnight, 4 * tileSize, 4 * tileSize, 3 * tileSize, 3 * tileSize);
        c.globalAlpha = 1.0;
    } else {
        wPromoting = false;
        c.globalAlpha = 0.5;
        drawRect(0, 0, 8 * tileSize, 8 * tileSize, '#000000')
        c.globalAlpha = 0.75;
        c.drawImage(bQueen, 1 * tileSize, 1 * tileSize, 3 * tileSize, 3 * tileSize);
        c.drawImage(bRook, 4 * tileSize, 1 * tileSize, 3 * tileSize, 3 * tileSize);
        c.drawImage(bBishop, 1 * tileSize, 4 * tileSize, 3 * tileSize, 3 * tileSize);
        c.drawImage(bKnight, 4 * tileSize, 4 * tileSize, 3 * tileSize, 3 * tileSize);
        c.globalAlpha = 1.0;
    } { //parse mouse
        console.log("Parsing");
        if (mX >= 1.5 * tileSize && mX <= 3.5 * tileSize && mY >= 1.5 * tileSize && mY <= 3.5 * tileSize) {
            isPromoting = false;
            board[bY][bX] = side * 5;
            console.log("Promoted to queen");
            drawBoard();
            drawPiece();
            return;
        }
        if (mX >= 4.5 * tileSize && mX <= 6.5 * tileSize && mY >= 1.5 * tileSize && mY <= 3.5 * tileSize) {
            isPromoting = false;
            board[bY][bX] = side * 4;
            console.log("Promoted to rook");
            drawBoard();
            drawPiece();
            return;
        }
        if (mX >= 1.5 * tileSize && mX <= 3.5 * tileSize && mY >= 4.5 * tileSize && mY <= 6.5 * tileSize) {
            isPromoting = false;
            board[bY][bX] = side * 3;
            console.log("Promoted to bishop");
            drawBoard();
            drawPiece();
            return;
        }
        if (mX >= 4.5 * tileSize && mX <= 6.5 * tileSize && mY >= 4.5 * tileSize && mY <= 6.5 * tileSize) {
            isPromoting = false;
            board[bY][bX] = side * 2;
            console.log("Promoted to knight");
            drawBoard();
            drawPiece();
            return;
        }
    }
}

function logicCheck() {
    if (sPiece * dPiece > 0) {
        logicError = "Friendly fire";
        return false;
    }
    if (Math.abs(sPiece) != 1) {
        enpassantSquare = [8, 8];
        enpassantVictim = [8, 8];
    }
    switch (Math.abs(sPiece)) {
        case 1:
            { //pawn
                logicError = "Invalid pawn";
                if (sPiece > 0) {
                    if (bY >= sY) { return false; }
                } else {
                    if (bY <= sY) { return false; }
                }
                if (bX == sX) { //nocap
                    if (dPiece != 0) { return false; }
                    if ((dX) ** 2 + (dY) ** 2 > 4) { return false; }
                    if (Math.abs(dY) == 2) {
                        if (sPiece > 0 && sY != 6) {
                            return false;
                        }
                        if (sPiece < 0 && sY != 1) {
                            return false;
                        }
                        for (let i = Math.min(bY, sY) + 1; i < Math.max(bY, sY); i++) {
                            if (board[i][bX] != 0) {
                                return false;
                            }
                        }
                        //en passant
                        enpassantSquare = [sX, (bY + sY) / 2];
                        enpassantVictim = [bX, bY];
                    } else {
                        enpassantSquare = [8, 8];
                        enpassantVictim = [8, 8];
                    }
                } else { //cap
                    if ((dX) ** 2 + (dY) ** 2 > 2) { return false; }
                    compiledB = [bX, bY];
                    if (enpassantSquare[0] == bX && enpassantSquare[1] == bY) { //en passant
                        board[enpassantVictim[1]][enpassantVictim[0]] = 0;
                    } else { // no en passant
                        if (dPiece == 0) { return false; }
                    }
                    enpassantSquare = [8, 8];
                    enpassantVictim = [8, 8];
                }
                if (bY == 0 | bY == 7) {
                    if (sPiece > 0) {
                        promote(1);
                    } else {
                        promote(-1);
                    }
                }
                return true;
            }
        case 2:
            { //knight
                logicError = "Invalid knight";
                return ((dX) ** 2 + (dY) ** 2 == 5);
            }
        case 3:
            { //bishop
                logicError = "Invalid bishop";
                if (Math.abs(dX) == Math.abs(dY)) {
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
        case 4:
            { //rook
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
                    //disable castling
                    if (sX == 0 && sY == 0) {
                        bCastleQueen = false;
                    }
                    if (sX == 7 && sY == 0) {
                        bCastleKing = false;
                    }
                    if (sX == 0 && sY == 7) {
                        wCastleQueen = false;
                    }
                    if (sX == 7 && sY == 7) {
                        wCastleKing = false;
                    }
                    return true;
                }
                return false;
            }
        case 5:
            { //queen
                logicError = "Invalid queen"; { //rook logic
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
                } { //bishop logic
                    if (Math.abs(dX) == Math.abs(dY)) {
                        if (dX == dY) { //down-right
                            for (let i = Math.min(bY, sY) + 1; i < Math.max(bY, sY); i++) {
                                for (let j = Math.min(bX, sX) + 1; j < Math.max(bX, sX); j++) {
                                    if (board[i][j] != 0) {
                                        return false;
                                    }
                                }
                            }
                        } else { //up-right
                            for (let i = Math.min(bY, sY) + 1; i < Math.max(bY, sY); i++) {
                                for (let j = Math.max(bX, sX) - 1; j > Math.min(bX, sX); j--) {
                                    if (board[i][j] != 0) {
                                        return false;
                                    }
                                }
                            }
                        }
                        return true;
                    }
                }
                return false;
            }
        case 6:
            { //king
                logicError = "Invalid king";
                if ((dX) ** 2 + (dY) ** 2 <= 2) {
                    if (sPiece > 0) { //disable castling
                        wCastleKing = false, wCastleQueen = false;
                    } else {
                        bCastleKing = false, bCastleQueen = false;
                    }
                    return true;
                } else {
                    if (!(bY == sY && Math.abs(dX) == 2)) {
                        return false;
                    } else { //castling
                        var isKingSide = bX > sX;
                        if (sPiece > 0) { //white
                            if (!wCastleKing && !wCastleQueen) {
                                return false;
                            }
                            if (isKingSide && wCastleKing) {
                                for (let i = Math.min(7, sX) + 1; i < Math.max(7, sX); i++) {
                                    if (board[bY][i] != 0) {
                                        return false;
                                    }
                                }
                                wCastleKing = false, wCastleQueen = false;
                                board[7][7] = 0;
                                board[7][5] = 4;
                                return true;
                            }
                            if (!isKingSide && wCastleQueen) {
                                for (let i = Math.min(0, sX) + 1; i < Math.max(0, sX); i++) {
                                    if (board[bY][i] != 0) {
                                        return false;
                                    }
                                }
                                wCastleKing = false, wCastleQueen = false;
                                board[7][0] = 0;
                                board[7][3] = 4;
                                return true;
                            }
                            return false;
                        } else { //black
                            if (!bCastleKing && !bCastleQueen) {
                                return false;
                            }
                            if (isKingSide && bCastleKing) {
                                for (let i = Math.min(7, sX) + 1; i < Math.max(7, sX); i++) {
                                    if (board[bY][i] != 0) {
                                        return false;
                                    }
                                }
                                bCastleKing = false, bCastleQueen = false;
                                board[0][7] = 0;
                                board[0][5] = -4;
                                return true;
                            }
                            if (!isKingSide && bCastleQueen) {
                                for (let i = Math.min(0, sX) + 1; i < Math.max(0, sX); i++) {
                                    if (board[bY][i] != 0) {
                                        return false;
                                    }
                                }
                                bCastleKing = false, bCastleQueen = false;
                                board[0][0] = 0;
                                board[0][3] = -4;
                                return true;
                            }
                            return false;
                        }
                    }
                }
            }
        default:
            {
                logicError = "NULL";
                return false;
            }
    }
}
//================================================================
function enumerateValidMoves() {
    validX = [], validY = [];
}

function highlightValidMoves() {
    console.log(validX);
    console.log(validY);
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