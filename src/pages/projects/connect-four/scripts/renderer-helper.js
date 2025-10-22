const boardColours = {
    light: '#f0d9b5',
    dark: '#b58863'
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

function killPieces() {
    killByClassName('piece');
}

function drawPieces() {
    for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 7; x++) {
            let piece = board[y][x];
            if (piece) {
                drawCircle(s, (x + 0.5) * tileSize, (y + 0.5) * tileSize, tileSize * 0.4, { class: `${piece == 1 ? 'piece1' : 'piece2'} piece` });
            }
        }
    }
}

function drawGhost(e) {
    drawCircle(i, (e.x + 0.5) * tileSize, 0.5 * tileSize, tileSize * 0.4, { class: `${e.colour == 1 ? 'piece1' : 'piece2'} piece ghost` });
    refreshSVG(i);
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