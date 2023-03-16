const Player = (symbol, name) => {
    let wins = 0;
    const won = () => wins++;
    const getWins = () => wins;
    return {symbol, name, won, getWins}
}

const board = (()=> {
    const player1 = Player("⭕", "One");
    const player2 = Player("❌", "Two");
    let move = 0;

    const boardArr = ["","","","","","","","",""];
    const boardElem = document.querySelector(".board");

    const check = () => {
        let row1 = boardArr[0] == boardArr[1] && boardArr[1] == boardArr[2] && boardArr[0] != "";
        let row2 = boardArr[3] == boardArr[4] && boardArr[4] == boardArr[5] && boardArr[3] != "";
        let row3 = boardArr[6] == boardArr[7] && boardArr[7] == boardArr[8] && boardArr[6] != "";
        let col1 = boardArr[0] == boardArr[3] && boardArr[3] == boardArr[6] && boardArr[0] != "";
        let col2 = boardArr[1] == boardArr[4] && boardArr[4] == boardArr[7] && boardArr[1] != "";
        let col3 = boardArr[2] == boardArr[5] && boardArr[5] == boardArr[8] && boardArr[2] != "";
        let diag1 = boardArr[0] == boardArr[4] && boardArr[4] == boardArr[8] && boardArr[0] != "";
        let diag2 = boardArr[2] == boardArr[4] && boardArr[4] == boardArr[6] && boardArr[2] != "";

        if(row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) {
            return true
        }
        return false
    }

    const playerMove = (player, grid) => {
        grid.textContent = player.symbol;
        boardArr[grid.id[grid.id.length - 1]] = player.symbol;
        if(check()){
            gameOver(currentPlayer().name);
        }
        move++;
    }

    const currentPlayer = () => {
        if(move % 2 == 0) {
            return player1
        } else {
            return player2
        }
    }

    const create = () => {
        boardElem.replaceChildren();
        boardArr.forEach((value, index) => {
            const grid = document.createElement("div");
            if(value == "") {
                grid.classList.add("grid");
                grid.addEventListener("click", e => playerMove(currentPlayer(), e.target))
            } else {
                grid.classList.add("grid-selected");
            }
            grid.id = `grid-${index}`;
            grid.textContent = value;
            boardElem.appendChild(grid);
        })
    }

    const gameOver = player => {
        boardElem.replaceChildren();
        boardArr.forEach((value, index) => {
            const grid = document.createElement("div");
            grid.classList.add("grid-selected");
            grid.id = `grid-${index}`;
            grid.textContent = value;
            boardElem.appendChild(grid);
        })
        const winner = document.querySelector(".winner");
        winner.textContent = `Player ${player} is the winner!`
    }

    return {create, check}
})()


board.create();
board.check();