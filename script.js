function initiate(){
	if (window.addEventListener) {
		window.addEventListener("load", autorun, false);
	}
	else if (window.attachEvent){
		window.attachEvent("onload", autorun);
	}
	else {
		window.onload = autorun;
	}
}

function autorun(){
	console.log("autorun finished.")
}

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