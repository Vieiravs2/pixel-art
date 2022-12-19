// Vars

const colorButton = document.getElementById('button-random-color');
const pixelsClear = document.getElementById('clear-board');
const pixelBoard = document.getElementById('pixel-board');
const input = document.getElementById('board-size');
const button = document.getElementById('generate-board');
const error = document.getElementById('mensagem-de-erro');
const matriz = document.querySelector('#pixel-board');
let boardSize = 5;

// Events

colorButton.addEventListener('click', setRandomColor);
pixelsClear.addEventListener('click', clearPixels);
pixelBoard.addEventListener('click', paintPixel);
button.addEventListener('click', changeBoard);

pixelBoard.addEventListener('click', (event) => {

    const savePixels = document.getElementsByClassName('pixel');
    const savePixelBoard = [];
    if (event.target.className.includes('pixel')) {
        for (let index = 0; index < savePixels.length; index += 1) {
            savePixelBoard.push(savePixels[index].style.backgroundColor)
            localStorage.setItem('pixelBoard', JSON.stringify(savePixelBoard))
        }
    }

});

// Code

function Onload() {
    if (localStorage.getItem('colorPalette') === null) {
        setRandomColor();
        saveColorInPalette();
        setColorSelectedInIndex0();
    } else {
        saveColorInPalette();
        setColorSelectedInIndex0();
    }

    if (localStorage.getItem('boardSize') === null) {
        generatePixels(5);
    }
    else {
        localStorageBoardSize(boardSize);
    }

    if (localStorage.getItem('pixelBoard') !== null) {
        getStorageColors();
    }
};

function getRandomColor() {
    let generateRRGGBB = '0123456789ABCDEF';
    let selectColor = '#';
    for (let i = 0; i < 6; i++) {
        selectColor += generateRRGGBB[Math.floor(Math.random() * 16)];
        if (selectColor === "#ffffff") {
            selectColor = "#32a899"
        } 
        else if (selectColor === "#000000") {
            selectColor = "#32a899"
        }
    }
    return selectColor;
};

function setColorSelectedInIndex0() {
    const classSelectedInBlackColor = document.querySelectorAll('.color')[0]
    classSelectedInBlackColor.classList.add('selected')
};

function setRandomColor() {
    let saveColors = ['#000000'];
    let paintRandomColor = document.querySelectorAll(".color");
    for (let index = 1; index < paintRandomColor.length; index += 1) {
        generatedColor = getRandomColor();
        paintRandomColor[index].style.backgroundColor = generatedColor
        saveColors.push(generatedColor)
    }
    paintRandomColor[0].style.backgroundColor = saveColors[0]
    localStorage.setItem('colorPalette', JSON.stringify(saveColors))
};

function generatePixels(size) {
    const boardSize = size;
    for (let index = 0; index < boardSize; index += 1) {
        const line = document.createElement('div')
        line.className = 'line';
        for (let index1 = 0; index1 < boardSize; index1 += 1) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.backgroundColor = 'white';
            line.appendChild(pixel)
        }
        matriz.appendChild(line)
    }
};

function changeBoard() {
    if (!input.value) {
        alert('Board inválido!');
    } else {
        removePixels();
        checkInput();
        generatePixels(input.value);
        saveBoardSize(input.value);
    }
};

function checkInput() {
    const messageError = document.getElementById('mensagem-de-erro')
    if (input.value < 5) {
        input.value = 5
        messageError.innerHTML = 'Você só pode escolher um número de 5 a 50';
        setTimeout(() => {
            messageError.innerHTML = '';
        }, 5000);
    } else if (input.value > 50) {
        input.value = 50;
        messageError.innerHTML = 'Você só pode escolher um número de 5 a 50';
        setTimeout(() => {
            messageError.innerHTML = '';
        }, 5000);
    }
};

function removePixels() {
    const line = document.getElementsByClassName('line');
    while (matriz.children.length > 0) {
        for (let index = 0; index < matriz.children.length; index += 1) {
            matriz.removeChild(line[index]);
        }
    }
};


function clearPixels() {
    const pixels = document.getElementsByClassName('pixel');
    
    for (const pixel of pixels) {
        pixel.style.backgroundColor = 'white';
        localStorage.removeItem('pixelBoard');
    }
};

function saveColorInPalette() {
    let primaryColors = document.querySelectorAll(".color");
    let pushColors = localStorage.getItem('colorPalette')
    let pushParseColors = JSON.parse(pushColors)
    console.log(pushParseColors)
    for (let x = 0; x < primaryColors.length; x++) {
        primaryColors[x].style.backgroundColor = pushParseColors[x]
    }
};

function chooseColor() {
    document.querySelectorAll('.color').forEach((element) => {
      element.addEventListener('click', (elementTarget) => {
        const selected = document.getElementsByClassName('color');
        for (let i = 0; i < selected.length; i += 1) {
          if (selected[i].className === 'color selected') {
            selected[i].className = 'color';
          }
        }
        const targetColor = elementTarget;
        targetColor.target.className += ' selected';
      });
    });
};

function paintPixel(event) {
    const pixels = document.getElementsByClassName('pixel');
    const currentColor = document.getElementsByClassName('selected');
    const currentBackgroundColor = currentColor[0].style.backgroundColor;
    if (event.target.className.includes('pixel')) {
        event.target.style.backgroundColor = currentBackgroundColor;
    }
};

function getStorageColors() {
    let pixels = document.querySelectorAll(".pixel");
    let storageColors = localStorage.getItem('pixelBoard')
    let pushStorageColors = JSON.parse(storageColors)
    for (let x = 0; x < pushStorageColors.length; x += 1) {
        pixels[x].style.backgroundColor = pushStorageColors[x];
    } 
};

function saveBoardSize(value) {
    localStorage.setItem('boardSize', JSON.stringify(value));
};

function localStorageBoardSize() {
    const localStorageBoard = JSON.parse(localStorage.getItem('boardSize'));
    const line = document.getElementsByClassName('line');
    while (matriz.children.length > 0) {
        for (let index = 0; index < matriz.children.length; index += 1) {
            matriz.removeChild(line[index]);
        }
    }
    generatePixels(localStorageBoard);
};

// Call Functions

chooseColor();

// Onload;

window.onload = () => Onload()