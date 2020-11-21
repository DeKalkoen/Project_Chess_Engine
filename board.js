class Board {
    squares = Array.from(Array(8), () => new Array(8))
    whitePieces = [16];
    blackPieces = [16];
    turn = WHITE;
    castleRights = ""
    enPassant = ""
    halfMoves = 0
    fullMoves = 0
    // enPeasentSquare = 

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
        this.castleRights = fields[2]
        this.enPassant = fields[3]
        this.halfMoves = fields [4]
        this.fullMoves = fields[5]
        for (let i = 0; i < BOARD_SIZE; i ++){
            let board_j = 0;
            for(let j = 0; j < positions[i].length; j++){
                console.log(i,j)
                if (!isNaN(parseInt(positions[i][j]),10)){
                    board_j+= parseInt(positions[i][j],10);
                }
                else{
                    this.squares[7 - i][board_j] = pieceFromFEN(positions[i][j]);
                    board_j++
                }
                
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