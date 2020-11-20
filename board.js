class Board {
    squares = [8][8];
    whitePieces = [16];
    blackPieces = [16];
    turn = 0;
    whiteToMove = turn % 2;

    // enPeasentSquare = 

    constructor(board, move) {
        
    }

    at(file, rank) {
        return squares[rank - 1][file]
    }

    getLegalMoves() {

    }
}