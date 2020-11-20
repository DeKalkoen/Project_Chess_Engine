const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

class Chess {
    positions = [] // Array of boards
    moves = [] // Array of moves played
    winner = undefined // Winner
    
    constructor(fen) {
        let error = undefinedl
        if (!fen)
            error = this.loadFEN(DEFAULT_FEN);
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
            return;
        }
        return this.positions[this.positions.length - 1];
    }

    loadFEN(fen) {
        if(!validFEN(fen)){
            return error;
        }
    }

    validFEN(fen){
        var fields = fen.split(/\s+/)
        // FEN consists of 6 fields
        if (fields.length !== 6){
            console.log("FEN Must have 6 fields.")
            return false;
        }
        // 4th field must be an integer > 0
        if (isNaN(fields[4]) || 0 > parseInt(fields[5], 10)) {
            console.log("Halfmove number must be an integer that is > 0.")
            return false;
          }
      
        // 5th field must be an integer > 0
        if (isNaN(fields[5]) || 0 > parseInt(fields[4], 10)) {
            console.log("Move number must be an integer that is > 0.")
            return false;
        }
      
        //en passant may be - or any coordinate
        if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
            console.log("En pessant field must be either - or a coordinate.")
            return false;
        }
      
          /* 5th criterion: 3th field is a valid castle-string? */
          if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
            return { valid: false, error_number: 5, error: errors[5] }
          }
      
          /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
          if (!/^(w|b)$/.test(tokens[1])) {
            return { valid: false, error_number: 6, error: errors[6] }
          }
      
          /* 7th criterion: 1st field contains 8 rows? */
          var rows = tokens[0].split('/')
          if (rows.length !== 8) {
            return { valid: false, error_number: 7, error: errors[7] }
          }

    }
    // Clock
}