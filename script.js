const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick() {
    const cell = this;
    const index = cell.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        winningCells.forEach(index => {
            cells[index].classList.add("winner");
        });

        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "🤝 It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);