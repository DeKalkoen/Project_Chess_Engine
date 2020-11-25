let chess;

function initiate() {
	if (window.addEventListener) {
		window.addEventListener("load", autorun, false);
	}
	else if (window.attachEvent) {
		window.attachEvent("onload", autorun);
	}
	else {
		window.onload = autorun;
	}
}

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

function removeHighlight(highlight) {
	let piece = getDivChild(highlight);
	if (piece) {
		let square = highlight.parentNode;
		highlight.remove();
		square.appendChild(piece);
	}
	else {
		highlight.remove();
	}
}

function removeSelectedHighlights() {
	document.querySelectorAll(".highlighted_selected").forEach((highlight) => removeHighlight(highlight));
}

function swapMoveHighlights() {
	document.querySelectorAll(".highlighted_move_last").forEach((highlight) => highlight.className = highlight.className.replace(" highlighted_move_last", ""));
	document.querySelectorAll(".highlighted_move_current").forEach((highlight) => highlight.className = highlight.className.replace("current", "last"));
}

function removeCurrentPieceHighlights() {
	document.querySelectorAll(".highlighted_move_current").forEach((highlight) => highlight.className = highlight.className.replace(" highlighted_move_current", ""));
}

function removeOptionHighlights() {
	document.querySelectorAll(".highlighted_non_capture_option").forEach((highlight) => removeHighlight(highlight));
	document.querySelectorAll(".highlighted_capture_option").forEach((highlight) => removeHighlight(highlight));
}

function isOptionHighlight(highlight) {
	return (highlight.className.includes("highlighted_capture_option") || highlight.className.includes("highlighted_non_capture_option"));
}

function removeBothHighlights() {
	removeSelectedHighlights();
	removeOptionHighlights();
	removeCurrentPieceHighlights();
}

function addHighlight(square, type) {
	let div = document.getElementById(square);
	if (!div) return;
	let highlight = document.createElement("div");
	highlight.className = type;
	if (div.hasChildNodes())
		highlight.appendChild(div.firstChild);

	div.appendChild(highlight);
}

function addMoveHighlight(square_id) {
	document.getElementById(square_id).className += " highlighted_move_current";
}

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

function showOptionHighlights(moves) {
	for (let i = 0; i < moves.length; i++) {
		let id = "s" + moves[i].toX + "_" + moves[i].toY;
		if (moves[i].isCapture) {
			addHighlight(id, "highlighted_capture_option");
		}
		else {
			addHighlight(id, "highlighted_non_capture_option");
		}
	}
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

	chess.makeMoveOnCurrent(move);
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

function autorun() {
	generateBoard();
	chess = new Chess();
	placePieces(chess.getCurrentBoard());
}






/*
function setupLocalStorage(){
	createLocalStorageItem("test",0);
}

function createLocalStorageItem(nameString, defaultValue){
	if (localStorage.getItem(nameString) === null){
		localStorage.setItem(nameString, defaultValue);
	}
	else{
		//console.log("Item already exists in Localstorage.");
	}
}

function loadFromStorage(){
	cookieCount = Number(localStorage.getItem("cookieCount"));
}

function setupEventListeners(){
	document.getElementById("cookiebox").addEventListener("click",addClick);
	document.getElementsByClassName(items.array[6].nameString)[0].addEventListener("mouseenter",function(){showShopInfo(items.array[6])});
}

function setupIntervals(){
	setInterval(logTest,1000);
}

function hideCookieTotalInfo(){
	document.getElementById("cookieTotalInfo").style.visibility = "hidden";
}

function save(){
	localStorage.setItem("cookieCount", cookieCount);
}

function reset(){
	localStorage.clear();
	setupLocalStorage();
	loadFromStorage();
}
*/