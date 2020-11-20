class Board {
    squares = [8][8];
    whitePieces = [16];
    blackPieces = [16];
    turn = WHITE;

    // enPeasentSquare = 

    constructor() {
        
    }

    loadFEN(fen) {

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