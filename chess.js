class Chess {
    positions = [] // Array of boards
    moves = [] // Array of moves played
    winner = undefined // Winner
    
    constructor(fen) {
        let error = undefined;
        if (!fen)
            //error = this.loadFEN(DEFAULT_FEN);
            error = this.loadFEN(TEST_FEN)
        else
            error = this.loadFEN(fen);

        if (error) {
            console.log(error);
        }
        else {
            console.log("FEN loaded, all variables initialized");
        }
    }

    getCurrentBoard() {
        if (this.positions.length == 0) {
            console.log("No current position");
            return undefined;
        }
        return this.positions[this.positions.length - 1];
    }

    makeMoveOnCurrent(move) {
        let nextBoard = this.getCurrentBoard()
        let currentType = nextBoard.squares[move.fromY][move.fromX].type
        let currentTurn = nextBoard.getWhoseTurn()
        nextBoard.turn = 1 - currentTurn
        nextBoard.halfmoves = (move.isPawnMove) ? 0 : halfmoves + 1
        let pieceIndex = nextBoard.getPieceIndex(move.fromX, move.fromY, currentTurn)

        if (pieceIndex < 0) {
            console.log("Piece with color: " +  currentTurn + " not found in respective pieces array")
        }
        //captured xy first then update the capturing xy
        if(move.isCapture) {
            nextBoard.halfmoves = 0
            let captureIndex = nextBoard.getPieceIndex(move.toX, move.toY, nextBoard.turn)
            if (currentTurn == BLACK) {
                nextBoard.whitePieces.splice(captureIndex, 1)
            }
            else {
                nextBoard.blackPieces.splice(captureIndex, 1)
            }
        }
        
        if (currentTurn == BLACK) {
            nextBoard.fullmoves++
            nextBoard.blackPieces[pieceIndex].moveTo(move.toX, move.toY)
            if (move.isCastle) {
                if (move.toX == 6) {
                    let blackRookIndex = getPieceIndex(7, 7, BLACK)
                    nextBoard.blackPieces[blackRookIndex].x = 5
                }
                else if (move.toX == 2) {
                    let blackRookIndex = getPieceIndex(0, 7, BLACK)
                    nextBoard.blackPieces[blackRookIndex].x = 3
                }
            }
        }
        else {
            nextBoard.whitePieces[pieceIndex].moveTo(move.toX, move.toY)
            if (move.isCastle) {
                if (move.toX == 6){
                    let whiteRookIndex = getPieceIndex(7, 0, WHITE)
                    nextBoard.whitePieces[whiteRookIndex].x = 5
                }
                else if (move.toX == 2){
                    let blackRookIndex = getPieceIndex(0, 0, WHITE)
                    nextBoard.blackPieces[blackRookIndex].x = 3
                }
            }
        }
        if (currentType == KING || currentType == ROOK) {
            nextBoard.updateCastlingRights(move)
        }
        this.positions.push(nextBoard)
        this.moves.push(moves)
    }

    getLegalMoves() {
        let legalMoves= []
        let current = this.getCurrentBoard()
        if (current.turn == WHITE) {
            for (let i = 0 ; i < current.whitePieces.length; i++) {
                legalMoves = legalMoves.concat(current.whitePieces[i].getLegalMoves(current))
            }
        }
        else {
            for (let i = 0 ; i < current.blackPieces.length; i++){
                legalMoves = legalMoves.concat(current.blackPieces[i].getLegalMoves(current))
            }
        }
        return legalMoves
    }

    loadFEN(fen) {
        if(!this.validFEN(fen)) {
            return 0; //TODO return error and error checks
        }
        
        console.log("constructing board using " + fen)
        this.positions.push(new Board(fen))
        return SUCCESS;
    }

    validFEN(fen){
        let fields = fen.split(/\s+/)
        let positions = fields[0].split('/')
        // FEN consists of 6 fields
        if (fields.length !== 6){
            console.log("FEN Must have 6 fields.")
            return false;
        }
        //first field (positions field) must be 8 ranks long.
        if (positions.length !== 8) {
            console.log("Positions field (seperated by '/' must be of length 8.")
            return false;
        }
        //second field (move field) must be w or b
        if (!/^(w|b)$/.test(fields[1])) {
            console.log ("move field must be 'w' or 'b'")
            return false;
        }
        //third field (castling field) must be - or K/Q/k/q or any combination
        if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(fields[2])) {
            console.log("Castling field must be either - or a combination of K Q q k.")
            return false;
        }
        //fourth field (en passant) may be - or any coordinate
        if (!/^(-|[abcdefgh][36])$/.test(fields[3])) {
            console.log("En pessant field must be either - or a coordinate.")
            return false;
        }
        //en passant for the right turn?
        if ((fields[3][1] == '3' && fields[1] == 'w') || (fields[3][1] == '6' && fields[1] == 'b')) {
            console.log("En pessant field does not match the current turn")
            return false;
        }
        //fifth field (halfmove field) must be an integer > 0
        if (isNaN(fields[4]) || 0 > parseInt(fields[5], 10)) {
            console.log("Halfmove number must be an integer that is > 0.")
            return false;
        }
      
        //sixth field (fullmove field) must be an integer > 0
        if (isNaN(fields[5]) || 0 > parseInt(fields[4], 10)) {
            console.log("Move number must be an integer that is > 0.")
            return false;
        }
        let whiteKing = false
        let blackKing = false
        let kings = 0
        //positions are valid
        for (let i = 0; i < positions.length; i++) {
            //sum ranks and no 2 consecutive numbers
            let sumRank = 0
            let prev_num = false
          
            for (let j = 0; j < positions[i].length; j++) {
                if (!isNaN(positions[i][j])) {
                    if (prev_num) {
                        console.log("FEN positions may not have 2 consecutive numbers")
                        return false
                    }
                    sumRank += parseInt(positions[i][j], 10)
                    prev_num = true
                }
                else {
                    if (!/^[prnbqkPRNBQK]$/.test(positions[i][j])) {
                        console.log("FEN pieces must be represented using the letters prnbqk(or uppercase)")
                        return false
                    }
                    if (positions[i][j] == 'k') {
                        blackKing = true;
                        kings++
                    }
                    if (positions[i][j] == 'K') {
                        whiteKing = true;
                        kings++
                    }
                    sumRank += 1
                    prev_num = false
                }
                if (sumRank > 8 || sumRank < 0){
                    console.log("FEN rank sums up to > 8 or < 0")
                    return false
                }
            }
        }
        //must have kings
        if (!(whiteKing && blackKing && (kings == 2))) {
            console.log("FEN must contain exactly one white and one black king")
            return false
        }
        console.log("Valid fen!")
        return true;
    }
    // Clock
}