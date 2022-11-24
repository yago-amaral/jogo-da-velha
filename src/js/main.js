const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartButton = document.querySelector(".restartButton");

const victoryConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClickHandler));
    restartButton.addEventListener("click", restartGame);
    running = true;
    statusText.textContent = `Vez do ${currentPlayer}`;
}

function cellClickHandler() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) return;

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.textContent = `Vez do ${currentPlayer}`;
}

function checkWinner() {
    let roundWon = false;

    victoryConditions.forEach(condition => {
        const cell1 = options[condition[0]];
        const cell2 = options[condition[1]];
        const cell3 = options[condition[2]];

        if (cell1 == "" || cell2 == "" || cell3 == "")
            return;

        if (cell1 == cell2 && cell2 == cell3)
            roundWon = true;
    });

    if (roundWon) {
        statusText.textContent = `${currentPlayer} venceu!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "Empate!";
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    statusText.textContent = `Vez do ${currentPlayer}`;
    options = options.map(() => "");
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
