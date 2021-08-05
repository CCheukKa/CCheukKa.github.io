function redrawChess() {
    killPieces();
    drawChess();
    refresh(s);
    refresh(i);
}

function drawSelectedIndicator() {
    const piece = moveManager.moveEvent.start;
    killIndicator();
    drawRect(
        i,
        (piece.x + 0.05) * tileSize, (piece.y + 0.05) * tileSize,
        tileSize * 0.9, tileSize * 0.9,
        '',
        20, 20, true, { class: 'indicator' }
    );
    refresh(i);
}

function killIndicator() {
    document.querySelectorAll('.indicator').forEach(e => e.remove());
}