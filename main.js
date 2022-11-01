const cols = document.querySelectorAll(".col");
const allcoins = document.querySelectorAll(".coin");
const hoverCoin = document.querySelectorAll('.hover-coin');
const h2 = document.querySelector("h2");
const allP = document.querySelectorAll("p");
const allButtons = document.querySelectorAll(".container button");
const allInputs = document.querySelectorAll("input");
let resetButton = document.querySelector("body>button");

resetButton.onclick = () => {
    reset(0);
}

for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].onclick = () => {
        if (allInputs[i].value.length > 0) {
            allButtons[i].parentElement.querySelector("h3").innerText = allInputs[i].value;
            allInputs[i].remove();
            allButtons[i].remove();
        }
    }

    allInputs[i].onkeypress = () => {
        if (event.key === "Enter") {
            event.preventDefault();
            allButtons[i].click();
        }
    }
}

let coin_start = 0;     // 0 means yellow start  1 means red start.
let num_player1_wins = 0;
let num_player2_wins = 0;

function insertCoin(id) {

    const coin = id.querySelectorAll('.coin');

    for (let i = coin.length - 1; i >= 0; i--) {

        if (!coin[i].classList.contains("player1-color") && !coin[i].classList.contains("player2-color")) {

            if (hoverCoin[0].classList.contains("player1-color")) {

                coin[i].classList.add("player1-color");

                for (let j = 0; j < hoverCoin.length; j++) {
                    hoverCoin[j].classList.remove("player1-color");
                    hoverCoin[j].classList.add("player2-color");
                }
            }
            else if (hoverCoin[0].classList.contains("player2-color")) {

                coin[i].classList.add("player2-color");

                for (let j = 0; j < hoverCoin.length; j++) {
                    hoverCoin[j].classList.remove("player2-color");
                    hoverCoin[j].classList.add("player1-color");
                }
            }

            break;
        }
    }

    let flag = 0;

    if (isWinner() === 'red') {

        h2.innerHTML = 'Player 1 is the winner.';
        h2.style.color = "#dd0000";
        flag = 1;

    } else if (isWinner() === 'yellow') {

        h2.innerHTML = 'Player 2 is the winner.';
        h2.style.color = "yellow";
        flag = 2;

    } else if (isWinner() === 'no') {

        let counter = 0;
        for (let i = 0; i < allcoins.length; i++) {
            if (allcoins[i].classList.contains("player1-color") ||
                allcoins[i].classList.contains("player2-color") ||
                allcoins[i].classList.contains("player1-win") ||
                allcoins[i].classList.contains("player2-win")
            ) {
                counter++;
            }
            else {
                break;
            }
        }

        if (counter != 42) {
            return;
        } else {
            h2.innerHTML = 'No winner.';
            h2.style.color = "white";
        }
    }

    for (let i = 0; i < cols.length; i++) {

        cols[i].classList.remove("hover");
        cols[i].setAttribute("onclick", null);
    }

    resetButton.style.display = "none";
    document.querySelector(".container").style.marginTop = '30px';

    setTimeout(function () {
        reset(flag);

        // switch start coin color after game ends. 
        if (coin_start == 0) {
            for (let i = 0; i < hoverCoin.length; i++) {
                hoverCoin[i].classList.remove("player2-color");
                hoverCoin[i].classList.add("player1-color");
            }

            coin_start = 1;
        } else {
            for (let i = 0; i < hoverCoin.length; i++) {
                hoverCoin[i].classList.remove("player1-color");
                hoverCoin[i].classList.add("player2-color");
            }

            coin_start = 0;
        }
    }, 6000);
}

function isWinner() {
    const board = allcoins;

    const Board = [
        [0, 6, 12, 18, 24, 30, 36],
        [1, 7, 13, 19, 25, 31, 37],
        [2, 8, 14, 20, 26, 32, 38],
        [3, 9, 15, 21, 27, 33, 39],
        [4, 10, 16, 22, 28, 34, 40],
        [5, 11, 17, 23, 29, 35, 41]
    ]

    /// 4 tiles in a row.
    for (let i = 5; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (board[Board[i][j]].classList.contains("player1-color") &&
                board[Board[i][j + 1]].classList.contains("player1-color") &&
                board[Board[i][j + 2]].classList.contains("player1-color") &&
                board[Board[i][j + 3]].classList.contains("player1-color")
            ) {
                board[Board[i][j]].classList.add("player1-win");
                board[Board[i][j + 1]].classList.add("player1-win");
                board[Board[i][j + 2]].classList.add("player1-win");
                board[Board[i][j + 3]].classList.add("player1-win");
                return 'red';
            }

            else if (board[Board[i][j]].classList.contains("player2-color") &&
                board[Board[i][j + 1]].classList.contains("player2-color") &&
                board[Board[i][j + 2]].classList.contains("player2-color") &&
                board[Board[i][j + 3]].classList.contains("player2-color")
            ) {
                board[Board[i][j]].classList.add("player2-win");
                board[Board[i][j + 1]].classList.add("player2-win");
                board[Board[i][j + 2]].classList.add("player2-win");
                board[Board[i][j + 3]].classList.add("player2-win");
                return 'yellow';
            }
        }
    }

    /// 4 tiles in a column.
    for (let i = 0; i < 7; i++) {
        for (let j = 5; j >= 3; j--) {
            if (board[Board[j][i]].classList.contains("player1-color") &&
                board[Board[j - 1][i]].classList.contains("player1-color") &&
                board[Board[j - 2][i]].classList.contains("player1-color") &&
                board[Board[j - 3][i]].classList.contains("player1-color")
            ) {
                board[Board[j][i]].classList.add("player1-win");
                board[Board[j - 1][i]].classList.add("player1-win");
                board[Board[j - 2][i]].classList.add("player1-win");
                board[Board[j - 3][i]].classList.add("player1-win");
                return 'red';
            }
            else if (board[Board[j][i]].classList.contains("player2-color") &&
                board[Board[j - 1][i]].classList.contains("player2-color") &&
                board[Board[j - 2][i]].classList.contains("player2-color") &&
                board[Board[j - 3][i]].classList.contains("player2-color")
            ) {
                board[Board[j][i]].classList.add("player2-win");
                board[Board[j - 1][i]].classList.add("player2-win");
                board[Board[j - 2][i]].classList.add("player2-win");
                board[Board[j - 3][i]].classList.add("player2-win");
                return 'yellow';
            }
        }
    }

    /// 4 tiles in a diagonal from (left to right).

    for (let i = 5; i >= 3; i--) {
        for (let j = 0; j < 4; j++) {
            if (board[Board[i][j]].classList.contains("player1-color") &&
                board[Board[i - 1][j + 1]].classList.contains("player1-color") &&
                board[Board[i - 2][j + 2]].classList.contains("player1-color") &&
                board[Board[i - 3][j + 3]].classList.contains("player1-color")
            ) {
                board[Board[i][j]].classList.add("player1-win");
                board[Board[i - 1][j + 1]].classList.add("player1-win");
                board[Board[i - 2][j + 2]].classList.add("player1-win");
                board[Board[i - 3][j + 3]].classList.add("player1-win");
                return 'red';
            }
            else if (board[Board[i][j]].classList.contains("player2-color") &&
                board[Board[i - 1][j + 1]].classList.contains("player2-color") &&
                board[Board[i - 2][j + 2]].classList.contains("player2-color") &&
                board[Board[i - 3][j + 3]].classList.contains("player2-color")
            ) {
                board[Board[i][j]].classList.add("player2-win");
                board[Board[i - 1][j + 1]].classList.add("player2-win");
                board[Board[i - 2][j + 2]].classList.add("player2-win");
                board[Board[i - 3][j + 3]].classList.add("player2-win");
                return 'yellow';
            }
        }
    }

    /// 4 tiles in a diagonal from (right to left).
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[Board[i][j]].classList.contains("player1-color") &&
                board[Board[i + 1][j + 1]].classList.contains("player1-color") &&
                board[Board[i + 2][j + 2]].classList.contains("player1-color") &&
                board[Board[i + 3][j + 3]].classList.contains("player1-color")
            ) {
                board[Board[i][j]].classList.add("player1-win");
                board[Board[i + 1][j + 1]].classList.add("player1-win");
                board[Board[i + 2][j + 2]].classList.add("player1-win");
                board[Board[i + 3][j + 3]].classList.add("player1-win");
                return 'red';
            }
            else if (board[Board[i][j]].classList.contains("player2-color") &&
                board[Board[i + 1][j + 1]].classList.contains("player2-color") &&
                board[Board[i + 2][j + 2]].classList.contains("player2-color") &&
                board[Board[i + 3][j + 3]].classList.contains("player2-color")
            ) {
                board[Board[i][j]].classList.add("player2-win");
                board[Board[i + 1][j + 1]].classList.add("player2-win");
                board[Board[i + 2][j + 2]].classList.add("player2-win");
                board[Board[i + 3][j + 3]].classList.add("player2-win");
                return 'yellow';
            }
        }
    }

    return 'no'
}

function reset(flag) {
    for (let i = 0; i < allcoins.length; i++) {
        allcoins[i].classList.remove("player1-color", "player2-color", "player1-win", "player2-win");
    }

    for (let i = 0; i < cols.length; i++) {

        cols[i].classList.add("hover");
        cols[i].setAttribute("onclick", "insertCoin(this)");
        hoverCoin[i].classList.remove("player1-color", "player2-color");
    }

    h2.innerHTML = "";
    document.querySelector(".container").style.marginTop = null;
    resetButton.style.display = "block";

    if (flag == 1) {
        allP[0].innerText = "Score: " + (++num_player1_wins);
    } else if (flag == 2) {
        allP[1].innerText = "Score: " + (++num_player2_wins);
    }

    // Make the start coin color same as previous game when we use reset button

    if (coin_start == 0) {
        for (let i = 0; i < hoverCoin.length; i++) {
            hoverCoin[i].classList.add("player2-color");
        }
    } else {
        for (let i = 0; i < hoverCoin.length; i++) {
            hoverCoin[i].classList.add("player1-color");
        }
    }
}