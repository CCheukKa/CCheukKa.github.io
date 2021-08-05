/*  //TODO:
        - Make pieces draggable outside of the board
        - Implement drag move
        - Kill click two point 
        - Dragged piece become ghost
        - Dragging piece layer on top of everything
*/

function makeDraggable(e) {
    var svg = e.target;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);

    var selectedElement = null;

    function startDrag(e) {
        if (e.target.classList.contains('piece')) {
            selectedElement = e.target;
        }
    }

    function drag(e) {
        if (selectedElement) {
            e.preventDefault();
            var dragX = e.offsetX - tileSize / 2;
            var dragY = e.offsetY - tileSize / 2;
            selectedElement.setAttributeNS(null, "x", dragX);
            selectedElement.setAttributeNS(null, "y", dragY);
        }
    }

    function endDrag(e) {
        selectedElement = null;
    }
}