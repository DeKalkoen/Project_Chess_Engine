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
        console.log("turn: " + this.turn + '\n' + "WhiteCastle(K/Q): " + this.whiteCastleKing + " " + this.whiteCastleQueen)
        console.log("BlackCastle(k/q): " +  this.blackCastleKing + " " + this.blackCastleQueen)
        console.log("halfmoves: " + this.halfmoves + " fullmoves: " + this.fullmoves)
        if (this.validatePieceArrays()){
            console.log("PieceArrays is in Sync with Board")
        }
        else{
            console.log ("BOARD & PIECEARRAYS ARE OUT OF SYNC! SEE ERROR ABOVE ^^^")
        }
       
        for (let i = BOARD_SIZE - 1; i >= 0; i--){   
            for(let j = 0; j < BOARD_SIZE; j++){
                if (this.empty(j,i)){
                    string += (" - ")
                }
                else{
                    let color = this.squares[i][j].color
                    switch(this.squares[i][j].type){
                        case KING:
                            string += (color == WHITE) ? " K " : " k "
                            break;
                        case QUEEN:
                            string += (color == WHITE) ? " Q " : " q "
                            break;
                        case ROOK:
                            string += (color == WHITE) ? " R " : " r "
                            break;
                        case BISHOP:
                            string += (color == WHITE) ? " B " : " b "
                            break;
                        case KNIGHT:
                            string += (color == WHITE) ? " N " : " n "
                            break;
                        case PAWN:
                            string += (color == WHITE) ? " P " : " p "
                            break;
                    }
                }
            }
            console.log(string)
            string = "";
        }
    }
    validatePieceArrays(){
        let noError = true;
        for (let i = 0; i < this.whitePieces.length; i++){
            if (this.empty(this.whitePieces[i].x, this.whitePieces[i].y)){
                console.log("NO MATCH, EMPTY ON BOARD")
                noError = false;
            }
            else if (this.squares[this.whitePieces[i].y][this.whitePieces[i].x] === this.whitePieces[i]){
                continue
            }
            else {
                console.log("NO MATCH, OTHER PIECE ON BOARD")
                noError = false;
            }
        }
        for (let i = 0; i < this.blackPieces.length; i++){
            if (this.empty(this.blackPieces[i].x, this.blackPieces[i].y)){
                console.log("NO MATCH, EMPTY ON BOARD")
                noError = false;
            }
            else if (this.squares[this.blackPieces[i].y][this.blackPieces[i].x] === this.blackPieces[i]){
                continue
            }
            else {
                console.log("NO MATCH, OTHER PIECE ON BOARD")
                noError = false;
            }
        }
        return noError
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
    moveWithinBoard(move){
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
        return true
    }
    isLegalPawnMove_setFlags(move, color){
        if (!this.moveWithinBoard(move)){
            return false
        }
        move.isPawnMove = true;
        if (move.fromX == move.toX){
            if (this.empty(move.toX, move.toY)){
                move.isCapture = false;
                return true

            }
        }
        else {
            if (this.empty(move.toX, move.toY)){
                return false
            }
            else if (!(this.squares[move.toY][move.toX].color == color)){
                move.isCapture = true
                return true
                
            }
        }
    }
    isLegalMove_specify(move){
        //todo check if king not in check after move
        if (!this.moveWithinBoard(move)){
            return false
        }
        let fromType = this.squares[move.fromY][move.fromX].type
        
        if (fromType == KING){
            move.isCastle = (move.toY == move.fromY) && ((move.fromX - move.toX) % 2 == 0) ? true : false 
        } 
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
    getPiece(x,y,color){
        let pieces = (color == WHITE) ? this.whitePieces : this.blackPieces
        for (let i = 0; i < pieces.length; i++){
            if (pieces[i].x == x){
                if (pieces[i].y == y){
                    return pieces[i]
                }
            }
        }
        return -1
    }
    deletePieceByIndex(index,color){
        if (color == WHITE){
            this.squares[this.whitePieces[index].y][this.whitePieces[index].x] = null
            this.whitePieces.splice(index,1)
        }
        else {
            this.squares[this.blackPieces[index].y][this.blackPieces[index].x] = null
            this.blackPieces.splice(index,1)
        }
    }

    replacePiece(newPiece, oldColor, oldIndex){
        let oldPiece
        if (oldColor == WHITE){
            oldPiece = this.whitePieces[oldIndex]
            this.whitePieces[oldIndex] = newPiece;
        }
        else {
            oldPiece = this.blackPieces[oldIndex]
            this.blackPieces[oldIndex] = newPiece
        }  
        this.squares[newPiece.y][newPiece.x] = newPiece
        this.squares[oldPiece.y][oldPiece.x] = null
        //console.log(oldPiece)
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