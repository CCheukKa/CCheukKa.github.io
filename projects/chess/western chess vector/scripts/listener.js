window.addEventListener('load', redrawChess(), getBoardColours());
s.addEventListener('mousedown', e => startDrag(e));
s.addEventListener('mousemove', e => drag(e));
s.addEventListener('mouseup', e => endDrag(e));