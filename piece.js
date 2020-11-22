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
    getDiagonalMoves(board){
        let moves = []
        let move = new Move(this.x,this,y)
        let i = this.y
        let j = this.x
        //bottomleft
        if (this.y > 0 && this.x > 0){
            for (i,j; i > 0 && j > 0; i--,j--){
                move.toX = j
                move.toY = i
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        }
        //bottomright
        i = this.y
        j = this.x
        if (this.y < 7 && this.x > 0){
            for(i,j; i > 0 && j < 8; i--,j++){
                move.toX = j
                move.toY = i
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        }
        i = this.y
        j = this.x
        //topright
        if (this.y < 7 && this.x < 7){
            for(i,j; i < 8 && j < 8; i++,j++){
                move.toX = j
                move.toY = i
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        }
        i = this.y
        j = this.x
        //topleft
        if (this.y > 0 && this.x < 7){
            for(i,j; i < 8 && j > 0; i++,j--){
                move.toX = j
                move.toY = i
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        }
    }
}

class King extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    getLegalMoves(board) {
        let moves = []
        let kingMove = new Move(this.x, this,y)
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
        //todo, king may not be in check + castling squares may not be attacked! (rook may be attacked np)
        if (castleKing) {
            if (board.empty(this.x + 1, this.y) && board.empty(this.x + 2,this.y)) {
                kingMove.toX = this.x + 2
                kingMove.toY = this.y
                moves.push(kingMove)
            }
        }
        if (castleQueen){
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
                kingMove.toX = j
                kingMove.toY = i
                if (board.isLegalMove(kingMove)){
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