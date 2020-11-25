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
    //debugging
    log(){
        let string = "logging board: \n";
       
        for (let i = BOARD_SIZE - 1; i >= 0; i--){   
            for(let j = 0; j < BOARD_SIZE; j++){
                let string2;
                if (this.empty(j,i)){
                    string = string.concat(" - ")
                }
                else{
                    switch(this.squares[i][j].type){
                        case KING:
                            string2 = (this.squares[i][j].color == WHITE) ? " K " : " k "
                            string = string.concat(string2)
                            
                            break;
                        case QUEEN:
                            string2 = (this.squares[i][j].color == WHITE) ? " Q " : " q "
                            string = string.concat(string2)
                            break;
                        case ROOK:
                            string2 = (this.squares[i][j].color == WHITE) ? " R " : " r "
                            string = string.concat(string2)
                            break;
                        case BISHOP:
                            string2 = (this.squares[i][j].color == WHITE) ? " B " : " b "
                            string = string.concat(string2)
                            break;
                        case KNIGHT:
                            string2 = (this.squares[i][j].color == WHITE) ? " N " : " n "
                            string = string.concat(string2)
                            break;
                        case PAWN:
                            string2 = (this.squares[i][j].color == WHITE) ? " P " : " p "
                            string = string.concat(string2)
                            break;
                    }
                }
            }
            console.log(string)
            string = "";
        }
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
            this.whiteCastleQueen = true
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
        return this.turn % 2;
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
    isLegalMove_specify(move){
        //todo check if king not in check after move
        let coords = [move.fromX, move.fromY, move.toX, move.toY]
        for (let i = 0; i < coords.length; i++){
            if (isNaN(coords[i])){                
                console.log("isLegalMove_specify only takes numbers!")
                return false   
            }
            if (coords[i] > 7 || coords[i] < 0){
                console.log("move is outside of board!")
                return false
            }
        }
        let fromType = this.squares[move.fromY][move.fromX].type
        move.isPawnMove = ( fromType == PAWN) ? true : false
        
        if (fromType == KING){
            //-2 % 2 == -0 == 0 == 2 % 2
            move.isCastle = ((move.fromX - move.toX) % 2 == 0) ? true : false 
        } 
        //todo en passant captures in front
        if (this.empty(move.toX, move.toY)){
            move.isCapture = false
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
        let pieces = (color == WHITE) ? this.whitePieces : this.blackPieces
        for (let i = 0; i < pieces.length; i++){
            if (pieces[i].x == x){
                if (pieces[i].y == y){
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
                this.blackCastleQueen = false
                this.blackCastleKing = false
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