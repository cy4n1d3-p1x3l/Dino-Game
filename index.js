const steps = document.getElementById("steps");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");
const gameOverDiv = document.getElementById("game-over");
const Dino = document.getElementById("dino-stat");
const ground = document.getElementById("gr");
const cactus = document.getElementById("cac");
let isStart = 0,
  id,
  currentScore = 0,
  currentHighScore = localStorage["score"] ? localStorage["score"] : "00000",
  topDist = 0,
  leftDist = 25,
  rightValue = 0,
  width = 100000,
  number = 0,
  cactusArray = [],
  corrleft = [2000, 995, 1500],
  hasDone = [false, false, false],
  id2,
  id3,
  id4,
  id5;
document.body.onkeyup = function (e) {
  if ((e.keyCode == 32 || e.key == " ") && isStart == 0) start();
  if ((e.keyCode == 32 || e.key == " ") && isStart > 1) jump();
};
highScore.innerHTML = `High Score :${currentHighScore}`;
currentHighScore = Number(currentHighScore);
function start() {
  id = setInterval(changeDino, 200);
  gameOverDiv.innerHTML = ``;
  steps.innerHTML = ``;
  isStart++;
  id2 = setInterval(moveRoad, 170);
  setTimeout(function () {}, 3000);
  id3 = setInterval(spawnCactus, 2000);

  Dino.classList.add("right");
  setTimeout(function () {
    Dino.classList.remove("right");
    Dino.style.left = "80px";
  }, 500);
  id4 = setInterval(moveCactus, 100);
  id5 = setInterval(checkCollision, 150);
}
function checkCollision() {
  let dinoPos, cac1Pos, cac2Pos, cac3Pos;
  dinoPos = Dino.getBoundingClientRect();
  cac1Pos = document.getElementById("cactus0").getBoundingClientRect();
  cac2Pos = document.getElementById("cactus1").getBoundingClientRect();
  cac3Pos = document.getElementById("cactus2").getBoundingClientRect();

  if (
    dinoPos.right >= cac1Pos.left &&
    dinoPos.left <= cac1Pos.right &&
    dinoPos.bottom >= cac1Pos.top
  )
    gameOver();
  if (
    dinoPos.right > cac2Pos.left &&
    dinoPos.left <= cac2Pos.right &&
    dinoPos.bottom > cac2Pos.top
  )
    gameOver();
  if (
    dinoPos.right > cac3Pos.left &&
    dinoPos.left <= cac3Pos.right &&
    dinoPos.bottom > cac3Pos.top
  )
    gameOver();
}
function jump() {
  Dino.classList.remove("jump");
  clearInterval(id);
  Dino.src = "./images/dino-stationary.png";
  Dino.classList.add("jump");
  setTimeout(function () {
    Dino.classList.remove("jump");
  }, 500);
  id = setInterval(changeDino, 200);
  return;
}

function spawnCactus() {
  number = ++number % 3;
  randomPosition = 1100 + Math.floor(Math.random() * 200);
  document.getElementById(`cactus${number}`).style.left = `${randomPosition}px`;
  corrleft[number] = randomPosition;
}
function changeDino() {
  if (isStart == 1) Dino.src = "./images/dino-run-0.png";
  else {
    if (isStart % 2 == 0) Dino.src = "./images/dino-run-1.png";
    else Dino.src = "./images/dino-run-0.png";
  }
  isStart++;
  currentScore++;
  let scoreDisplay = "";
  for (let i = 0; i < 5 - currentScore.toString().length; i++)
    scoreDisplay += "0";
  scoreDisplay += currentScore.toString();
  score.innerHTML = `Score :${scoreDisplay}`;
}
function moveCactus() {
  document.getElementById("cactus1").style.left = `${corrleft[1]}px`;
  corrleft[1] -= 50;
  document.getElementById("cactus0").style.left = `${corrleft[0]}px`;
  corrleft[0] -= 50;
  document.getElementById("cactus2").style.left = `${corrleft[2]}px`;
  corrleft[2] -= 50;
}
function moveRoad() {
  ground.style.right = `${rightValue}px`;
  rightValue += 250;
  width += 1350;
  ground.style.width = `${width}px`;
}
function gameOver() {
  isStart = 0;
  corrleft = [2000, 995, 1500];
  document.getElementById("cactus1").style.left = `${corrleft[1]}px`;
  document.getElementById("cactus0").style.left = `${corrleft[0]}px`;
  document.getElementById("cactus2").style.left = `${corrleft[2]}px`;

  clearInterval(id);
  clearInterval(id2);
  clearInterval(id3);
  clearInterval(id4);
  clearInterval(id5);

  number = 0;
  currentHighScore =
    currentHighScore > currentScore ? currentHighScore : currentScore;
  currentScore = 0;
  score.innerHTML = `Score :00000`;
  let highDisplay = "";
  for (let i = 0; i < 5 - currentHighScore.toString().length; i++)
    highDisplay += "0";
  highDisplay += currentHighScore.toString();
  localStorage.setItem("score", `${highDisplay}`);
  highScore.innerHTML = `High Score :${highDisplay}`;
  Dino.src = "./images/dino-lose.png";
  gameOverDiv.innerHTML = `GAME OVER`;
  steps.innerHTML = `<h1>PRESS SPACEBAR TO START</h1>`;
}
