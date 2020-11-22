### Project_Chess_Engine

This is a chess implementation, written in js by DeKalkoen and Chrysophylaxs.

### Class structure
```js
Chess
    - Game related variables
    - Board[] // All boards
    - Moves[] // All moves

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
    - halfMoves = 0; //count of halfmoves
    - fullMoves = 0;//count of fullmoves

Piece
    - Position // represented by x/y
    - color // White or black piece
    - type // type of piece. i.e King

Move
    - From square
    - To square
```