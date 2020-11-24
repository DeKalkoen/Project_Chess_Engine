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

function removeHighlights() {
	console.log("remove called");
	document.querySelectorAll(".highlighted").forEach((div) => {
		if (div.hasChildNodes()) {
			let piece = div.firstChild;
			let square = div.parentNode;
			div.remove();
			square.appendChild(piece);
		}
		else {
			div.remove();
		}
	});
}

function addHighlight(square, type) {
	let div = document.getElementById(square);
	let highlight = document.createElement("div");
	highlight.className = "highlighted " + type;
	if (div.hasChildNodes())
		highlight.appendChild(div.firstChild);

	div.appendChild(highlight);
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

function showHighlights(moves) {
	for (let i = 0; i < moves.length; i++) {
		let id = "s" + moves[i].toX + "_" + moves[i].toY;
		if (moves[i].isCapture) {
			addHighlight(id, "capture_move");
		}
		else {
			addHighlight(id, "non_capture_move");
		}
	}
}

function playMove(move, piece) {
	console.log(move);
	removeHighlights();
	document.getElementById("s" + move.toX + "_" + move.toY).appendChild(piece);
}

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

	div.onmousedown = (ev) => {
		let ret = getHoveredSquare(ev.clientX, ev.clientY);
		div.style.position = "absolute";
		div.style.left = (ev.clientX - div.clientWidth / 2) + "px";
		div.style.top = (ev.clientY - div.clientHeight / 1.8) + "px";
		let moves = availableMoves(ret);
		console.log(moves);
		removeHighlights();
		if (!moves) {
			console.log("Moves == null");
		}
		else {
			showHighlights(moves);
		}

		document.onmousemove = (event) => {
			div.style.left = (event.clientX - div.clientWidth / 2) + "px";
			div.style.top = (event.clientY - div.clientHeight / 1.8) + "px";
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

	let square = document.getElementById('s' + piece.x + '_' + piece.y);
	square.appendChild(div);
}

function generateBoard() {
	for (let i = BOARD_SIZE - 1; i >= 0; i--) {
		let rank = document.createElement("div");
		rank.className = "rank";
		for (let j = 0; j < BOARD_SIZE; j++) {
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
				if (square.hasChildNodes())
					square.innerHTML = square.firstChild.innerHTML;
				else {
					addHighlight(square.id, "selected");
				}
			}
			square.onmousedown = () => {
				if (!square.hasChildNodes())
					removeHighlights();
			}
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