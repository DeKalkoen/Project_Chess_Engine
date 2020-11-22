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
        //bottomleft
        if (this.y > 0 && this.x > 0){
            for (let i = this.y, j = this.x; i > 0 && j > 0; i--,j--){
                let move = new Move(this.x,this,y, j, i)
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        }
        //bottomright
        if (this.y < 7 && this.x > 0){
            for(let i = this.y, j = this.x; i > 0 && j < 8; i--,j++){
                let move = new Move(this.x,this,y, j, i)
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        }
        //topright
        if (this.y < 7 && this.x < 7){
            for(let i = this.y, j = this.x; i < 8 && j < 8; i++,j++){
                let move = new Move(this.x,this,y, j, i)
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        }
        //topleft
        if (this.y > 0 && this.x < 7){
            for(let i = this.y, j = this.x; i < 8 && j > 0; i++,j--){
                let move = new Move(this.x,this,y, j, i)
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        }
    }
    getStraightMoves(board){
        let moves = []
        //downwards
        if (this.y > 0){
            for (let i = this.y; i > 0; i--){
                let move = new Move(this.x,this,y, j, i)
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        } 
        //upwards
        if (this.y < 7){
            for (let i = this.y; i < 8; i++){
                let move = new Move(this.x,this,y, j, i)
                if (board.isLegalMove(move)){
                    moves.push(move)
                }
            }
        } 
        //left
        if (this.x > 0 ){
            for(let i = this.x; i > 0; i--){
                let move = new Move(this.x,this,y, j, i)
                if (board.isLegalMove(move)){
                    moves.push(move)
                } 
            }
        }
        //right
        if(this.x < 7){
            for (let i = this.x; i < 8; i++){
                let move = new Move(this.x,this,y, j, i)
                if (board.isLegalMove(move)){
                    moves.push(move)
                } 
            }
        }
        return moves
    }
}

class King extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    getLegalMoves(board) {
        let moves = []
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
                console.log("castling Kingside added to Legal King moves")
                let kingMove = new Move(this.x, this.y, this.x + 2, this.y)
                moves.push(kingMove)
            }
        }
        if (castleQueen){
            if (board.empty(this.x - 1, this.y) && board.empty(this.x - 2,this.y) && board.empty(this.x - 3,this.y)) {
                console.log("castling Queenside added to Legal King moves")
                let kingMove = new Move(this.x, this.y, this.x + 3, this.y)
                moves.push(kingMove)
            }
        }
        let y_pos = this.y + 1
        let x_pos = this.x - 1
        let iLimit = y_pos - 3;
        let jLimit = x_pos + 3;
        y_pos = y_pos > 7 ? 7 : y_pos
        x_pos = x_pos < 0 ? 0 : x_pos
        jLimit = jLimit > 8 ? 8 : jLimit
        iLimit = iLimit < -1 ? -1 : iLimit
        //console.log("y_pos: " + y_pos + " x_pos " + x_pos + " jlimit: " + jLimit + " iLimit: " + iLimit)
        for(let i = y_pos; i > iLimit; i--){
            for (let j = x_pos; j < jLimit; j++){
                let kingMove = new Move(this.x, this.y, j, i)
                //console.log("kingMove.fromX: " + kingMove.fromX + " kingMove.fromY: " + kingMove.fromY + " kingMove.toX: " + kingMove.toX + " kingMove.toY: " + kingMove.toY)
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
        let straightMoves = this.getStraightMoves(board);
        let diagonalMoves = this.getDiagonalMoves(board);
        return straightMoves.concat(diagonalMoves)
    }
}

class Rook extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    
    getLegalMoves(board) {
        return this.getStraightMoves(board);
    }
}

class Bishop extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    
    getLegalMoves(board) {
        return this.getDiagonalMoves(board);
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