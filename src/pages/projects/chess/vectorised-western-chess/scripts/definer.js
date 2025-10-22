const s = document.getElementById('board');
const i = document.getElementById('indicator-board');
const gameContainer = document.getElementById('game-container');
const pieces = {
    white: {
        pawn: './assets/pieces/white/pawn.svg',
        knight: './assets/pieces/white/knight.svg',
        bishop: './assets/pieces/white/bishop.svg',
        rook: './assets/pieces/white/rook.svg',
        queen: './assets/pieces/white/queen.svg',
        king: './assets/pieces/white/king.svg',
    },
    black: {
        pawn: './assets/pieces/black/pawn.svg',
        knight: './assets/pieces/black/knight.svg',
        bishop: './assets/pieces/black/bishop.svg',
        rook: './assets/pieces/black/rook.svg',
        queen: './assets/pieces/black/queen.svg',
        king: './assets/pieces/black/king.svg',
    }
};
const piecesArray = [
    [
        '',
        './assets/pieces/white/pawn.svg',
        './assets/pieces/white/knight.svg',
        './assets/pieces/white/bishop.svg',
        './assets/pieces/white/rook.svg',
        './assets/pieces/white/queen.svg',
        './assets/pieces/white/king.svg',
    ],
    [
        '',
        './assets/pieces/black/pawn.svg',
        './assets/pieces/black/knight.svg',
        './assets/pieces/black/bishop.svg',
        './assets/pieces/black/rook.svg',
        './assets/pieces/black/queen.svg',
        './assets/pieces/black/king.svg',
    ]
];
const piecesMixedArray = [
    './assets/pieces/black/king.svg',
    './assets/pieces/black/queen.svg',
    './assets/pieces/black/rook.svg',
    './assets/pieces/black/bishop.svg',
    './assets/pieces/black/knight.svg',
    './assets/pieces/black/pawn.svg',
    '',
    './assets/pieces/white/pawn.svg',
    './assets/pieces/white/knight.svg',
    './assets/pieces/white/bishop.svg',
    './assets/pieces/white/rook.svg',
    './assets/pieces/white/queen.svg',
    './assets/pieces/white/king.svg',
];
/*  //! Reference number
    0: Nothing
    +/-0: en passant ghost pseudo-piece;
    1: Pawn
    2: Knight
    3: Bishop
    4: Rook
    5: Queen
    6: King

    +6 -> Mixed index
*/
//
const tileSize = 60;
const width = tileSize * 8;
const height = tileSize * 8;
s.style.width = width;
s.style.height = height;
i.style.width = width;
i.style.height = height;
gameContainer.style.width = `${width}px`;
gameContainer.style.height = `${height}px`;
const boardInit = [

    -4, -2, -3, -5, -6, -3, -2, -4,

    -1, -1, -1, -1, -1, -1, -1, -1,

    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,

    1, 1, 1, 1, 1, 1, 1, 1,

    4, 2, 3, 5, 6, 3, 2, 4,
]
var board = boardInit;