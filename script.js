const container = document.getElementById('container');
const blackButton = document.getElementById('black');
const rainbowButton = document.getElementById('rainbow');
const eraserButton = document.getElementById('eraser');
const resetButton = document.getElementById('reset');

let drawMode = 'black';
let isDrawing = false;

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function applyColor(square) {
    if (drawMode === 'black') {
        square.style.backgroundColor = 'black';
    } else if (drawMode === 'rainbow') {
        square.style.backgroundColor = getRandomColor();
    } else if (drawMode === 'eraser') {
        square.style.backgroundColor = 'white';
    }
}

function createGrid(n) {
    // Clear existing grid
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Create n rows
    for (let i = 0; i < n; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        // Create n squares in each row
        for (let j = 0; j < n; j++) {
            const square = document.createElement('div');
            square.classList.add('square');

            square.addEventListener('mousedown', (e) => {
                e.preventDefault();
                applyColor(square);
                isDrawing = true;
            });

            square.addEventListener('mouseover', () => {
                if (isDrawing) {
                    applyColor(square);
                }
            });

            row.appendChild(square);
        }
    }
}

// Initial 16x16 grid
createGrid(16);

// Function to set the active button
function setActiveButton(activeButton) {
    const modeButtons = document.querySelectorAll('.mode-button');
    modeButtons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

// Button event listeners
blackButton.addEventListener('click', () => {
    drawMode = 'black';
    setActiveButton(blackButton);
});

rainbowButton.addEventListener('click', () => {
    drawMode = 'rainbow';
    setActiveButton(rainbowButton);
});

eraserButton.addEventListener('click', () => {
    drawMode = 'eraser';
    setActiveButton(eraserButton);
});

resetButton.addEventListener('click', () => {
    let n = prompt('Enter the number of squares per side (max 100):');
    n = parseInt(n);
    if (isNaN(n) || n < 1 || n > 100) {
        alert('Please enter a valid number between 1 and 100.');
    } else {
        createGrid(n);
    }
});

// Stop drawing on mouseup
document.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Set initial mode to black and highlight the "Black" button
setActiveButton(blackButton);