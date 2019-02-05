


const gameInfo = {
	playing: false,
	gameSize: null,
	pieces: [],
}

const toggleDisplay = el => {
	console.log("toggle display called");
	console.log(el);
	if (el.style.display == "none") {
		el.style.display = "block";
	} else {
		el.style.display = "none";
	}
}

const hideShowIcon = e => {
	console.log("hideShowIcon clicked");
	console.log(e);
	console.log(e.querySelector("p"));
	if (e.classList.contains("game-icon-hide")) {
		e.classList.remove("game-icon-hide");
		e.classList.add("game-icon-show");
		e.querySelector("p").style.display = "block";
	} else {
		e.classList.add("game-icon-hide");
		e.classList.remove("game-icon-show");
		e.querySelector("p").style.display = "none";
	}
}

const renderPage = () => {

	let welcomeScreen = document.querySelector(".welcome-screen");
	let gameScreen = document.querySelector(".game-screen");

	if (!gameInfo.playing) {

		welcomeScreen.style.display = "block";
		gameScreen.style.display = "none";

		let sizeButtons = document.querySelectorAll(".size-btn");
		sizeButtons.forEach(btn => {
			btn.addEventListener("click", function() {
				gameInfo.playing = true;
				renderPage();
			})
		})
	} else {

		welcomeScreen.style.display = "none";
		gameScreen.style.display = "block";
		
		let gameIcons = document.querySelectorAll(".game-piece");
		gameIcons.forEach(piece => {
			let icon = piece.querySelector('.game-icon');
			piece.addEventListener("click", function() {
				hideShowIcon(icon);
			});
		})
	}

}
