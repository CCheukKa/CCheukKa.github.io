var whoseTurn = 1;
var gameEnd = false;

function dropPiece(e) {
    let dropped = false;
    for (let y = 5; y >= 0; y--) {
        if (board[y][e.x] == 0) {
            board[y][e.x] = e.colour;
            dropped = true;
            redrawBoard();
            victoryTest(board, e.x, y);
            whoseTurn = -whoseTurn + 3;
            return;
        }
    }
}

function victoryTest(board, x, y) {
    let winVectors = computeWinVectors(board, x, y);

    winVectors.forEach(vector => {
        if (vector.includes(`${whoseTurn}${whoseTurn}${whoseTurn}${whoseTurn}`)) {
            window.alert(`Player ${whoseTurn} won!`);
            gameEnd = true;
            return true;
        }
    })
}

function computeWinVectors(board, x, y) {
    let winVectors = [];

    // horizontal
    var vector = '';
    board[y].forEach(space => {
        vector += space;
    });
    winVectors.push(vector);

    // vertical
    var vector = '';
    for (let i = 0; i < 6; i++) {
        vector += board[i][x];
    }
    winVectors.push(vector);

    // diagonals
    var vector1 = '',
        vector2 = '';
    for (let i = -3; i <= 3; i++) {
        console.log(y + i);
        if (y + i < 0 | y + i > 5) { continue; }
        vector1 += board[y + i][x + i];
        vector2 += board[y + i][x - i];
    }
    winVectors.push(vector1, vector2);

    return winVectors;
}