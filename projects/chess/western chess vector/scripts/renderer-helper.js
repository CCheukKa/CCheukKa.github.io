const boardColours = {
    light: '',
    dark: ''
}

function refreshSVG(board) {
    if (board) {
        board.innerHTML = board.innerHTML;
    } else {
        document.querySelectorAll('svg').forEach(svg => {
            svg.innerHTML = svg.innerHTML;
        });
    }
}

function drawPiece(board = s, x = -1, y = -1, path = '', isWhite = (path.split('/').reverse()[1] == 'white')) {
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
    board.appendChild(t);
    return t;
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
            const path = piecesMixedArray[board[y * 8 + x] + 6];
            const isWhite = (board[y * 8 + x] > 0);
            drawPiece(s, x, y, path, isWhite);
        }
    }
}

function drawRect(board = s, x, y, width, height, style = '', rx = 0, ry = rx, back = false, other = {}) {
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
        board.insertBefore(t, board.firstChild);
    } else {
        board.appendChild(t);
    }
}

function drawArrow(board = s, x1 = 0, y1 = 0, x2 = 0, y2 = 0) { //! Everything about this is jank, kill it with fire ASAP
    const t = document.createElement('line');
    t.setAttribute('x1', (x1 + 0.5) * tileSize);
    t.setAttribute('y1', (y1 + 0.5) * tileSize);
    t.setAttribute('x2', (x2 + 0.5) * tileSize);
    t.setAttribute('y2', (y2 + 0.5) * tileSize);
    t.classList.add('arrow');
    //
    board.appendChild(t);
}

function drawCircle(board = s, x = 0, y = 0, radius = 0, other = {}) {
    const t = document.createElement('circle');
    t.setAttribute('cx', x);
    t.setAttribute('cy', y);
    t.setAttribute('r', radius);
    //
    for (const key in other) {
        t.setAttribute(key, other[key]);
    }
    //
    board.appendChild(t);
}

function getBoardColours() {
    const img = new Image();
    img.src = window.getComputedStyle(i, false).backgroundImage.split(`"`)[1];
    const tmpCanvas = document.createElement('canvas');
    const c = tmpCanvas.getContext('2d');
    c.width = 8;
    c.height = 8;
    img.onload = function() {
        c.drawImage(img, 0, 0, 8, 8);
        const light = c.getImageData(0, 0, 1, 1).data;
        const dark = c.getImageData(0, 1, 1, 1).data;
        boardColours.light = rgbaToHex(light);
        boardColours.dark = rgbaToHex(dark);
        console.log(boardColours);
        tmpCanvas.remove();
    }
}

function rgbaToHex(rgba) {
    if (rgba[3] == undefined) {
        return `#${((rgba[0] << 16) | (rgba[1] << 8) | rgba[2]).toString(16)}`;
    } else {
        return `#${((rgba[0] << 16) | (rgba[1] << 8) | rgba[2]).toString(16)}${rgba[3].toString(16)}`;
    }
}