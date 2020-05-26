let size = 50;
let draw = true;
let mode = 'Hover';
let brush = 'default';
let hslCounter = 0;


const grid = document.querySelector(".grid");

const sizeInput = document.querySelector('.input-grid');

const resizeBtn = document.querySelector('.btn-reset');
resizeBtn.addEventListener('click',resizeGrid)

const clearBtn = document.querySelector('.btn-clear');
clearBtn.addEventListener('click', clearDrawing);
document.querySelector("html").addEventListener('mouseup', disableDraw);

const modeBtn = document.querySelector('.btn-mode');
modeBtn.addEventListener('click', changeMode);

const eraserBtn = document.querySelector('.btn-eraser');
const rainbowBtn = document.querySelector('.btn-rainbow');
const randomBtn = document.querySelector('.btn-random');
eraserBtn.addEventListener('click',changeBrush);
rainbowBtn.addEventListener('click',changeBrush);
randomBtn.addEventListener('click',changeBrush);

createGrid(size);

function changeBrush(e){
    newBrush = e.target.textContent.toLowerCase();
    eraserBtn.classList.remove('btn-eraser-clicked');
    rainbowBtn.classList.remove('btn-rainbow-clicked');
    randomBtn.classList.remove('btn-random-clicked');
    if(brush===newBrush){
        brush = 'default';
        return;
    }
    brush = newBrush;
    e.target.classList.add(`btn-${brush}-clicked`);
}

function createGrid(size) {

    let numPixels = size * size
    let pixelLength = (getComputedStyle(grid).minWidth.replace('px', '') / size) + 'px';

    while (numPixels) {
        const pixel = document.createElement('div');
        pixel.style.width = pixelLength;
        pixel.style.height = pixelLength;
        pixel.style.backgroundColor = 'transparent';
        pixel.classList.add('pixel');
        grid.appendChild(pixel);
        pixel.addEventListener('mouseover', drawPixel);
        pixel.addEventListener('mousedown', enableDraw)
        pixel.addEventListener('mousedown', drawPixel);
        numPixels--;
    }
}

function resizeGrid(){
    size = sizeInput.value;
    if (size > 200) {
        size = 200;
    } else if (size < 1) {
        size = 1;
    } else if (size === ""){
        size = 50;
    }
    clearGrid();
    createGrid(size);
}

function drawPixel(e) {
    if (!draw) return;
    let color = getColor();
    e.target.style.backgroundColor = color;
}

function getColor() {
    if (brush === 'default') {
        return 'rgb(56, 56, 56)';
    } else if (brush === 'eraser') {
        return 'transparent';
    } else if (brush === 'rainbow') {
        let color = `hsl(${hslCounter},100%,50%)`;
        if (hslCounter === 360) {
            hslCounter = 0;
        } else {
            hslCounter += 10;
        }
        return color;
    } else if (brush === 'random') {
        return `hsl(${Math.random() * 360}, ${Math.random() * (100 - 85) + 85}%, ${Math.random() * (65 - 35) + 35}%)`;
    }
}

function changeMode(e) {
    if (mode === 'Hover') {
        mode = 'Click';
        draw = false;
    } else {
        mode = 'Hover';
        draw = true;
    }
    e.target.textContent = `On ${mode}`;
}

function enableDraw() {
    if(mode==='Click'){
        draw = true;
    }
}

function disableDraw() {
    if(mode==='Click'){
        draw = false;
    }
}

function clearDrawing() {
    Array.from(document.querySelectorAll('.pixel')).forEach(pixel => pixel.style.backgroundColor = 'transparent');
}

function clearGrid() {
    Array.from(document.querySelectorAll('.pixel')).forEach(pixel => grid.removeChild(pixel));
}