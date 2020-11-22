class Piece {
    type = INVALID;
    color = INVALID;
    
    constructor (type, color, x, y) {
        this.type = type;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    x = INVALID;
    y = INVALID;
}

class King extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    getLegalMoves(board) {
        let moves = []
        let kingMove = new Move 
        kingMove.fromX = this.x
        kingMove.fromY = this.y
        
        let castleKing
        let castleQueen
        if (this.type == WHITE) {
            castleKing = board.whiteCastleKing
            castleQueen = board.whiteCastleQueen
        }
        else {
            castleKing = board.blackCastleKing
            castleQueen = board.blackCastleQueen
        }
        //castling
        if (castleKing || castleQueen) {
            //todo, king may not be in check + castling squares may not be attacked! (rook may be attacked np)
            if (board.empty(this.x + 1, this.y) && board.empty(this.x + 2,this.y)) {
                kingMove.toX = this.x + 2
                kingMove.toY = this.y
                moves.push(kingMove)
            }
            if (board.empty(this.x - 1, this.y) && board.empty(this.x - 2,this.y) && board.empty(this.x - 3,this.y)) {
                kingMove.toX = this.x + 3
                kingMove.toY = this.y
                moves.push(kingMove)
            }
        }
        let i = this.y + 1
        let j = this.x - 1
        let iLimit = i - 3;
        let jLimit = j + 3;
        i = i > 7 ? 7 : i
        j = j < 0 ? 0 : j
        jLimit = jLimit > 8 ? 8 : jLimit
        iLimit = jLimit < -1 ? -1 : jLimit
        for(i; i > iLimit; i--){
            for (j; j < jLimit; j++){
                if (board.empty(j,i)){
                    kingMove.toX = j
                    kingMove.toY = i
                    moves.push(kingMove)
                }
                //todo cant capture if piece is defended (!empty so .type works)
                else if (!(board[j][i].type == this.type)){
                    kingMove.toX = j
                    kingMove.toY = i
                    moves.push(kingMove)
                }

            }
        }
        return moves
    }
    
}


class Queen extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }

    getLegalMoves(board) {

    }
}

class Rook extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    
    getLegalMoves(board) {

    }
}

class Bishop extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    
    getLegalMoves(board) {

    }
}

class Knight extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    
    getLegalMoves(board) {

    }
}

class Pawn extends Piece {
    enPassant = INVALID;
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    
    getLegalMoves(board) {

    }
}