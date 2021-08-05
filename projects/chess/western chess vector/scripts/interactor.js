{ // local variables
    var selectedElement = null;
}

function startDrag(e) {
    if (e.target.classList.contains(draggableClass())) {
        selectedElement = e.target;
        const x = Math.floor(e.offsetX / tileSize);
        const y = Math.floor(e.offsetY / tileSize);
        const index = y * 8 + x;
        moveManager.select(x, y, index);
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
    const x = Math.floor(e.offsetX / tileSize);
    const y = Math.floor(e.offsetY / tileSize);
    const index = y * 8 + x;
    moveManager.deselect(x, y, index);
}