const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const tileSize = 50;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let PosY = tileSize * 1;
let PosX = tileSize * 1;

let borderY = 0;
let borderX = 0;
let getTile = 1;

let direction = 0;

let arr = [];
let arrBasis = [];

const drawGrid = () => {
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            if (i === 0 || i === tileCountX - 1 || j === 0 || j === tileCountY - 1) {
                rectangle(
                    "#FF0080",
                    tileSize * i,
                    tileSize * j,
                    tileSize - 1,
                    tileSize - 1,
                );
                arr.push({
                    tile: {
                        X: i,
                        Y: j,
                        value: 0
                    }
                });
            } else if (i % 2 === 0 && j % 2 === 0) {
                rectangle(
                    "#FF0080",
                    tileSize * i,
                    tileSize * j,
                    tileSize - 1,
                    tileSize - 1,
                );
                arrBasis.push({
                    tile: {
                        X: i,
                        Y: j,
                        value: 1
                    }
                });
            } else {
                rectangle(
                    "#FBE000",
                    tileSize * i,
                    tileSize * j,
                    tileSize - 1,
                    tileSize - 1
                );
                arr.push({
                    tile: {
                        X: i,
                        Y: j,
                        value: 2
                    }
                });
            }
        }
    }
}

const drawInnerBorder = () => {
    const getRandomBasis = Math.floor(Math.random() * arrBasis.length);
    getDirection();
    goTop(getRandomBasis);
    console.log(arrBasis);
}

const getDirection =  () => {
    return Math.floor(Math.random() * 4);
}

const rectangle = (color, x, y, width, height) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height, tileSize - 1, tileSize - 1);
}

const goTop = (getRandomBasis) => {
    if (arrBasis[getRandomBasis].tile.Y - 1 !== 0) {
        rectangle(
            "#FF0000",
            (arrBasis[getRandomBasis].tile.X) * tileSize,
            (arrBasis[getRandomBasis].tile.Y - topDir) * tileSize,
            tileSize - 1,
            tileSize - 1,
        );
        topDir += 1;
        goTop(getRandomBasis);
    } else {
        topDir = 0;
        arrBasis.splice(getRandomBasis);
    }
}

const gameDraw = () => {
    drawGrid();
    drawInnerBorder();
}

gameDraw();