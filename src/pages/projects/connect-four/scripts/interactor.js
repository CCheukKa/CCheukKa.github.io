function click(e) {
    if (gameEnd) {
        return;
    }
    dropPiece(new PieceEvent(Math.floor(e.offsetX / tileSize), Math.floor(e.offsetY / tileSize), whoseTurn));
    mouseMove(e);
}