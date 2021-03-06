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
        if (!(board.getWhoseTurn() == this.color)){
            return null
        }
        let moves = []
        //bottomleft
        if (this.y > 0 && this.x > 0){
            let y_pos = this.y
            let x_pos = this.x 
            let noHit = true;
            while (y_pos > 0 && x_pos > 0 && noHit){
                y_pos--
                x_pos--
                if (!board.empty(x_pos, y_pos)){
                    noHit = false;
                }
                let move = new Move(this.x, this.y, x_pos, y_pos)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
                
            } 
        }
        //bottomright
        if (this.y > 0 && this.x < 7){
            let y_pos = this.y
            let x_pos = this.x
            let noHit = true;
            while (y_pos > 0 && x_pos < 7 && noHit){
                y_pos--
                x_pos++
                if (!board.empty(x_pos, y_pos)){
                    noHit = false;
                }
                let move = new Move(this.x, this.y, x_pos, y_pos)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
                
                
            } 
        }
        //topright
        if (this.y < 7 && this.x < 7){
            let y_pos = this.y
            let x_pos = this.x
            let noHit = true;
            while (y_pos < 7 && x_pos < 7 && noHit){
                y_pos++
                x_pos++
                if (!board.empty(x_pos, y_pos)){
                    noHit = false;
                }
                let move = new Move(this.x, this.y, x_pos, y_pos)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
            } 
        }
        //topleft
        if (this.y < 7 && this.x > 0){
            let y_pos = this.y
            let x_pos = this.x
            let noHit = true;
            while (y_pos < 7 && x_pos > 0 && noHit){
                y_pos++
                x_pos--
                if (!board.empty(x_pos, y_pos)){
                    noHit = false;
                }
                let move = new Move(this.x, this.y, x_pos, y_pos)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
                
            } 
        }
        return moves
    }
    getStraightMoves(board){
        if (!(board.getWhoseTurn() == this.color)){
            return null
        }
        let moves = []
        //downwards
        if (this.y > 0){
            for (let i = this.y - 1; i >= 0 ; i--){
                let move = new Move(this.x, this.y, this.x, i)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
                if(!(board.empty(this.x, i))){
                    break
                }
            }
        } 
        //upwards
        if (this.y < 7){
            for (let i = this.y + 1; i < 8; i++){
                let move = new Move(this.x,this.y, this.x, i)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
                if(!(board.empty(this.x, i))){
                    break
                }
            }
        } 
        //left
        if (this.x > 0 ){
            for(let i = this.x - 1; i >= 0; i--){
                let move = new Move(this.x,this.y, i, this.y)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
                if(!board.empty(i, this.y)){
                    break
                }
            }
        }
        //right
        if(this.x < 7){
            for (let i = this.x + 1; i < 8; i++){
                let move = new Move(this.x,this.y, i, this.y)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                } 
                if(!board.empty(i, this.y)){
                    break
                }
            }
        }
        return moves
    }
    moveTo(x,y){
        this.x = x
        this.y = y
    }
}

class King extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    getLegalMoves(board) {
        if (!(board.getWhoseTurn() == this.color)){
            return null
        }
        let moves = []
        let castleKing = (this.color == WHITE) ? board.whiteCastleKing : board.blackCastleKing
        let castleQueen = (this.color == WHITE) ? board.whiteCastleQueen : board.blackCastleQueen
        //castling
        //todo, king may not be in check + castling squares may not be attacked! (rook may be attacked np)
        if (castleKing) {
            if (board.empty(this.x + 1, this.y) && board.empty(this.x + 2,this.y)) {
                let kingMove = new Move(this.x, this.y, this.x + 2, this.y)
                if (board.isLegalMove_specify(kingMove)){
                    moves.push(kingMove)
                }
            }
        }
        if (castleQueen){
            if (board.empty(this.x - 1, this.y) && board.empty(this.x - 2,this.y) && board.empty(this.x - 3,this.y)) {     
                let kingMove = new Move(this.x, this.y, this.x - 2, this.y)
                if (board.isLegalMove_specify(kingMove)){
                    moves.push(kingMove)
                }
            }
        }
        let y_pos = (this.y < 7) ? this.y + 1 : this.y
        let x_pos = (this.x > 0) ? this.x - 1 : this.x
        let y_lim = ((this.y - 2) < -1) ? -1 : this.y - 2
        let x_lim = ((this.x + 2) > 8) ? 8 : this.x + 2 
        for(let i = y_pos; i > y_lim; i--){
            for (let j = x_pos; j < x_lim; j++){
                let kingMove = new Move(this.x, this.y, j, i)
                if (board.isLegalMove_specify(kingMove)){
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
        if (straightMoves && diagonalMoves){
            return straightMoves.concat(diagonalMoves)
        }
        else{
            return []
        }
        
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
        if (!(board.getWhoseTurn() == this.color)){
            return null
        }
        let moves = []
        let y_coords = [-2, -1, 1, 2]
        for (let i = 0; i < y_coords.length; i++){
            let x_coords = (y_coords[i] % 2 == 0) ? [-1,1] : [-2,2]
            for (let j = 0; j < x_coords.length; j++){
                let move = new Move (this.x, this.y, this.x + x_coords[j], this.y + y_coords[i])
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
            }
        }
        return moves   
    }
}

class Pawn extends Piece {
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    getLegalMoves(board) {
        if (!(board.getWhoseTurn() == this.color)){
            return null
        }
        let moves = []
        let pawnToY = (this.color == WHITE) ? 1 : -1
        let startRank = (this.color == WHITE) ? 1 : 6
        //1 forward
        for (let i = -1 ; i < 2; i++){
            let move = new Move(this.x, this.y, this.x + i , this.y + pawnToY)
            if (board.isLegalPawnMove_setFlags(move)){
                moves.push(move)
            }
        }
        //2 forward
        if (board.empty(this.x, this.y + pawnToY) && this.y == startRank){
            let move = new Move(this.x, this.y, this.x, this.y + (pawnToY * 2))
            if (board.isLegalPawnMove_setFlags(move)){
                moves.push(move)
            }
        }
        return moves
    }
}