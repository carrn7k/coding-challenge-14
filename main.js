

const fonts = {
	0: {
		class: 'fa-hamburger',
		id: 0
	},
	1: {
		class: 'fa-hotdog',
		id: 1
	},
	2: {
		class: 'fa-ice-cream',
		id: 2
	},
	3: {
		class: 'fa-pizza-slice',
		id: 3
	},
	4: {
		class: 'fa-bacon',
		id: 4
	},
	5: {
		class: 'fa-beer',
		id: 5
	},
	6: {
		class: 'fa-coffee',
		id: 6
	},
	7: {
		class: 'fa-bread-slice',
		id: 7
	},
	8: {
		class: 'fa-egg',
		id: 8
	},
	9: {
		class: 'fa-apple-alt',
		id: 9
	},
	10: {
		class: 'fa-cookie',
		id: 10
	}
}


const myData = {};


const gameInfo = {
	playing: false,
	ready: false,
	gameSize: 4,
	activePieces: 0,
	currentScore: 0,
	currentTime: 0,
	winCount: 0,
	moves: 0,
	pieces: myData
}

var countDown = null;
const welcomeScreen = document.querySelector(".welcome-screen");
const gameScreen = document.querySelector(".game-screen");
const matchTrophy = document.getElementById("match-trophy");
const trophyWin = document.getElementById('trophy-win');
const gameBoard = document.getElementById('game-board');
const score = document.getElementById("score");
const timer = document.getElementById("timer");
const moves = document.getElementById("moves");
const resetBtn = document.getElementById("reset-btn");
const sizeBtns = document.querySelectorAll(".size-change-btn");

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const toggleDisplay = (el) => {

	if (el.style.display == "none") {
		el.style.display = "block";
	} else {
		el.style.display = "none";
	}
}

const toggleClick = (piece) => {
	if (piece.display) {
		piece.display = false;
	} else {
		piece.display = true;
	}
}

function changeSize() {
	if (this.id === "sm") {
		gameInfo.gameSize = 8;;
	} else if (this.id === "md") {
		gameInfo.gameSize = 14;
	} else if (this.id === "lg") {
		gameInfo.gameSize = 20;
	}
	gameInfo.ready = false;
	resetGame();
}

const disableClickEvents = () => {
	let gamePieces = document.querySelectorAll(".game-piece");
	gamePieces.forEach((piece, i) => {
		let p = piece.querySelector('.game-icon');
		p.removeEventListener("click", handlePieceClick);
	});
}

const resetGame = () => {
	gameInfo.currentTime = 0;
	timer.innerText	= `Time: ${gameInfo.currentTime}s`;
	while (gameBoard.firstChild) {
		gameBoard.removeChild(gameBoard.firstChild);
	}
	gameInfo.activePieces = 0;
	gameInfo.currentScore = 0;
	gameInfo.moves = 0;
	gameInfo.timer = 0;
	gameInfo.ready = false;
	renderPage();
}

const trophyAnimation = (iconClass) => {

	let left = document.querySelector(".match-trophy div:nth-child(2)");
	let right = document.querySelector(".match-trophy div:nth-child(3)");
	left.childNodes[1].classList.add("fas");
	right.childNodes[1].classList.add("fas");
	left.childNodes[1].classList.add(iconClass);
	right.childNodes[1].classList.add(iconClass);

	matchTrophy.classList.remove("trophy-hide");
	matchTrophy.classList.add("trophy-display");

	setTimeout(function() {
		left.style.animation = "trophy-left 3s";
		right.style.animation = "trophy-right 3s";
	}, 500)
	setTimeout(function() {
		matchTrophy.classList.remove("trophy-display");
		matchTrophy.classList.add("trophy-hide");
		left.childNodes[1].className = '';
		right.childNodes[1].className = '';
  	left.style.removeProperty("animation");
  	right.style.removeProperty("animation");
	}, 3000)
}

function handlePieceClick(e) {
	
	let currentTarget = this;
	let currentTargetId = parseInt(currentTarget.id);
	if (gameInfo.pieces[currentTargetId].display) {
		return;
	}

	gameInfo.moves++;
	moves.innerText = `Moves: ${gameInfo.moves}`;
	hideShowIcon(currentTarget);
	
	toggleClick(gameInfo.pieces[currentTargetId]);

	let id = gameInfo.pieces[currentTargetId].id;
	let matchedIds = Object.values(gameInfo.pieces).filter(obj => obj.id === id);
	if (matchedIds[0].display && matchedIds[1].display) {
		disableClickEvents();
		matchedIds[0].matched = true;
		matchedIds[1].matched = true;
		setTimeout(function() {
			trophyAnimation(gameInfo.pieces[currentTargetId].icon.class);
		}, 500)
		gameInfo.currentScore++;
		gameInfo.activePieces = 0;
		if (gameInfo.currentScore == gameInfo.winCount) {
			setTimeout(function() {
				matchTrophy.classList.remove("trophy-hide");
				matchTrophy.classList.add("trophy-display");
				trophyWin.classList.remove("trophy-win-hide");
				trophyWin.classList.add("trophy-win-display");
				trophyWin.style.animation = "trophy-win 4s";
			}, 3600);
			setTimeout(function() {
				matchTrophy.classList.add("trophy-hide");
				matchTrophy.classList.remove("trophy-display");
				trophyWin.style.removeProperty("animation");
				trophyWin.classList.remove("trophy-win-display");
				trophyWin.classList.add("trophy-win-hide");
				resetGame();
			}, 7000)
		} else {
			setTimeout(function() {
				renderPage();
			}, 3900);
		}
	} else if (gameInfo.activePieces == 2) {
		disableClickEvents();
		setTimeout(function() {
			renderPage();
		}, 1400);
	}
}

const hideShowIcon = (eTarget) => {
	if (eTarget.classList.contains("game-icon-hide")) {
		gameInfo.activePieces++;
		eTarget.classList.remove("game-icon-hide");
		eTarget.classList.add("game-icon-show");
		eTarget.querySelector("i").style.display = "block";
	} else {
		gameInfo.activePieces--;
		eTarget.classList.add("game-icon-hide");
		eTarget.classList.remove("game-icon-show");
		eTarget.querySelector("i").style.display = "none";
	}
}

const renderPage = () => {

	moves.innerText = `Moves: ${gameInfo.moves}`;
	score.innerText = `Score: ${gameInfo.currentScore}`;

	if (!gameInfo.playing) {

		welcomeScreen.style.display = "block";
		gameScreen.style.display = "none";

		let sizeButtons = document.querySelectorAll(".size-btn");
		sizeButtons.forEach(btn => {
			btn.addEventListener("click", function() {
				if (this.id === "size-btn-sm") {
					gameInfo.gameSize = 8;
				} else if (this.id === "size-btn-m") {
					gameInfo.gameSize = 14;
				} else {
					gameInfo.gameSize = 20;
				}
				gameInfo.playing = true;
				renderPage();
			})
		})
	} else {

		if (!gameInfo.ready) {
			timer.innerText	= `Time: ${gameInfo.currentTime}s`;
			setupGameBoard();
		}

		welcomeScreen.style.display = "none";
		gameScreen.style.display = "block";
		gameInfo.activePieces = 0;

		let gameIcons = document.querySelectorAll(".game-piece");
		gameIcons.forEach((piece, i) => {
			let p = piece.querySelector('.game-icon');
			p.id = i;
			if (gameInfo.pieces[i].matched) {
				p.removeEventListener("click", handlePieceClick);
			} else {
				gameInfo.pieces[i].display = false;
				p.addEventListener("click", handlePieceClick);
				p.classList.remove("game-icon-show");
				p.classList.add("game-icon-hide");
			}
		})
	}
}

const initializeData = (size) => {
	for (let i = 0; i < size; i++) {
		myData[i] = {
			index: i,
			display: false,
			matched: false,
			id: null,
			icon: ''
		}
	}
}

const setupGameBoard = () => {

	gameInfo.winCount = gameInfo.gameSize / 2;
	initializeData(gameInfo.gameSize);

	if (countDown	== null) {
		countDown = setInterval(function() {
			timer.innerText = `Time: ${gameInfo.currentTime++}s`;
		}, 1000);
	} else {
		clearInterval(countDown);
		countDown = setInterval(function() {
			timer.innerText = `Time: ${gameInfo.currentTime++}s`;
		}, 1000);
	}
	

	let ranArray = [];
	for (var i = 0; i < gameInfo.gameSize / 2; i++) {
		ranArray.push(i);
		ranArray.push(i);
	}
	shuffle(ranArray);

	for (var i = 0; i < gameInfo.gameSize; i++) {

		let piece = document.createElement('div');
		let gameIcon = document.createElement('div');
		let icon = document.createElement('i');

		gameInfo.pieces[i].matched = false;
		gameInfo.pieces[i].id = ranArray[i];
		gameInfo.pieces[i].icon = fonts[ranArray[i]];

		piece.classList.add('game-piece');
		gameIcon.classList.add('game-icon');
		gameIcon.classList.add('game-icon-hide');
		icon.classList.add('fas');
		icon.classList.add(fonts[ranArray[i]].class);

		gameIcon.append(icon);
		piece.append(gameIcon);
		gameBoard.append(piece);

		gameIcon.addEventListener("click", handlePieceClick);
	}

	sizeBtns.forEach((btn) => {
		btn.addEventListener("click", changeSize);
	});
	resetBtn.addEventListener("click", resetGame);
	gameInfo.ready = true;

}
	
	



