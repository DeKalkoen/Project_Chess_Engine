class Move {
    fromX = INVALID;
    fromY = INVALID;
    toX = INVALID;
    toY = INVALID;
    isCapture = false;
    isPawnMove = false;
    isCastle = false;
    isPromote = false;
    isCheck = false;
    
    constructor(fromX, fromY, toX, toY){
        this.fromX = fromX
        this.fromY = fromY
        this.toX = toX
        this.toY = toY
    }
}