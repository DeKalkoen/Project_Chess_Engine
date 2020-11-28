function availableMoves(square) {
	let board = chess.getCurrentBoard();
	let piece = board.squares[square.row][square.col];
	if (!piece) {
		console.log("BOARD AND CHESS API OUT OF SYNC!!!");
		return null;
	}
	return piece.getLegalMoves(board);
}

function getMove(moves, coord) {
	if (!moves)
		return null;

	for (let i = 0; i < moves.length; i++)
		if (moves[i].toX == coord.col && moves[i].toY == coord.row)
			return moves[i];

	return null;
}

function movePieceOnBoard(move, piece) {
	if (!move) return;
	let square = document.getElementById("s" + move.toX + "_" + move.toY);
	if (square.hasChildNodes()) {
		if (!move.isCapture) {
			console.log("BOARD AND API OUT OF SYNC!!!!! (captured piece)");
		}
		square.firstChild.remove();
	}
	square.appendChild(piece);
	addMoveHighlight(square.id, piece.className.includes("white"));
}

function playMove(move, piece) {
	console.log(move);
	removeOptionHighlights();
	movePieceOnBoard(move, piece);
	swapMoveHighlights();

	if (move.isCastle) {
		let rook = undefined;
		let rookMove = undefined;
		if (move.toX == 2 && move.toY == 0) {
			rook = document.getElementById("s0_0").firstChild;
			rookMove = new Move(INVALID, INVALID, 3, 0);
		}
		else if (move.toX == 6 && move.toY == 0) {
			rook = document.getElementById("s7_0").firstChild;
			rookMove = new Move(INVALID, INVALID, 5, 0);
		}
		else if (move.toX == 2 && move.toY == 7) {
			rook = document.getElementById("s0_7").firstChild;
			rookMove = new Move(INVALID, INVALID, 3, 7);
		}
		else if (move.toX == 6 && move.toY == 7) {
			rook = document.getElementById("s7_7").firstChild;
			rookMove = new Move(INVALID, INVALID, 5, 7);
		}
		movePieceOnBoard(rookMove, rook);
	}
	let board = chess.getCurrentBoard()
	chess.makeMoveOnBoard(board, move, true);
}