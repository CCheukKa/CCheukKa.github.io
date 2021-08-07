function redrawChess() {
    killPieces();
    drawChess();
    refreshSVG(s);
    refreshSVG(i);
}

function drawSelectedIndicator() {
    const piece = moveManager.moveEvent.start;
    killByClassName('indicator');
    drawRect(
        i,
        (piece.x + 0.05) * tileSize, (piece.y + 0.05) * tileSize,
        tileSize * 0.9, tileSize * 0.9,
        '',
        20, 20, true, { class: 'indicator' }
    );
    refreshSVG(i);
}

function drawLegalMoveArrows() {
    legalMoveList.forEach(move => {
        drawArrow(i, move.start.x, move.start.y, move.end.x, move.end.y);
    });
    refreshSVG(i);
}

function visualiseLegalMoves(x, y, index = y * 8 + x) {
    if (legalMoveList.length == 0) { enumerateLegalMoves(); }
    legalMoveList.forEach(move => {
        if (move.start.index == index) {
            if (move.end.ref == 0) { // normal move
                drawCircle(i,
                    (move.end.x + 0.5) * tileSize, (move.end.y + 0.5) * tileSize,
                    tileSize * 0.15, { class: 'legal-move translucent' }
                );
            } else { // capture move
                drawRect(i,
                    move.end.x * tileSize, move.end.y * tileSize,
                    tileSize, tileSize,
                    '',
                    0, 0,
                    false, { class: 'legal-move translucent' }
                );
                //
                var bgColour = boardColours.dark;
                if ((move.end.x - move.end.y) % 2 == 0) {
                    bgColour = boardColours.light;
                }
                //
                drawRect(i,
                    (move.end.x + 0.0) * tileSize, (move.end.y + 0.0) * tileSize,
                    tileSize, tileSize,
                    `fill: ${bgColour}`,
                    20, 20,
                    false, { class: 'legal-move' }
                );
            }
        }
    });
    refreshSVG(i);
}