class Board {
    squares = Array.from(Array(8), () => new Array(8))
    whitePieces = [];
    blackPieces = [];
    turn = INVALID;
    castleRights = "";
    whiteCastleKing;
    whiteCastleQueen;
    blackCastleKing;
    blackCastleQueen;
    enPassant = "";
    halfmoves = 0;
    fullmoves = 0;

    constructor(fen) {
        this.loadFEN(fen);
    }

    loadFEN(fen) {
        var fields = fen.split(/\s+/)
        var positions = fields[0].split('/')
        console.log("positions: " + positions)
        //set turn
        if(fields[1] == 'w'){
            this.turn = WHITE;
        }
        else {
            this.turn = BLACK;
        }
        //use castleRights to construct FEN from board
        this.castleRights = fields[2]
        if (fields[2].includes('k')){
            this.blackCastleKing = true
        }
        if (fields[2].includes('q')){
            this.blackCastleQueen = true
        }
        if (fields[2].includes('K')){
            this.whiteCastleKing = true
        }
        if (fields[2].includes('Q')){
            this.whiteCastleKing = true
        }


        this.enPassant = fields[3]
        this.halfmoves = parseInt(fields[4],10)
        this.fullmoves = parseInt(fields[5],10)
        for (let i = 0; i < BOARD_SIZE; i ++) {
            let board_j = 0;
            for (let j = 0; j < positions[i].length; j++){
                let character = positions[i][j]
                if (!isNaN(parseInt(character), 10)) {
                    board_j += parseInt(character, 10);
                    continue;
                }

                let color = BLACK;
                if (character == character.toUpperCase()) {
                    color = WHITE;
                }
                character = character.toLowerCase();

                let piece = null;
                if (character === 'k') {
                    piece = new King(KING, color, board_j, 7 - i);
                }
                else if (character === 'q') {
                    piece = new Queen(QUEEN, color, board_j, 7 - i);
                }
                else if (character === 'r') {
                    piece = new Rook(ROOK, color, board_j, 7 - i);
                }
                else if (character === 'n') {
                    piece = new Knight(KNIGHT, color, board_j, 7 - i);
                }
                else if (character === 'b') {
                    piece = new Bishop(BISHOP, color, board_j, 7 - i);
                }
                else if (character == 'p') {
                    piece = new Pawn(PAWN, color, board_j, 7 - i);
                }
                //place on board
                this.squares[7 - i][board_j] = piece;

                if (color == WHITE) {
                    this.whitePieces.push(piece);
                }
                else {
                    this.blackPieces.push(piece);
                }

                board_j++;
            }
        }
    }

    loadBoard(board, move) {
        this.turn = 1 - board.turn;
        // TODO: Copy board and execute move;
    }

    at(file, rank) {
        return squares[rank - 1][file]
    }

    getWhoseTurn() {
        return turn % 2;
    }
    convertCoordinates(x,y){
        return String.fromCharCode(x + 97) + String.fromCharCode(y + 49);
    }
    revertCoordinats(char,num){
        return [char.charCodeAt(0) - 97, num.charCodeAt(0) - 49] 
    }

    empty(x,y){
        return (this.squares[y][x] == null)
    }
    isLegalMove(move){
        //todo check if king not in check after move
        //move is in board && is number
        let fromType = this.squares[move.fromY][move.fromX].type
        move.isPawnMove = ( fromType == PAWN) ? true : false
        
        if (fromType == KING){
            //-2 % 2 == -0 == 0 == 2 % 2
            move.isCastle = ((move.fromX - move.toX) % 2 == 0) ? true : false 
        }
        
        let coords = [move.fromX, move.fromY, move.toX, move.toY]
        for (i in coords){
            if (!isNaN(i)){
                console.log("isLegalMoves only takes numbers!")
                return false   
            }
            if (i > 7 || i < 0){
                console.log("move is outside of board!")
                return false
            }
        }
        
         
        //todo en passant captures in front
        if (this.empty(move.toX,move.toY)){
            return true;
        }
        //capture
        if (!(this.squares[move.fromY][move.fromX].color == this.squares[move.toY][move.toX].color)){
            move.isCapture = true;
            return true;
        }
        else {
            move.isCapture = false;
            return false;
        }
    }
    getPieceIndex(x,y,color){
        //slow -> pieces copies array(?)
        let pieces = (color == WHITE) ? whitePieces : blackPieces
        for (let i = 0; i < this.pieces.length; i++){
            if (this.pieces[i].x == x){
                if (this.pieces[i].y == y){
                    return i
                }
            }
        }
        return -1
    }
    updateCastlingRights(move){
        //white rook/king moves (or has moved)
        if (move.fromY == 0){
            if (move.fromX == 0){
                this.whiteCastleQueen = false
            }
            else if (move.fromX == 4){
                this.whiteCastleQueen = false
                this.whiteCastleKing = false
            }
            else if (move.fromX == 7){
                this.whiteCastleKing = false
            }
        }
        //black rook/king moves (or has moved)
        else if (move.fromY == 7){
            if (move.fromX == 0){
                this.blackCastleQueen = false
            }
            else if (move.fromX == 4){
                this.whiteCastleQueen = false
                this.whiteCastleKing = false
            }
            else if (move.fromX == 7){
                this.blackCastleKing = false
            }
        }
    }
    

    getWhiteLegalMoves() {
        
    }
    getBlackLegalMoves(){
    }
        
}