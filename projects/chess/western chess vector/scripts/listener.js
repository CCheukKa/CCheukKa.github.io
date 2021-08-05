window.addEventListener('load', redrawChess());
s.addEventListener('click', e => click(Math.floor(e.offsetX / tileSize), Math.floor(e.offsetY / tileSize)));
// s.addEventListener('mousemove', e => mouseMove(e.offsetX, e.offsetY));
//