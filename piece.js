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
                let move = new Move(this.x,this.y, j, i)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
            }
        }
        //bottomright
        if (this.y < 7 && this.x > 0){
            for(let i = this.y, j = this.x; i > 0 && j < 8; i--,j++){
                let move = new Move(this.x,this.y, j, i)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
            }
        }
        //topright
        if (this.y < 7 && this.x < 7){
            for(let i = this.y, j = this.x; i < 8 && j < 8; i++,j++){
                let move = new Move(this.x,this.y, j, i)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
            }
        }
        //topleft
        if (this.y > 0 && this.x < 7){
            for(let i = this.y, j = this.x; i < 8 && j > 0; i++,j--){
                let move = new Move(this.x,this.y, j, i)
                if (board.isLegalMove_specify(move)){
                    moves.push(move)
                }
            }
        }
    }
    getStraightMoves(board){
        let moves = []
        //downwards
        if (this.y > 0){
            for (let i = this.y - 1; i > 0 ; i--){
                let move = new Move(this.x,this.y, this.x, i)
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
            for(let i = this.x - 1; i > 0; i--){
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
                let kingMove = new Move(this.x, this.y, this.x + 2, this.y)
                if (board.isLegalMove_specify(kingMove)){
                    moves.push(kingMove)
                }
            }
        }
        if (castleQueen){
            if (board.empty(this.x - 1, this.y) && board.empty(this.x - 2,this.y) && board.empty(this.x - 3,this.y)) {
                let kingMove = new Move(this.x, this.y, this.x + 3, this.y)
                if (board.isLegalMove_specify(kingMove)){
                    moves.push(kingMove)
                }
            }
        }
        let y_pos = this.y + 1
        let x_pos = this.x - 1
        let iLimit = this.y - 1;
        let jLimit = this.x + 1;
        y_pos = y_pos > 7 ? 7 : y_pos
        x_pos = x_pos < 0 ? 0 : x_pos
        jLimit = jLimit > 8 ? 8 : jLimit
        iLimit = iLimit < -1 ? -1 : iLimit
        console.log("y_pos: " + y_pos + " x_pos " + x_pos + " jlimit: " + jLimit + " iLimit: " + iLimit)
        for(let i = y_pos; i > iLimit; i--){
            for (let j = x_pos; j < jLimit; j++){
                let kingMove = new Move(this.x, this.y, j, i)
                //console.log("kingMove.fromX: " + kingMove.fromX + " kingMove.fromY: " + kingMove.fromY + " kingMove.toX: " + kingMove.toX + " kingMove.toY: " + kingMove.toY)
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
    enPassant = INVALID;
    constructor (type, color, x, y) {
        super(type, color, x, y);
    }
    
    getLegalMoves(board) {
        let moves = []
        let pawnToY
        let pawnJumpY
        let moveJump = -1;
        //TODO en passant
        if (this.color == BLACK){
            if (this.y > 0){
                pawnToY = this.y - 1
            }
            //first move of black pawn
            if(this.y == 6){
                pawnJumpY = this.y - 2
                moveJump = new Move (this.x,this.y,this.x,pawnJumpY) 
            }
            
        }
        else if (this.color == WHITE){
            if (this.y < 7){
                pawnToY = this.y + 1
            }
            //first move of white pawn
            if(this.y == 1){
                pawnJumpY = this.y + 2
                moveJump = new Move (this.x,this.y,this.x,pawnJumpY) 
            }
        }
        let move = new Move (this.x, this.y, this.x, pawnToY)
        if (board.isLegalMove_specify(move)){
            moves.push(move);
            if (!(moveJump === -1)){
                if (board.isLegalMove_specify(moveJump)){
                    moves.push(moveJump)
                }
            }
        }
        return moves
    }
}