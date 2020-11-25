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