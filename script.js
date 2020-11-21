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

function addPieceToHTML(piece) {
	let content = "";
	if (piece.type === KING) {
		content = "K";
	}
	else if (piece.type === QUEEN) {
		content = "Q";
	}
	else if (piece.type === ROOK) {
		content = "R";
	}
	else if (piece.type === BISHOP) {
		content = "B";
	}
	else if (piece.type === KNIGHT) {
		content = "N";
	}
	else if (piece.type === PAWN) {
		content = "P";
	}

	console.log('s' + piece.x + '_' + piece.y);

	let square = document.getElementById('s' + piece.x + '_' + piece.y);
	square.innerHTML = content;

	if (piece.color == WHITE) {
		square.className += " white";
	}
	else {
		square.className += " black";
	}
}

function autorun() {
	let chess = new Chess();

	let board = chess.getCurrentBoard();
	console.log(board);
	for (let i = 0; i < board.whitePieces.length; i++) {
		addPieceToHTML(board.whitePieces[i]);
	}
	for (let i = 0; i < board.blackPieces.length; i++) {
		addPieceToHTML(board.blackPieces[i]);
	}
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