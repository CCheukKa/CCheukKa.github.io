var isWhiteTurn = true;
var selected = false;


function xyToIndex(x, y) {
    return y * 8 + x;
}

function draggableClass() {
    if (isWhiteTurn) {
        return 'white';
    } else {
        return 'black';
    }
}


const moveManager = {
    moveEvent: {
        start: { x: -1, y: -1, index: -1, ref: 0 },
        end: { x: -1, y: -1, index: -1, ref: 0 },
    },

    select: function(x, y, index = y * 8 + x) {
        selected = true;
        const e = this.moveEvent;
        e.start.x = x;
        e.start.y = y;
        e.start.index = index;
        e.start.ref = board[index];
        //
        console.log('Drag start', this.moveEvent);
    },

    deselect: function(x, y, index = y * 8 + x) {
        if (!selected) { return; }
        //
        selected = false;
        const e = this.moveEvent;
        e.end.x = x;
        e.end.y = y;
        e.end.index = index;
        e.end.ref = board[index];
        //
        console.log('Drag end', this.moveEvent);
        this.move();
        redrawChess();
    },
    move: function() {
        const e = this.moveEvent;
        // logic check
        if (!this.legalityCheck()) {
            //! Move failed
            return false;
        }
        //! Move succeeded
        board[e.end.index] = e.start.ref;
        board[e.start.index] = 0;
    },

    legalityCheck: function() {
        const e = this.moveEvent;
        //
        if (e.start.index == e.end.index) { return false; }
        if (Math.sign(e.start.ref) == Math.sign(e.end.ref)) { return false; }
        //
        return true;
    }
}