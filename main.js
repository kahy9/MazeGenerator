const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const tileSize = 50;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

const arr = Array.from(Array(tileCountX), () => new Array(tileCountY));
const FLOOR_COLOR = "#FBE000";
const BORDER_COLOR = "#FF0080";
const INNER_BORDER_COLOR = "#FF00FF";

const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
let direction;
let basis;
let base;

const drawGrid = () => {
  for (let i = 0; i < tileCountX; i++) {
    for (let j = 0; j < tileCountY; j++) {
      if (i === 0 || i === tileCountX - 1 || j === 0 || j === tileCountY - 1) {
        rectangle(
          BORDER_COLOR,
          tileSize * i,
          tileSize * j,
          tileSize - 1,
          tileSize - 1
        );
        arr[i][j] = 0;
      } else if (i % 2 === 0 && j % 2 === 0) {
        rectangle(
          BORDER_COLOR,
          tileSize * i,
          tileSize * j,
          tileSize - 1,
          tileSize - 1
        );
        arr[i][j] = 1;
      } else {
        rectangle(
          FLOOR_COLOR,
          tileSize * i,
          tileSize * j,
          tileSize - 1,
          tileSize - 1
        );
        arr[i][j] = 2;
      }
    }
  }
};

const drawInnerBorders = () => {
  let basisCount = getBasisCount();
  let counter = 0;
  let randomBase = getRandomBase(basisCount);
  for (let i = 0; i < tileCountX; i++) {
    for (let j = 0; j < tileCountY; j++) {
      if (arr[i][j] === 1) {
        counter += 1;
        if (counter === randomBase) {
          direction = getRandomDirection();
          switch (direction) {
            case "UP":
              goTop(i, j);
              break;
            case "DOWN":
              goDown(i, j);
              break;
            case "LEFT":
              goLeft(i, j);
              break;
            case "RIGHT":
              goRight(i, j);
              break;
            default:
              break;
          }
        }
      }
    }
  }
};

const getBasisCount = () => {
  basis = 0;
  for (let i = 0; i < tileCountX; i++) {
    for (let j = 0; j < tileCountY; j++) {
      if (arr[i][j] === 1) {
        basis += 1;
      }
    }
  }
  return basis;
};

const getRandomBase = (basisCount) => {
  base = Math.floor(Math.random() * basisCount) + 1;
  return base;
};

const getRandomDirection = () => {
  let random = Math.floor(Math.random() * 4);
  return directions[random];
};

const goTop = (i, j) => {
  if (arr[i][j] !== 0) {
    rectangle(
      INNER_BORDER_COLOR,
      tileSize * i,
      tileSize * j,
      tileSize - 1,
      tileSize - 1
    );
    arr[i][j] = 0;
    goTop(i, j - 1);
  } else {
    drawInnerBorders();
  }
};

const goDown = (i, j) => {
  if (arr[i][j] !== 0) {
    rectangle(
      INNER_BORDER_COLOR,
      tileSize * i,
      tileSize * j,
      tileSize - 1,
      tileSize - 1
    );
    arr[i][j] = 0;
    goDown(i, j + 1);
  } else {
    drawInnerBorders();
  }
};

const goLeft = (i, j) => {
  if (arr[i][j] !== 0) {
    rectangle(
      INNER_BORDER_COLOR,
      tileSize * i,
      tileSize * j,
      tileSize - 1,
      tileSize - 1
    );
    arr[i][j] = 0;
    goLeft(i - 1, j);
  } else {
    drawInnerBorders();
  }
};

const goRight = (i, j) => {
  if (arr[i][j] !== 0) {
    rectangle(
      INNER_BORDER_COLOR,
      tileSize * i,
      tileSize * j,
      tileSize - 1,
      tileSize - 1
    );
    arr[i][j] = 0;
    goRight(i + 1, j);
  } else {
    drawInnerBorders();
  }
};

const rectangle = (color, x, y, width, height) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height, tileSize - 1, tileSize - 1);
};

const gameDraw = () => {
  drawGrid();
  drawInnerBorders();
};

gameDraw();
