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
    - Pieces[][] // Every square and whether it is occupied
    - whitePieces[] // white's pieces
    - blackPieces[] // black's pieces

Piece
    - Piece position and type

Move
    - From square
    - To square
```