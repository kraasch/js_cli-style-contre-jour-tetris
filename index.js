
/***********************************
 *           TO-DOS                *
 ***********************************/

/* My to-do list:
 * - [ ] modularize for the use in other JS projects.
 * - [ ] implement shape selection screen (select shapes for next phase).
 * - [ ] allow to toggle preview of next tetromino (V key).
 * - [ ] implement level system (associate score ranges with levels, levels with shapes, speeds, sizes).
 * - [ ] play animation when resizing screen mid game.
 * - [ ] improve speed-up animation.
 * - [ ] improve row-deletion animation.
 */

/* My maybe list:
 * - [ ] implement a info view (I key).
 * - [ ] implement highscore board.
 * - [ ] implement a random settings feature (resulting in different games, parameters: types of bricks, size of game, etc)
 */

/* My done list:
 * - [X] allow to speed up down (space key).
 * - [X] remove full rows (eg from bottom).
 * - [X] allow to move left & righ (left/right key).
 * - [X] implement a scrore.
 * - [X] count score in binary at the game border.
 * - [X] allow to turn CW and CCW (up/down key).
 */

/***********************************
 *            UTILITIES            *
 ***********************************/

function alertArray(arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      let cell = arr[i][j];
      if (cell == '' || cell == null) {
        cell = '_';
      }
      str = str + ' ' + cell;
    }
    str = str + '\n';
  }
  alert(str);
}

function resetArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      arr[i][j] = '';
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/***********************************
 *            CONSTANTS            *
 ***********************************/

const BLACK = "#000";
const WHITE = "#fff";
const GRAY = "#777";
const LGRAY = "#aaa";
const DGRAY = "#555";
const RED = "#f00";
const GREEN = "#0f0";
const BLUE = "#00f";

const PRIMARY_COL = GREEN;
const SECONDARY_COL = DGRAY;
const BACKGROUND_COLOR = BLACK;
const SCREEN_COLOR = GRAY;
const TRACE_COLOR = LGRAY;

const SCORE_COLOR = PRIMARY_COL;
const PAUSE_COLOR_A = BACKGROUND_COLOR;
const PAUSE_COLOR_B = TRACE_COLOR;
const OVERLAY_COLOR_A = BACKGROUND_COLOR;
const OVERLAY_COLOR_B = SECONDARY_COL;
const ROW_DEL_COLOR_A = BACKGROUND_COLOR;
const ROW_DEL_COLOR_B = SCREEN_COLOR;
const STOPPED_COLOR = BACKGROUND_COLOR;
const FOREGROUND_COLOR = PRIMARY_COL;

const CLASSIC_W = 10;
const CLASSIC_H = 20;
const MY_W = 8;
const MY_H = 12;
const DEBUG_W = 11;
const DEBUG_H = 20;

/* BEGIN CUSTOMIZABLE */
const FPS = 2; // Frames per second.
const END_ANIM_FACTOR = 20;
const CHUNK_NUM_W = DEBUG_W;
const CHUNK_NUM_H = DEBUG_H;
// const CHUNK_NUM_W  = MY_W;
// const CHUNK_NUM_H  = MY_H;
/* END CUSTOMIZABLE */

const CHUNKLET_SIZE = 0.3;
const MAX_SCORE = Math.pow(2, CHUNK_NUM_W) - 1;
const STEPS_AROUND = 2 * CHUNK_NUM_H + CHUNK_NUM_W + 4;
const NORMAL_SIZE = MY_W * MY_H;
const REFRESH_MS = 1000 / FPS; // Refresh rate in milliseconds.
const NORMAL_SPEED = REFRESH_MS / END_ANIM_FACTOR;
const CURRENT_SIZE = CHUNK_NUM_W * CHUNK_NUM_H;
const END_ANIM_SPEED = NORMAL_SIZE / CURRENT_SIZE * NORMAL_SPEED;
const SPEED_UP_SPEED = 33;
const BLINK_SPEED = 1000;
const ROW_DEL_SPEED = 100;
const ROW_DEL_AMOUNT = 4;

const KEY =
{
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
  I: 73,
  P: 80,
  R: 82,
  S: 83,
  V: 86,
};

const BIT =
  [
    [
      [1],
    ],
  ];

const TINY =
  [
    [
      [1],
    ],
    [
      [1, 1],
    ],
    [
      [1, 0],
      [0, 1],
    ],
    [
      [1, 1],
      [0, 1],
    ],
  ];

const SPACE =
  [
    [
      [0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [1, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 0, 1],
      [0, 0, 1, 1, 1, 1, 0, 1],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 1],
      [0, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0],
    ],
  ];

const DEBUG =
  [
    [
      [1, 1, 1],
      [1, 0, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 1],
    ],
  ];

const DEBUG2 =
  [
    [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ],
    [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ],
    [
      [1, 1, 1, 1],
    ],
  ];

const SPECIAL =
  [
    [ // . shape:
      [1],
    ],
    [ // 1 shape:
      [1, 1],
    ],
    [ // i shape:
      [1, 1, 1],
    ],
    [ // .. shape:
      [1, 0, 1],
    ],
    [ // !i shape:
      [0, 0, 1],
      [1, 0, 0],
    ],
    [ // i! shape:
      [1, 0, 0],
      [0, 0, 1],
    ],
    [ // 11 shape:
      [1, 0, 1],
      [1, 0, 1],
    ],
    [ // H shape:
      [1, 1, 1],
      [1, 1, 1],
    ],
    [ // C shape:
      [1, 0, 1],
      [1, 1, 1],
    ],
    [ // b shape:
      [1, 1, 1],
      [1, 1, 0],
    ],
    [ // d shape:
      [1, 1, 0],
      [1, 1, 1],
    ],
    [ // v shape:
      [1, 0, 1],
      [0, 1, 0],
    ],
  ];

const CLASSIC =
  [
    [ // O shape:
      [1, 1],
      [1, 1],
    ],
    [ // I shape:
      [1, 1, 1, 1],
    ],
    [ // T shape:
      [1, 1, 1],
      [0, 1, 0],
    ],
    [ // L shape:
      [0, 0, 1],
      [1, 1, 1],
    ],
    [ // J shape:
      [1, 1, 1],
      [0, 0, 1],
    ],
    [ // S shape:
      [0, 1, 1],
      [1, 1, 0],
    ],
    [ // Z shape:
      [1, 1, 0],
      [0, 1, 1],
    ],
  ];

const TSHAPES = [... new Set([
  ...SPECIAL,
  ...CLASSIC,
  ...TINY,
])];

const TEXTS = {
  PAUSE:
    [
      [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1,],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1,],
      [0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,],
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1,],
      [0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0,],
    ],
}

/***********************************
 *         SETUP VARIABLES         *
 ***********************************/

// create a canvas in the size of the the screen.
let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;
let canvas = document.getElementById('canvas');
canvas.width = maxWidth;
canvas.height = maxHeight;
let ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// set up window.
document.body.style.background = BACKGROUND_COLOR; // set background color to black.
document.body.style.overflow = 'hidden'; // remove scroll bars from right and bottom window side.

// init game data.
let data = null;
let back = null;
let game = null;
let endAnimation = null;
let scoreAnimation = null;
let speedupAnimation = null;
let blinkingAnimation = null;
let delteRowsAnimation = null;
let lastScoreRows = [];

let isOnPause = false;
let wasInvaded = false;
let isAnimatingGameOver = false;
let isAnimatingSpeed = false;
let isWonAnimationOn = false;

let score = 0;
let scoreAnimationStep = 0;
let lastScoreX = -1;
let lastScoreY = -1;
let rowDelteAnimationProgress = 0;

ctx.fillStyle = BACKGROUND_COLOR;
ctx.fillRect(0, 0, 500, 500);

let blinker = {
  isOn: true,
  layer: [],
  colorA: BLACK,
  colorB: WHITE,
};

/***********************************
 *     SETUP SCREEN DIMENSIONS     *
 ***********************************/

function calculateFrame() {
  // TODO & FIXME: make independent from the screen size of the user (especially for really wide or tall screen).
  // divide screen size into factions.
  let numberOfFactions = 4; // an nth of the screen's width.
  let screenFraction = maxWidth / numberOfFactions;
  let chunkSize = Math.floor(screenFraction / CHUNK_NUM_W)
  // derive dimensions.
  let dimWidth = Math.floor(chunkSize * CHUNK_NUM_W);
  let dimHeight = Math.floor(chunkSize * CHUNK_NUM_H);
  let dimTop = Math.floor(0.5 * maxHeight - 0.5 * dimHeight); // center on screen's x-axis.
  let dimLeft = Math.floor(0.5 * maxWidth - 0.5 * dimWidth);  // center on screen's y-axis.
  return [chunkSize, dimWidth, dimHeight, dimLeft, dimTop];
}

let dims = calculateFrame();
let chunkSize = dims[0];
let screenWidth = dims[1];
let screenHeight = dims[2];
let screenLeft = dims[3];
let screenTop = dims[4];

const insertLeft = screenLeft - chunkSize;
const insertRight = screenLeft + screenWidth;
const chunklet = chunkSize * CHUNKLET_SIZE;
const offset = (chunkSize - chunklet) / 2;

// array for moving and stopped objects.
let overlay = Array.from(Array(CHUNK_NUM_W), () => new Array(CHUNK_NUM_H));
let rowOverlay = Array.from(Array(CHUNK_NUM_W), () => new Array(CHUNK_NUM_H));
let trace = Array.from(Array(CHUNK_NUM_W), () => new Array(CHUNK_NUM_H));
let moving = Array.from(Array(CHUNK_NUM_W), () => new Array(CHUNK_NUM_H));
let stopped = Array.from(Array(CHUNK_NUM_W), () => new Array(CHUNK_NUM_H));
let lastDrawnMoving = Array.from(Array(CHUNK_NUM_W), () => new Array(CHUNK_NUM_H));
resetArr(overlay);
resetArr(rowOverlay);
resetArr(trace);
resetArr(moving);
resetArr(stopped);
resetArr(lastDrawnMoving);

/***********************************
 *            INIT ARRAYS          *
 ***********************************/

function convertArrToShape(arr) {
  let sameSizeArr = Array.from(Array(arr.length), () => new Array(arr[0].length));
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] == 'x') {
        sameSizeArr[i][j] = 0;
      } else {
        sameSizeArr[i][j] = 1;
      }
    }
  }
  return sameSizeArr;
}

function invertArr(arr) {
  let sameSizeArr = Array.from(Array(arr.length), () => new Array(arr[0].length));
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] == 'x') {
        sameSizeArr[i][j] = '';
      } else {
        sameSizeArr[i][j] = 'x';
      }
    }
  }
  return sameSizeArr;
}

function insertShapeIntoArr(arrInner, arrOuter, upperMargin) {
  let fitsHorizontally = arrInner[0].length <= arrOuter[0].length;
  let fitsVertically = arrInner.length <= arrOuter.length;
  if (fitsVertically && fitsHorizontally) {
    copyShapeIntoArr(arrInner, arrOuter, upperMargin);
  }
}

insertShapeIntoArr(TEXTS.PAUSE, overlay, 2);

/***********************************
 *            ANIMATION CODE       *
 ***********************************/

// TODO: pull out animation code.
// TODO: create an event queue for all animations and keyboard inputs.

/***********************************
 *            SETUP GAME           *
 ***********************************/

function fillBackgroundColor(context, color, x, y, w, h) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function detectCollision(moved, moving, stopped) {
  let isArrCollision = detectArrayCollision(moved, stopped);
  let isBottomCollision = detectBottomCollision(moving)
  return isArrCollision || isBottomCollision;
}

function detectBottomCollision(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][arr[0].length - 1] == 'x') {
      return true;
    }
  }
  return false;
}

function detectArrayCollision(arrA, arrB) {
  for (let i = 0; i < arrA.length; i++) {
    for (let j = 0; j < arrA[0].length; j++) {
      if (arrA[i][j] == 'x' && arrB[i][j] == 'x') {
        return true;
      }
    }
  }
  return false;
}

function drawArray(arr, color) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] == 'x') {
        ctx.fillStyle = color;
        ctx.fillRect(screenLeft + chunkSize * i, screenTop + chunkSize * j, chunkSize, chunkSize);
      }
    }
  }
}

function copyArray(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function stepRightArray(arr) {
  for (let i = arr.length - 1; i >= 1; i--) {
    for (let j = 0; j < arr[0].length; j++) {
      arr[i][j] = arr[i - 1][j];
    }
  }
  for (let j = 0; j < arr[0].length; j++) {
    arr[0][j] = '';
  }
  return arr;
}

function stepLeftArray(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      arr[i][j] = arr[i + 1][j];
    }
  }
  for (let j = 0; j < arr[arr.length - 1].length; j++) {
    arr[arr.length - 1][j] = '';
  }
  return arr;
}

function stepDownArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = arr[0].length - 1; j >= 1; j--) {
      arr[i][j] = arr[i][j - 1];
    }
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i][0] = '';
  }
  return arr;
}

function copyOver(arrFrom, arrTo) {
  for (let i = 0; i < arrFrom.length; i++) {
    for (let j = 0; j < arrTo[0].length; j++) {
      if (arrFrom[i][j] == 'x') {
        arrTo[i][j] = 'x';
      }
    }
  }
}

function copyShapeIntoArr(shape, arr, topOffset) {
  let isShapeAndOffsetFitIntoArr = topOffset + shape[0].length <= arr[0].length;
  if (isShapeAndOffsetFitIntoArr) {
    // calculate the approximat middle of screen (two rounding errors).
    let shapeLen = shape.length;
    let arrLen = arr.length;
    let insertY = Math.floor(arrLen / 2 - shapeLen / 2);
    // insert the shape into the array:
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        if (shape[i][j] == 1) {
          arr[i + insertY][j + topOffset] = 'x';
        }
      }
    }
  }
}


function generateNewShape() {
  if (score >= 42 && !wasInvaded) {
    wasInvaded = true;
    return SPACE[0];
  } else {
    // take any shape from TSHAPES array.
    let randomIndex = Math.floor(Math.random() * TSHAPES.length);
    let shape = TSHAPES[randomIndex];
    return shape;
  }
}

function insertNewShape() {
  let shape = generateNewShape();
  let topOffset = 0;
  copyShapeIntoArr(shape, moving, topOffset);
}

function gameWonAnimation() {
  if (isWonAnimationOn) {
    isWonAnimationOn = false;
    printScore(score);
  } else {
    isWonAnimationOn = true;
    wipeScore();
  }
}

function gameOverAnimation() {
  // TODO: black out the screen in a make wirl animation.
  // small game-over animation.
  for (let i = 0; i < stopped.length; i++) {
    for (let j = 0; j < stopped[0].length; j++) {
      if (stopped[i][j] != 'x') {
        stopped[i][j] = 'x';
        drawArray(stopped, BACKGROUND_COLOR); // draw background.
        return;
      }
    }
  }
  resetGame();
}

function printGameOver() {
  if (hasNoActiveFlags()) {
    isAnimatingGameOver = true;
    clearInterval(game);
    endAnimation = setInterval(gameOverAnimation, END_ANIM_SPEED); // dispatch game over animation.
  }
}

function endGame() {
  clearInterval(game);
  clearInterval(endAnimation);
  wonAnimation = setInterval(gameWonAnimation, 400);
}

function resetGame() {
  clearInterval(endAnimation);
  isAnimatingGameOver = false;
  resetArr(stopped);
  resetArr(moving);
  insertNewShape();
  printScore(0);
  game = setInterval(updateGame, REFRESH_MS);
}

function getFullRows(arr) {
  let rows = [];
  for (let j = 0; j < arr[0].length; j++) {
    let countXs = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][j] == 'x') {
        countXs++;
      }
    }
    if (countXs == arr.length) {
      rows.push(j);
    }
  }
  return rows;
}

function removeAndFillRowsFromArray(rowIndexes, arr) {
  for (const index of rowIndexes) {
    for (let j = index; j >= 1; j--) {
      for (let i = 0; i < arr.length; i++) {
        arr[i][j] = arr[i][j - 1];
      }
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i][0] = '';
    }
  }
}

function doRestart() {
  printGameOver();
}

function wipeScore() {
  let chunklet = chunkSize * CHUNKLET_SIZE;
  let offset = (chunkSize - chunklet) / 2;
  let rightSide = screenLeft + screenWidth - chunkSize;
  let i = 0;
  while (i < CHUNK_NUM_W) {
    ctx.fillStyle = BACKGROUND_COLOR;
    let x = rightSide - chunkSize * i;
    let y = screenTop - chunkSize;
    ctx.fillRect(x + offset, y + offset, chunklet, chunklet);
    i++;
  }
}

function printScore(num) {
  // convert num to binary and print on upper game screen border.
  let chunklet = chunkSize * CHUNKLET_SIZE;
  let offset = (chunkSize - chunklet) / 2;
  let rightSide = screenLeft + screenWidth - chunkSize;
  let i = 0;
  while (num > 0) {
    let rest = num % 2;
    num = Math.floor(num / 2);
    if (rest) {
      ctx.fillStyle = SCORE_COLOR;
    } else {
      ctx.fillStyle = SCREEN_COLOR;
    }
    let x = rightSide - chunkSize * i;
    let y = screenTop - chunkSize;
    ctx.fillRect(x + offset, y + offset, chunklet, chunklet);
    i++;
  }
}

function removeLastScoreAnimationBit() {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(lastScoreX + offset, lastScoreY + offset, chunklet, chunklet);
}

function setLastScoreBitLocation(x, y) {
  lastScoreX = x;
  lastScoreY = y;
}

function animateScore() {
  if (scoreAnimationStep < STEPS_AROUND) {
    removeLastScoreAnimationBit();
    ctx.fillStyle = GREEN;
    if (scoreAnimationStep <= CHUNK_NUM_H + 1) {
      // is on left side.
      let x = insertLeft;
      let y = (screenTop - chunkSize) + scoreAnimationStep * chunkSize;
      ctx.fillRect(x + offset, y + offset, chunklet, chunklet);
      setLastScoreBitLocation(x, y);
    } else if (scoreAnimationStep <= CHUNK_NUM_H + 1 + CHUNK_NUM_W) {
      // is on bottom side.
      let x = insertLeft + (scoreAnimationStep - CHUNK_NUM_H - 1) * chunkSize;
      let y = screenTop + screenHeight;
      ctx.fillRect(x + offset, y + offset, chunklet, chunklet);
      setLastScoreBitLocation(x, y);
    } else {
      // is on right side.
      let x = insertRight;
      let y = (screenTop + screenHeight) - (scoreAnimationStep - CHUNK_NUM_H - CHUNK_NUM_W - 2) * chunkSize;
      ctx.fillRect(x + offset, y + offset, chunklet, chunklet);
      setLastScoreBitLocation(x, y);
    }
    scoreAnimationStep++;
    return;
  } else {
    removeLastScoreAnimationBit();
    printScore(score);
    clearInterval(scoreAnimation);
  }
}

function doScore(indexes) {
  // TODO: give bonus for scoring multiple lines at once.
  let count = indexes.length;
  tempScore = score + count;
  if (tempScore > MAX_SCORE) {
    score = MAX_SCORE;
    printScore(score);
    endGame();
  } else {
    score = tempScore;
    // start animation.
    lastScoreX = -1;
    lastScoreY = -1;
    scoreAnimationStep = 0;
    scoreAnimation = setInterval(animateScore, REFRESH_MS / 10);
  }
}

function makeTestStep() {
  let copy = copyArray(moving);
  let moved = stepDownArray(copy);
  return detectCollision(moved, moving, stopped);
}

function finishFall() {
  copyOver(moving, stopped);
  resetArr(moving);
}

function doInitialCollisionCheck() {
  // check for collision immediately after start.
  let isCollide2 = detectArrayCollision(moving, stopped);
  if (isCollide2) {
    doRestart();
  }
}

function deleteRows() {
  if (rowDelteAnimationProgress < ROW_DEL_AMOUNT) {
    blink();
    rowDelteAnimationProgress++;
  } else {
    resetArr(rowOverlay);
    rowDelteAnimationProgress = 0;
    clearInterval(delteRowsAnimation);
    doScore(lastScoreRows);
    removeAndFillRowsFromArray(lastScoreRows, stopped);
    game = setInterval(updateGame, REFRESH_MS);
  }
}

function makeFullRowOverlay(rows) {
  let rowShape = [];
  for (let i = 0; i < rowOverlay.length; i++) {
    rowShape.push([1]);
  }
  for (row of rows) {
    insertShapeIntoArr(rowShape, rowOverlay, row);
  }
  return rowOverlay;
}

function playDeleteRowAnimation() {
  clearInterval(game)
  blinker.layer = makeFullRowOverlay(lastScoreRows);
  blinker.colorA = ROW_DEL_COLOR_A;
  blinker.colorB = ROW_DEL_COLOR_B;
  delteRowsAnimation = setInterval(deleteRows, ROW_DEL_SPEED);
}

function doScoringCheck() {
  // check for scoring condition.
  let fullRowIndexes = getFullRows(stopped);
  let len = fullRowIndexes.length;
  if (len > 0) {
    lastScoreRows = getFullRows(stopped);
    playDeleteRowAnimation();
  }
}

function runEndOfTurnChecks() {
  doInitialCollisionCheck();
  doScoringCheck();
}

function renderScreen() {
  ctx.putImageData(data, screenLeft, screenTop); // add background.
  drawArray(trace, TRACE_COLOR);      // draw trace animation.
  drawArray(moving, FOREGROUND_COLOR); // draw foreground.
  drawArray(stopped, STOPPED_COLOR);    // draw stopped objects.
  resetArr(lastDrawnMoving);
  lastDrawnMoving = copyArray(moving);
}

function updateGame() { // main game loop.
  renderScreen();
  // create an array simulating one step ahead.
  let isCollide = makeTestStep();
  if (isCollide) {
    isCollide = false;
    finishFall();
    insertNewShape();
    runEndOfTurnChecks();
  } else {
    stepDownArray(moving);
  }
}

function blink() {
  if (blinker.isOn) {
    blinker.isOn = false;
    drawArray(blinker.layer, blinker.colorA);
  } else {
    blinker.isOn = true;
    drawArray(blinker.layer, blinker.colorB);
  }
}

function finishBlink() {
  clearInterval(blinkingAnimation);
}

function startBlink(arr, colorA, colorB) {
  blinker.isOn = true; // Start blinker with colorA every time.
  blinker.layer = arr;
  blinker.colorA = colorA;
  blinker.colorB = colorB;
  blinkingAnimation = setInterval(blink, BLINK_SPEED);
}

function makePauseScreen() {
  let arrInner = TEXTS.PAUSE;
  let arrOuter = overlay;
  let fitsHorizontally = arrInner[0].length <= arrOuter[0].length;
  let fitsVertically = arrInner.length <= arrOuter.length;
  if (fitsVertically && fitsHorizontally) {
    startBlink(overlay, PAUSE_COLOR_A, PAUSE_COLOR_B);
  } else {
    resetArr(overlay);
    let invertedArr = invertArr(lastDrawnMoving);
    let invertedShape = convertArrToShape(invertedArr);
    copyShapeIntoArr(invertedShape, overlay, 0);
    startBlink(overlay, PAUSE_COLOR_A, PAUSE_COLOR_B);
  }
}

function hasNoActiveFlags() {
  return !isAnimatingGameOver && !isAnimatingSpeed;
}

function togglePause() {
  // do not allow to PAUSE game during other animations.
  if (hasNoActiveFlags()) {
    if (isOnPause) {
      isOnPause = false;
      finishBlink();
      game = setInterval(updateGame, REFRESH_MS);
    } else {
      isOnPause = true;
      makePauseScreen();
      clearInterval(game);
    }
  }
}

function checkIfColumnIsFree(index, arr) {
  let isFree = true;
  for (let i = 0; i < arr[index].length; i++) {
    if (arr[index][i] == 'x') {
      isFree = false;
      break;
    }
  }
  return isFree;
}

function moveLeftRight(isMoveLeft) {
  if (!isOnPause) {
    let isFreeAtSideToMoveTo = false;
    let copy = null;
    let moved = null;
    if (isMoveLeft) {
      isFreeAtSideToMoveTo = checkIfColumnIsFree(0, moving);
      copy = copyArray(moving);
      moved = stepLeftArray(copy);
      moved = stepLeftArray(copyArray(moving));
    } else {
      isFreeAtSideToMoveTo = checkIfColumnIsFree(moving.length - 1, moving);
      moved = stepRightArray(copyArray(moving));
    }
    let isCollision = detectArrayCollision(moved, stopped);
    if (isFreeAtSideToMoveTo && !isCollision) {
      moving = moved;
    }
  }
}

function checkFromLeft(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] == 'x') {
        return i;
      }
    }
  }
  return -1;
}

function checkFromRight(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] == 'x') {
        return i;
      }
    }
  }
  return -1;
}

function checkFromTop(arr) {
  for (let j = 0; j < arr[0].length; j++) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][j] == 'x') {
        return j;
      }
    }
  }
  return -1;
}

function checkFromBottom(arr) {
  for (let j = arr[0].length - 1; j >= 0; j--) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][j] == 'x') {
        return j;
      }
    }
  }
  return -1;
}

function turnRight(arr, il, ir, it, ib) {
  let copy = copyArray(arr);
  resetArr(copy);
  for (let i = il; i <= ir; i++) {
    for (let j = it; j <= ib; j++) {
      let k = i - il;
      let l = j - it;
      // START ..................... // TODO: refactor.
      let wLen = ir - il;
      let nk = wLen - l;
      let nl = k;
      // END__ .....................
      let ni = nk + il;
      let nj = nl + it;
      copy[ni][nj] = arr[i][j];
    }
  }
  return copy;
}

function turnLeft(arr, il, ir, it, ib) {
  let copy = copyArray(arr);
  resetArr(copy);
  for (let i = il; i <= ir; i++) {
    for (let j = it; j <= ib; j++) {
      let k = i - il;
      let l = j - it;
      // START ..................... // TODO: refactor.
      let hLen = ib - it;
      let nk = l;
      let nl = hLen - k;
      // END__ .....................
      let ni = nk + il;
      let nj = nl + it;
      copy[ni][nj] = arr[i][j];
    }
  }
  return copy;
}

function turnLeftRight(isTurnLeft, arr) {
  // check for first object part from all four sides.
  let iLeft = checkFromLeft(arr);
  let iRight = checkFromRight(arr);
  let iTop = checkFromTop(arr);
  let iBot = checkFromBottom(arr);
  if (iLeft != -1 && iRight != -1 && iTop != -1 && iBot != -1) {
    // adjust left/right/top/bottom for asymetric shapes.
    let wDif = iRight - iLeft + 1;
    let hDif = iBot - iTop + 1;
    if (hDif > wDif) {
      let halfOtherDimension = hDif / 2 - 1;
      iLeft = Math.ceil(iLeft - halfOtherDimension);
      iRight = Math.ceil(iRight + halfOtherDimension);
    } else if (wDif > hDif) {
      let halfOtherDimension = wDif / 2 - 1;
      iTop = Math.ceil(iTop - halfOtherDimension);
      iBot = Math.ceil(iBot + halfOtherDimension);
    } else {
      // wDif == hDif means shape is symmetric, therefore nothing to do.
    }
    // check if turning boundries are within game field.
    let isWithinLeft = iLeft >= 0;
    let isWithinRight = iRight < arr.length;
    let isWithinTop = iTop >= 0;
    let isWithinBot = iBot < arr[0].length;
    let isWithin = isWithinLeft && isWithinRight && isWithinTop && isWithinBot;
    if (isWithin) {
      // turn object within array and check if turned array overlaps with background, if so: do not turn.
      let newArr = null;
      if (isTurnLeft) {
        newArr = turnLeft(arr, iLeft, iRight, iTop, iBot);
      } else {
        newArr = turnRight(arr, iLeft, iRight, iTop, iBot);
      }
      let isCollide = detectArrayCollision(newArr, stopped);
      if (!isCollide) {
        return newArr;
      }
    }
  }
  return arr;
}

function printInfo() {
  // TODO: implement.
}

function isNullArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      let cell = arr[i][j];
      if (cell) {
        return false;
      }
    }
  }
  return true;
}

function animateSpeed() {
  copyOver(moving, trace);
  let isCollide = makeTestStep();
  if (!isCollide) {
    stepDownArray(moving);
    copyOver(moving, trace);
    renderScreen();
  } else {
    finishSpeedUp();
  }
}

function speedUp() {
  if (hasNoActiveFlags()) {
    let forgroundHasObj = !isNullArray(moving);
    if (forgroundHasObj && !isOnPause) {
      isAnimatingSpeed = true;
      clearInterval(game);
      speedupAnimation = setInterval(animateSpeed, SPEED_UP_SPEED);
    }
  }
}

function finishSpeedUp() {
  clearInterval(speedupAnimation);
  finishFall();
  resetArr(trace);
  resetArr(moving);
  renderScreen();
  game = setInterval(updateGame, REFRESH_MS);
  isAnimatingSpeed = false;
  insertNewShape();
  runEndOfTurnChecks();
}

function togglePreview() {
  // TODO: implement.
}

/***********************************
 *           DEFINE KEYS           *
 ***********************************/

function handlePKey() {
  togglePause();
}

function handleUpKey() {
  moving = turnLeftRight(0, moving);
}

function handleDownKey() {
  moving = turnLeftRight(1, moving);
}

function handleLeftKey() {
  moveLeftRight(1);
}

function handleRightKey() {
  moveLeftRight(0);
}

function handleIKey() {
  printInfo();
}

function handleSKey() {
  speedUp();
}

function handleVKey() {
  togglePreview();
}

function handleRKey() {
  doRestart();
}

function handleSpaceKey() {
  speedUp();
}

function handleKeyEvent(ev) {
  const keyCode = ev.which || ev.keyCode;
  switch (keyCode) {
    case KEY.H:
      handleLeftKey();
      break;
    case KEY.J:
      handleDownKey();
      break;
    case KEY.K:
      handleUpKey();
      break;
    case KEY.L:
      handleRightKey();
      break;
    case KEY.UP:
      handleUpKey();
      break;
    case KEY.DOWN:
      handleDownKey();
      break;
    case KEY.LEFT:
      handleLeftKey();
      break;
    case KEY.RIGHT:
      handleRightKey();
      break;
    case KEY.S:
      handleSKey();
      break;
    case KEY.V:
      handleVKey();
      break;
    case KEY.P:
      handlePKey();
      break;
    case KEY.R:
      handleRKey();
      break;
    case KEY.I:
      handleIKey();
      break;
    case KEY.SPACE:
      handleSpaceKey();
      break;
  }
}


/***********************************
 *            CALL FUNCTIONS       *
 ***********************************/

// Paint background and create a copy.
fillBackgroundColor(ctx, GRAY, screenLeft, screenTop, screenWidth, screenHeight); // Paint background.
back = ctx.getImageData(screenLeft, screenTop, screenWidth, screenHeight); // Create copy.
data = back;

// Dispatch main game loop.
insertNewShape();
game = setInterval(updateGame, REFRESH_MS);

// TODO: conditionally un-pause the game as soon as first focus comes in.
togglePause();

