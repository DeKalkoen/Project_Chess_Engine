class Board {
    squares = [8][8];
    whitePieces = [16];
    blackPieces = [16];
    turn = WHITE;
    castleRights = ""
    enPassant = ""
    halfMoves = 0
    fullMoves = 0
    // enPeasentSquare = 

    constructor() {
        
    }

    loadFEN(fen) {
        var fields = fen.split(/\s+/)
        var positions = fields[0].split('/')
        //set turn
        if(fields[1] == 'w'){
            turn = WHITE;
        }
        else {
            turn = BLACK;
        }
        castleRights = fields[2]
        enPassant = fields[3]
        halfMoves = fields [4]
        fullMoves = fields[5]
        for (let i = 0; i < BOARD_SIZE; i ++){
            for(let j = 0; j < BOARD_SIZE; j++){
                
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

    getLegalMoves() {

    }
}