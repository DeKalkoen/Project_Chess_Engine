class Board {
    squares = Array.from(Array(8), () => new Array(8))
    whitePieces = [];
    blackPieces = [];
    turn = INVALID;
    castleRights = "";
    enPassant = "";
    halfMoves = 0;
    fullMoves = 0;

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

    getLegalMoves() {

    }
}