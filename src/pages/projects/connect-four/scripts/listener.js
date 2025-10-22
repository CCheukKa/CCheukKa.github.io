window.addEventListener('load', redrawBoard(), getBoardColours());
s.addEventListener('mousemove', e => mouseMove(e));
s.addEventListener('click', e => click(e));
s.addEventListener('mouseleave', e => mouseLeave(e));