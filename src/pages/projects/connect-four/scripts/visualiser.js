function mouseMove(e) {
    let canDrop = false;
    if (!gameEnd) {
        let pieceEvent = new PieceEvent(Math.floor(e.offsetX / tileSize), Math.floor(e.offsetY / tileSize), whoseTurn);
        killByClassName('ghost');
        for (let y = 0; y < 6; y++) {
            if (board[y][pieceEvent.x] == 0) {
                drawGhost(pieceEvent);
                canDrop = true;
                break;
            }
        }
    }
    s.style.cursor = canDrop ? 'pointer' : 'not-allowed';
}

function mouseLeave(e) {
    killByClassName('ghost');
}