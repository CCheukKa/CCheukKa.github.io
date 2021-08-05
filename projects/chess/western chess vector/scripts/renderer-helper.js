function refresh() {
    s.innerHTML = s.innerHTML;
}

function drawPiece(x = -1, y = -1, path = '', isWhite = (path.split('/').reverse()[1] == 'white')) {
    const piece = path.split('/').pop().split('.').shift();
    if (piece == '') { return; }
    var colour = 'black';
    if (isWhite) { colour = 'white' }
    const t = document.createElement('image');
    t.setAttribute('href', path);
    t.setAttribute('x', x * tileSize);
    t.setAttribute('y', y * tileSize);
    t.setAttribute('width', tileSize);
    t.setAttribute('height', tileSize);
    t.setAttribute('class', `piece ${colour} ${piece} ${x}${y}`);
    s.appendChild(t);
}

function killPieces() {
    document.querySelectorAll('.piece').forEach(e => e.remove());
}

function killPiece(x, y) {
    document.querySelectorAll(`.${x}${y}`).forEach(e => e.remove());
}

function drawChess() {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            drawPiece(x, y, piecesMixedArray[board[y * 8 + x] + 6], (board[y * 8 + x] > 0));
        }
    }
}

function drawRect(x, y, width, height, style = '', rx = 0, ry = rx, back = false, other = {}) {
    const t = document.createElement('rect');
    t.setAttribute('x', x);
    t.setAttribute('y', y);
    t.setAttribute('width', width);
    t.setAttribute('height', height);
    t.setAttribute('style', style);
    t.setAttribute('rx', rx);
    t.setAttribute('ry', ry);
    //
    for (const key in other) {
        t.setAttribute(key, other[key]);
    }
    //
    if (back) {
        s.insertBefore(t, s.firstChild);
    } else {
        s.appendChild(t);
    }
}