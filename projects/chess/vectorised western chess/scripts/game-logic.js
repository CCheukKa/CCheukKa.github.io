var whoseTurn = 1;
// 1 = white
// -1 = black
// 0 = both
var selected = false;
var legalMoveList = [];
const enPassantable = {
    squareIndex: -1,
    victimIndex: -1,
    flag: false
};
//
const squaresChecked = [
    [], //nothing
    [7, 8, 9, 16], //pawn
    [6, 10, 15, 17], //knight
    [9, 18, 27, 36, 45, 54, 63, 7, 14, 21, 28, 35, 42, 49], //bishop
    [1, 2, 3, 4, 5, 6, 7, 8, 16, 24, 32, 40, 48, 56], //rook
    [], //queen
    [1, 7, 8, 9], //king
];
for (let i = 0; i < squaresChecked.length; i++) {
    squaresChecked[i] = squaresChecked[i].concat(squaresChecked[i].map(value => -value));
}
squaresChecked[5] = [].concat(squaresChecked[3], squaresChecked[4]); //queen
//

function xyToIndex(x, y) {
    return y * 8 + x;
}

function draggableClass() {
    switch (whoseTurn) {
        case 1:
            return 'white';
        case -1:
            return 'black';
        default:
            return 'piece';
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
        visualiseLegalMoves(x, y, index);
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
        killByClassName('indicator');
        killByClassName('legal-move');
        redrawChess();
    },
    move: function(e = this.moveEvent) {
        // logic check
        if (!this.legalityCheck()) {
            //! Move failed
            return false;
        }
        //! Move succeeded
        if (Math.abs(e.start.ref) == 1 && Math.abs(e.start.index - e.end.index) == 16) { // can be en passant'd
            enPassantable.squareIndex = e.start.index - 8 * e.start.ref;
            enPassantable.victimIndex = e.end.index;
        }
        if (enPassantable.flag) { // is en passant
            board[enPassantable.victimIndex] = 0;
            enPassantable.flag = false;
        }
        whoseTurn *= -1;
        board[e.end.index] = e.start.ref;
        board[e.start.index] = 0;
        enumerateLegalMoves();
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
                return this.checker.knight(e);
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
                return this.checker.king(e);
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
            if (Math.abs(e.start.x - e.end.x) > 1) { return false; }
            switch (deltaIndex * colour) {
                case -16:
                    // f(x) 2.5x + 3.5
                    //
                    // f(1) = 6
                    // f(-1) = 1
                    //
                    // It's just a more optimised way of doing the test
                    return (
                        e.start.y == (2.5 * colour + 3.5) &&
                        board[e.start.index - 8 * colour] == 0 &&
                        board[e.start.index - 16 * colour] == 0
                    );
                case -8:
                    return (board[e.end.index] == 0);
                case -7:
                case -9:
                    if (e.end.index == enPassantable.squareIndex) { //is en passant
                        enPassantable.flag = true;
                        return true;
                    } else { // is not en passant
                        return (Math.sign(board[e.end.index]) != 0);
                    }
                default:
                    return false;
            }
        },
        //!
        knight: function(e) {
            const dx = Math.abs(e.start.x - e.end.x);
            const dy = Math.abs(e.start.y - e.end.y);
            return ((dx == 1 && dy == 2) | (dx == 2 && dy == 1));
        },
        //!
        bishop: function(e) {
            if (Math.abs(e.start.x - e.end.x) != Math.abs(e.start.y - e.end.y)) { return false; }
            let valid = true;
            let x = e.start.x,
                y = e.start.y;
            let xDirection = Math.sign(e.end.x - e.start.x),
                yDirection = Math.sign(e.end.y - e.start.y);
            for (let i = 1; i < Math.abs(e.start.x - e.end.x); i++) { // only the squares in-between exclusively
                x += xDirection;
                y += yDirection;
                // console.log(x, y);
                if (board[xyToIndex(x, y)] != 0) { // obstacle?
                    valid = false;
                    break;
                }
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
        king: function(e) { // TODO: castling
            const dx = Math.abs(e.start.x - e.end.x);
            const dy = Math.abs(e.start.y - e.end.y);
            return (dx < 2 && dy < 2);
        }
    }
}
enumerateLegalMoves();

function enumerateLegalMoves() { //TODO: change to a more efficient algorithm; only search the necessaries destinations
    legalMoveList = [];

    for (let sI = 0; sI < 64; sI++) {
        if (board[sI] == 0) { continue; } // no piece there?
        if (board[sI] * whoseTurn < 0) { continue; } // not your turn?
        squaresChecked[Math.abs(board[sI])].forEach(dI => {
            const eI = sI + dI;
            if (board[sI] * board[eI] > 0) { return; } // same team?
            const moveEvent = createMoveEvent(sI, eI);
            if (moveManager.legalityCheck(moveEvent)) { legalMoveList.push(moveEvent); }
        });
    }
    return legalMoveList;
}

function createMoveEvent(startIndex, endIndex) {
    return {
        start: { x: startIndex % 8, y: Math.floor(startIndex / 8), index: startIndex, ref: board[startIndex] },
        end: { x: endIndex % 8, y: Math.floor(endIndex / 8), index: endIndex, ref: board[endIndex] },
    };
}