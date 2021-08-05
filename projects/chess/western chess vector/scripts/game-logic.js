var selected = false;
var selectedPiece = { x: -1, y: -1 };

function click(x, y) {
    const index = y * 8 + x;
    //
    console.log(selected, x, y, index);
    //
    if (selected) {
        const oldIndex = xyToIndex(selectedPiece.x, selectedPiece.y);
        if (index == oldIndex) {
            selected = false;
            killIndicator();
            return;
        }
        board[index] = board[oldIndex];
        board[oldIndex] = 0;
        selected = false;
        killIndicator();
        redrawChess();
        //
        // select(x, y, index);
    } else {
        select(x, y, index);
    }
}

function select(x, y, index = y * 8 + x) {
    if (board[index] == 0) { return };
    selected = true;
    selectedPiece.x = x;
    selectedPiece.y = y;
    drawSelectedIndicator();
}

function xyToIndex(x, y) {
    return y * 8 + x;
}