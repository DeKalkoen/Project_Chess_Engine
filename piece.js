class Piece {
    color = 0;
    type = 0;

    x = 0;
    y = 0;
    getLegalMoves(board) {

    }
}

function pieceFromFEN(character){
    let piece
    let returnColor
    if (!isNaN(character * 1)){
        console.log("piecFromFEN only takes characters");
    }
    if (character == character.toUpperCase()){
        returnColor = WHITE;
    }
    else {
        returnColor = BLACK;
    }
    character = character.toLowerCase();
    if (character === 'k'){
        piece = new King
        piece.type = KING
    }
    else if (character === 'q'){
        piece = new Queen
        piece.type = QUEEN
    }
    else if (character === 'r'){
        piece = new Rook
        piece.type = ROOK
    }
    else if (character === 'n'){
        piece = new Knight
        piece.type = KNIGHT
    }
    else if (character === 'b'){
        piece = new Bishop
        piece.type = BISHOP

    }
    else if (character == 'p'){
        piece = new Pawn
        piece.type = PAWN
    }
    piece.color = returnColor;
    return piece;
}

class King extends Piece {
    getLegalMoves(board) {
        
    }
}

class Queen extends Piece {
    getLegalMoves(board) {

    }
}

class Rook extends Piece {
    getLegalMoves(board) {

    }
}

class Bishop extends Piece {
    getLegalMoves(board) {

    }
}

class Knight extends Piece {
    getLegalMoves(board) {

    }
}

class Pawn extends Piece {
    enPassant = 0;
    getLegalMoves(board) {

    }
}