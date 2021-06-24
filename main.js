const score = document.querySelector('.score'),
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.gameArea'),
	car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false,
};

const setting = {
	start: false, // начало игры
	score: 0,
	speed: 3,
	traffic: 3,
};

function getQuantityElements(heightElement) {
	return Math.round(document.documentElement.clientHeight / heightElement) + 1;
}

getQuantityElements(200);
// console.log(getQuantityElements(200));

function startGame() {
	start.classList.add('hide');

	for (let i = 0; i < getQuantityElements(100); i++) {
		const roadLine = document.createElement('div');
		roadLine.classList.add('roadLine');
		roadLine.style.top = i * 100 + 'px';
		roadLine.y = i * 100;
		gameArea.appendChild(roadLine);
	}

	for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
		const enemyCar = document.createElement('div');
		enemyCar.classList.add('enemyCar');
		enemyCar.y = -100 * setting.traffic * (i + 1);
		enemyCar.style.top = enemyCar.y + 'px';
		enemyCar.style.left =
			Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		enemyCar.style.background =
			'transparent url("./image/enemy_black.png") center / cover no-repeat';
		gameArea.appendChild(enemyCar);
	}

	setting.start = true;
	gameArea.appendChild(car);
	setting.x = car.offsetLeft; // добавляет в конец setting{} элемент x: 125
	// где 125 определено в style.css (left: 125px;)
	setting.y = car.offsetTop;
	requestAnimationFrame(playGame);
}

function playGame() {
	if (setting.start) {
		moveRoad();
		moveEnemy();
		if (keys.ArrowLeft && setting.x > 0) {
			setting.x -= setting.speed;
		}
		if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
			setting.x += setting.speed;
		}
		if (
			keys.ArrowDown &&
			setting.y < gameArea.offsetHeight - car.offsetHeight
		) {
			setting.y += setting.speed;
		}
		if (keys.ArrowUp && setting.y > 0) {
			setting.y -= setting.speed;
		}

		car.style.left = setting.x + 'px';
		car.style.top = setting.y + 'px';

		requestAnimationFrame(playGame); // рекурсия
	}
}

function startRun(event) {
	event.preventDefault();
	keys[event.key] = true;
}

function stopRun(event) {
	event.preventDefault();
	keys[event.key] = false;
}

function moveRoad() {
	let roadLines = document.querySelectorAll('.roadLine');
	roadLines.forEach(function (roadLine) {
		// Параметры: элемент (roadLine), индекс элемента (i)
		roadLine.y += setting.speed;
		roadLine.style.top = roadLine.y + 'px';

		if (roadLine.y >= document.documentElement.clientHeight) {
			roadLine.y = -100; // разметка дороги формируется за пределами экрана и "выезжает"
		}
	});
}

function moveEnemy() {
	let enemyCars = document.querySelectorAll('.enemyCar');
	enemyCars.forEach(function (enemyCar) {
		enemyCar.y += setting.speed / 2;
		enemyCar.style.top = enemyCar.y + 'px';
		if (enemyCar.y >= document.documentElement.clientHeight) {
			enemyCar.y = -100 * setting.traffic;
			enemyCar.style.left =
				Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		}
	});
}
