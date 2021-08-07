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
        drawSelectedIndicator(x, y, index);
        //
        // console.log('Drag start', this.moveEvent);
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
        // console.log('Drag end', this.moveEvent);
        this.move();
        killIndicator();
        redrawChess();
    },
    move: function(e = this.moveEvent) {
        // logic check
        if (!this.legalityCheck()) {
            //! Move failed
            return false;
        }
        //! Move succeeded
        isWhiteTurn = !isWhiteTurn;
        board[e.end.index] = e.start.ref;
        board[e.start.index] = 0;
    },

    legalityCheck: function(e = this.moveEvent) {
        //
        if (e.start.index == e.end.index) { return false; }
        if (Math.sign(e.start.ref) == Math.sign(e.end.ref)) { return false; }
        //
        const deltaIndex = e.end.index - e.start.index;
        // console.log(deltaIndex);
        switch (Math.abs(e.start.ref)) {
            case 1: //! Pawn
                return this.checker.pawn(e, deltaIndex);
                //
            case 2: //! Knight
                return this.checker.knight(deltaIndex);
                //
            case 3: //! Bishop
                return this.checker.bishop(e);
                //
            case 4: //! Rook
                return this.checker.rook(e);
                //
            case 5: //! Queen
                return this.checker.queen(e);
                //
            case 6: //! King
                return this.checker.king(deltaIndex);
                //
            default:
                console.log(`wtf is this piece: ${e.start.ref}`);
                return false;
        }
    },
    checker: { // TODO: Check check
        //!
        pawn: function(e, deltaIndex) { //TODO: promotion
            const colour = e.start.ref;
            switch (deltaIndex * colour) {
                case -16:
                    // f(x) 2.5x + 3.5
                    //
                    // f(1) = 6
                    // f(-1) = 1
                    //
                    // It's just a more optimised way of doing the test
                    return (e.start.y == (2.5 * colour + 3.5) && board[e.start.index - 8 * colour] == 0);
                case -8:
                    return (board[e.end.index] == 0);
                case -7:
                case -9:
                    return !(Math.sign(board[e.end.index]) == colour);
                default:
                    return false;
            }
        },
        //!
        knight: function(deltaIndex) {
            let ad = Math.abs(deltaIndex);
            return (ad == 6 | ad == 10 | ad == 15 | ad == 17);
        },
        //!
        bishop: function(e) {
            if (Math.abs(e.start.x - e.end.x) != Math.abs(e.start.y - e.end.y)) { return false; }
            let valid = true;
            const setX = [e.start.x, e.end.x];
            const setY = [e.start.y, e.end.y];
            let x = Math.min(...setX) + 1;
            for (let y = Math.min(...setY) + 1; y < Math.max(...setY); y++) {
                // console.log(x, y);
                if (board[xyToIndex(x, y)] != 0) {
                    valid = false;
                    break;
                }
                x++;
            }
            return valid;
        },
        //!
        rook: function(e) {
            if (e.start.x != e.end.x && e.start.y != e.end.y) { return false; }
            let valid = true;
            if (e.start.x == e.end.x) { // same X
                const set = [e.start.y, e.end.y];
                for (let y = Math.min(...set) + 1; y < Math.max(...set); y++) {
                    if (board[xyToIndex(e.start.x, y)] != 0) {
                        valid = false;
                        break;
                    }
                }
            } else { // same Y
                const set = [e.start.x, e.end.x];
                for (let x = Math.min(...set) + 1; x < Math.max(...set); x++) {
                    if (board[xyToIndex(x, e.start.y)] != 0) {
                        valid = false;
                        break;
                    }
                }
            }
            return valid;
        },
        //!
        queen: function(e) {
            return this.bishop(e) | this.rook(e);
        },
        //!
        king: function(deltaIndex) {
            let ad = Math.abs(deltaIndex);
            return (ad == 1 | ad == 7 | ad == 8 | ad == 9);
        }
    }
}