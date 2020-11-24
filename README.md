### Project_Chess_Engine
This is a chess implementation, written in js by DeKalkoen and Chrysophylaxs.

### Class structure
```js
Chess
    - Game related variables
    - positions[] // All boards
    - moves[] // All moves
    - winner // winner
    getCurrentBoard()// returns the most recent board in positions[]
    makeMoveOnCurrent()// makes a move on a board, pushes the new board to positions[] and the move to moves[]
    loadFEN()// calls function to convert FEN string to a board
    validateFEN()// validates the FEN string using a number of criteria

Board
    - Board related variables
    - squares[][] // Every square and whether it is occupied
    - whitePieces[] // white's pieces
    - blackPieces[] // black's pieces
    - turn = WHITE/BLACK //current turn on this board
    - castleRights = ""; //FEN string representing castling rights
    - whiteCastleKing; // boolean for white castling rights (kingside)
    - whiteCastleQueen;// boolean for white castling rights (queenside)
    - blackCastleKing; // boolean for black castling rights (kingside)
    - blackCastleQueen;// boolean for black castling rights (queenside)
    - enPassant = "";//fen string holding the possible en passant square 
    - halfmoves = 0; //count of halfmoves since the last capture or pawnmove
    - fullmoves = 0;//count of fullmoves
    loadFEN()// loads a FEN string onto a board
    at()// returns the piece on a board. takes as input file,rank. i.e a,1
    getWhoseTurn() //returns the current turn
    convertCoordinates()// converts coordinates to acces squares[][] to chess coordinates. i.e convertCoordinates(0,0) > a1
    revertCoordinates()// reverts the process of convertCoordinates
    isLegalMove_specify()// checks wheter a move is legal or not, also sets the flags of said move
    getPieceIndex()// gets the piece index of the pieces array. takes as input x,y,color
    updateCastlingRights()//updates the castling rights of a board using a move

Piece
    - Position // represented by x/y
    - color // White or black piece
    - type // type of piece. i.e King
    - getLegalMoves()// returns an array of legal moves including flags

Move
    - From square //coordinate represented by x/y
    - To square // coordinate represented by x/y
    - isPawnMove // specifies if the move if a pawn move (boolean)
    - isCapture //specifies if the move is a capture (boolean)
    - isCastle // specifies if the move was a castle move i.e O-O (boolean)

```