function getHoveredSquare(mouseX, mouseY) {
	let row = INVALID;
	let col = INVALID;

	for (let j = 0; j < BOARD_SIZE; j++) {
		let square = document.getElementById("s" + j + "_0").getBoundingClientRect();
		if (square.x < mouseX && mouseX < square.x + square.width) {
			col = j;
			break;
		}
	}

	for (let i = 0; i < BOARD_SIZE; i++) {
		let square = document.getElementById("s0_" + i).getBoundingClientRect();
		if (square.y < mouseY && mouseY < square.y + square.height) {
			row = i;
			break;
		}
	}

	return {col: col, row: row};
}

function getDivChild(div) {
	if (div.hasChildNodes())
		return div.firstChild;
	return undefined;
}

function dragLogic(div, ev) {
	if (ev.button == 2) return;
	if (isOptionHighlight(div.parentNode) || isOptionHighlight(div.parentNode.parentNode)) {
		return;
	}
	let ret = getHoveredSquare(ev.clientX, ev.clientY);
	div.style.position = "absolute";
	div.style.left = (ev.clientX - div.clientWidth / 2) + "px";
	div.style.top = (ev.clientY - div.clientHeight / 1.8) + "px";

	let focus = document.getElementById("focus");
	if (focus) focus.id = "";
	div.id = "focus";
	div.pieceCoord = ret;

	let moves = availableMoves(ret);
	console.log(moves);

	removeBothHighlights();
	if (!moves)
		console.log("Moves == null");
	else
		showOptionHighlights(moves);
	
	addMoveHighlight(div.parentNode.id, div.className.includes("white"));

	document.onmousemove = (event) => {
		let newX = event.clientX;
		let newY = event.clientY;

		let boardDim = document.getElementById("board").getBoundingClientRect();
		if (newX < boardDim.x) newX = boardDim.x;
		if (newX > boardDim.x + boardDim.width) newX = boardDim.x + boardDim.width;
		if (newY < boardDim.y) newY = boardDim.y;
		if (newY > boardDim.y + boardDim.height) newY = boardDim.y + boardDim.height;

		div.style.left = (newX - div.clientWidth / 2) + "px";
		div.style.top = (newY - div.clientHeight / 1.8) + "px";
	};

	document.onmouseup = (event) => {
		document.onmousemove = null;
		document.onmouseup = null;
		let ret2 = getHoveredSquare(event.clientX, event.clientY);

		let move = getMove(moves, ret2);
		if (move)
			playMove(move, div);

		div.style.left = "";
		div.style.top = "";
		div.style.position = "";
	};
};


function addPieceToHTML(piece) {
	let div = document.createElement("div");

	if (piece.color == WHITE) {
		div.className = "piece white";
	}
	else {
		div.className = "piece black";
	}
	
	if (piece.type === KING) {
		div.className += "_king";
	}
	else if (piece.type === QUEEN) {
		div.className += "_queen";
	}
	else if (piece.type === ROOK) {
		div.className += "_rook";
	}
	else if (piece.type === BISHOP) {
		div.className += "_bishop";
	}
	else if (piece.type === KNIGHT) {
		div.className += "_knight";
	}
	else if (piece.type === PAWN) {
		div.className += "_pawn";
	}

	div.onmousedown = (ev) => dragLogic(div, ev);

	let square = document.getElementById('s' + piece.x + '_' + piece.y);
	square.appendChild(div);
}

function createSquare(i, j) {
	let square = document.createElement("div");
	square.id = 's' + j + '_' + i;
	square.className = "square ";
	if ((i + j) % 2) {
		square.className += "light";
	}
	else {
		square.className += "dark";
	}
	square.oncontextmenu = (event) => {
		event.preventDefault();
		removeOptionHighlights();

		let child = getDivChild(square);
		if (!child)
			addHighlight(square.id, "highlighted_selected");
		else if (child.className.includes("highlighted_selected"))
			removeHighlight(child);
		else
			addHighlight(square.id, "highlighted_selected");
	}
	square.onmousedown = (ev) => {
		if (ev.button == 2) return;

		if (!square.hasChildNodes()) {
			removeBothHighlights();
		}
		else if (isOptionHighlight(square.firstChild)) {
			let coord = getHoveredSquare(ev.clientX, ev.clientY);
			let piece = document.getElementById("focus");
			let moves = availableMoves(piece.pieceCoord);
			console.log(moves);
			playMove(getMove(moves, coord), piece);
		}
	}
	return square;
}


function generateBoard() {
	for (let i = BOARD_SIZE - 1; i >= 0; i--) {
		let rank = document.createElement("div");
		rank.className = "rank";
		for (let j = 0; j < BOARD_SIZE; j++) {
			let square = createSquare(i, j);
			rank.appendChild(square);
		}
		document.getElementById("board").appendChild(rank);
	}
}

function placePieces(board) {
	console.log(board);
	for (let i = 0; i < board.whitePieces.length; i++) {
		addPieceToHTML(board.whitePieces[i]);
	}
	for (let i = 0; i < board.blackPieces.length; i++) {
		addPieceToHTML(board.blackPieces[i]);
	}
}