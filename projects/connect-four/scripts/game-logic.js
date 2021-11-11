var whoseTurn = 1;
var gameEnd = false;

function dropPiece(e) {
    let dropped = false;
    for (let y = 5; y >= 0; y--) {
        if (board[y][e.x] == 0) {
            board[y][e.x] = e.colour;
            dropped = true;
            redrawBoard();
            victoryTest(board);
            whoseTurn *= -1;
            return;
        }
    }
}

function victoryTest(board) {
    let winVectors = computeWinVectors(board);

    winVectors.forEach(vector => {
        if (vector.includes(`${whoseTurn}${whoseTurn}${whoseTurn}${whoseTurn}`)) {
            window.alert(`Player ${-0.5 * whoseTurn + 1.5} won!`);
            gameEnd = true;
            return true;
        }
    })
}

function computeWinVectors(board) {
    let winVectors = [];

    //horizontal
    board.forEach(row => {
        let vector = '';
        row.forEach(space => {
            vector += space;
        });
        winVectors.push(vector);
    });

    //vertical
    for (let x = 0; x < 7; x++) {
        let vector = '';
        for (let y = 0; y < 6; y++) {
            vector += board[y][x];
        }
        winVectors.push(vector);
    }

    return winVectors;
}