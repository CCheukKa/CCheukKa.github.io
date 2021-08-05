function redrawChess() {
    killPieces();
    drawChess();
    refresh();
}

function drawSelectedIndicator() {
    killIndicator();
    drawRect(
        (selectedPiece.x + 0.05) * tileSize, (selectedPiece.y + 0.05) * tileSize,
        tileSize * 0.9, tileSize * 0.9,
        'fill: green; opacity: 0.5; stroke: blue; stroke-width: 5',
        20, 20, true, { class: 'indicator' }
    );
    refresh();
}

function killIndicator() {
    document.querySelectorAll('.indicator').forEach(e => e.remove());
}