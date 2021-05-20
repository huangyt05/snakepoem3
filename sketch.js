// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 10;
let direction = "right";

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;

let scoreElem;

// 它月光一般轻轻地，
// 从你那儿潜潜走过；
// 为我把你的梦境衔了来，
// 像一只绯红的花朵。

let button;
let score = 0;
let snakePoem = ["它", "月", "光", "一", "般", "轻", "轻", "地", "，"];
let firstPoem = [
  "从",
  "你",
  "那",
  "儿",
  "潜",
  "潜",
  "走",
  "过",
  "；",
  "为",
  "我",
  "把",
  "你",
  "的",
  "梦",
  "境",
  "衔",
  "了",
  "来",
  "，",
  "像",
  "一",
  "只",
  "绯",
  "红",
  "的",
  "花",
  "朵",
  "。",
];

let canvas;
let buttonOne;
let fruitBol=false;

function setup() {
  scoreElem = createDiv("Score = 0");
  scoreElem.position(20, 20);
  scoreElem.id = "score";
  scoreElem.style("color", "white");

  canvas = createCanvas(500, 500);
  frameRate(10);
  fill(255);
  stroke(255);
  strokeWeight(0.3);
  updateFruitCoordinates();

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(0);
  if(score!=26){
    checkForFruit();
  }
  for (let i = 0; i < numSegments - 1; i++) {
    //line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    //square(xCor[i]-5, yCor[i]-5, diff);
    //text("A",xCor[i]-5, yCor[i]-5);
    textAlign(CENTER, CENTER);
    if (score == 26) {
      text(snakePoem[i], xCor[i], yCor[i]);
      updateHeart();
      checkForSpecialFruit();
    } else if (score < firstPoem.length) {
      text(snakePoem[i], xCor[i], yCor[i]);
      // if (score == 0) {
      //   updateHeart();
      //   checkForSpecialFruit();
      // }
    } else {
      endGame();
    }
    textSize(8);
  }
  drawMoon();
  drawSky();
  //updateFruitCoordinates();
  updateSnakeCoordinates();
  checkGameStatus();
  //checkForFruit();
  if (!fruitBol) {
    checkForFruit();
  }
}

function drawSky() {
  count = 1;
  for (i = 180; i < 220; i += 10) {
    if (count == 1) {
      for (n = 5; n < width; n += 30) {
        text("夜", n, i);
        text("空", n + 10, i);
      }
      count++;
    } else if (count == 2) {
      for (n = 5; n < width; n += 30) {
        text("夜", n + 10, i);
        text("空", n + 20, i);
      }
      count--;
    }
  }
}

function drawMoon() {
  count = 1;
  xMoon = 400;
  yMoon = 100;
  xMoons = [
    xMoon,
    xMoon,
    xMoon - 20,
    xMoon - 20,
    xMoon + 20,
    xMoon + 20,
    xMoon - 15,
    xMoon + 27,
    xMoon - 28,
    xMoon - 30,
  ];
  yMoons = [
    yMoon - 50,
    yMoon + 40,
    yMoon - 25,
    yMoon + 25,
    yMoon - 30,
    yMoon + 20,
    yMoon,
    yMoon,
    yMoon - 60,
    yMoon + 58,
  ];
  for (i = 0; i < xMoons.length; i++) {
    text("月", xMoons[i], yMoons[i]);
  }
}
function endGame() {

  noLoop();
}

function directTo() {
  location.replace("https://granite-regular-sprint.glitch.me/");
}
/*
 The segments are updated based on the direction of the snake.
 All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
 gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
 and this results in the movement of the snake.

 The last segment is added based on the direction in which the snake is going,
 if it's going left or right, the last segment's x coordinate is increased by a
 predefined value 'diff' than its second to last segment. And if it's going up
 or down, the segment's y coordinate is affected.
*/
function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case "right":
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case "up":
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case "left":
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case "down":
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

/*
 I always check the snake's head position xCor[xCor.length - 1] and
 yCor[yCor.length - 1] to see if it touches the game's boundaries
 or if the snake hits itself.
*/
function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 210 ||
    checkSnakeCollision()
  ) {
    endGame();
    showButton = true;
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html("Game ended! Your score was : " + scoreVal);
  }
}

/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}

/*
 Whenever the snake consumes a fruit, I increment the number of segments,
 and just insert the tail segment again at the start of the array (basically
 I add the last segment again at the tail, thereby extending the tail)
*/
function checkForFruit() {
  //point(xFruit, yFruit);
  text(firstPoem[score], xFruit, yFruit);
  //circle(xFruit, yFruit, diff);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html("Score = " + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    //console.log(score);
    updateFruitCoordinates();
    score++;
    updateSnakeContent();
  }
}

function checkForSpecialFruit() {
  //point(xFruit, yFruit);
  fruitBol = false;
  //text(firstPoem[score], xFruit, yFruit);
  //circle(xFruit, yFruit, diff);
  for (i = 0; i < xHearts.length; i++) {
    if (
      xCor[xCor.length - 1] === xHearts[i] &&
      yCor[yCor.length - 1] === yHearts[i]
    ) {
      const prevScore = parseInt(scoreElem.html().substring(8));
      scoreElem.html("Score = " + (prevScore + 1));
      xCor.unshift(xCor[0]);
      yCor.unshift(yCor[0]);
      numSegments++;
      //console.log(score);
      updateFruitCoordinates();
      score++;
      updateSnakeContent();
      fruitBol = true;
    }
  }
}

function updateFruitCoordinates() {
  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 300) / 10)) * 10 +210;
}

function updateHeart() {
  xHeart = 350;
  yHeart = 300;
  xHearts = [
    xHeart,
    xHeart - 20,
    xHeart - 10,
    xHeart + 20,
    xHeart + 10,
    xHeart - 40,
    xHeart + 40,
    xHeart,
    xHeart + 20,
    xHeart - 20,
    xHeart + 40,
    xHeart - 40,
    xHeart,
    xHeart,
    xHeart,
    xHeart,
    xHeart,
    xHeart,
        xHeart - 20,
        xHeart - 20,
        xHeart + 20,
        xHeart + 20,
        xHeart,
    xHeart,
    xHeart,
    xHeart,
  ];
  yHearts = [
    yHeart - 10,
    yHeart - 20,
    yHeart + 20,
    yHeart - 20,
    yHeart + 20,
    yHeart,
    yHeart,
    yHeart + 50,
    yHeart + 60,
    yHeart + 60,
    yHeart + 40,
    yHeart + 40,
    yHeart + 10,
    yHeart + 30,
    yHeart + 70,
    yHeart + 90,
    yHeart + 110,
    yHeart + 130,
        yHeart,
        yHeart + 40,
        yHeart ,
        yHeart + 40,
    yHeart + 80,
    yHeart + 190,
    yHeart + 170,
    yHeart + 150,
  ];
  for (i = 0; i < xHearts.length; i++) {
    text("花", xHearts[i], yHearts[i]);
  }
}

/*
    update the content of the snakePoem by pushing the poems into the snakePoem list
*/
function updateSnakeContent() {
  //   if(score<=firstPoem.length){

  //   }
  snakePoem.push(firstPoem[score - 1]);
}

function keyPressed() {
  switch (keyCode) {
    case 65:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 68:
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case 87:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 83:
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
}
