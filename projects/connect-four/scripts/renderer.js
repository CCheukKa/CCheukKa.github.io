function redrawBoard() {
    killPieces();
    drawPieces();
    refreshSVG(s);
    refreshSVG(i);
}