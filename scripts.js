const MAX_ROW = 9;
const MAX_COL = 9;
const BOMB = "*";
const boardEl = document.getElementById("board");
/*
=========
BOARD
* => bomb
1..9 => numbers
=========
*/
var board = [];
var bombCords = [
    { row: 0, col: 0 },
    { row: 3, col: 1 },
    { row: 7, col: 6 },
    { row: 4, col: 5 },
    { row: 5, col: 6 },
    { row: 0, col: 2 },
    { row: 5, col: 7 },
    { row: 8, col: 5 },
    { row: 6, col: 2 },
    { row: 2, col: 7 },
];

function startGame() {
    fillEmptyBoard();
    fillBombs();
    fillNumbers();
    setDOM();

    console.log(board)
}
startGame();

function fillEmptyBoard() {
    // Fill the row
    for(var i=0; i<MAX_ROW; i++) {
        var newRow = [];

        for(var j=0; j<MAX_COL; j++) {
            newRow.push("0");
        }

        board.push(newRow);
    }
}

function fillBombs() {
    var cord = {};
    var curPlace = "";
    for(var i=0; i<bombCords.length; i++) {
        cord = bombCords[i];
        curPlace = board[cord.row][cord.col];

        if(curPlace != BOMB) {
            // Caso não tenha uma bomba nesse local, coloca
            board[cord.row][cord.col] = BOMB;
        } else {
            // Caso já tenha uma bomba, sorteia novas posições, até achar uma que não tenha bomba

        }
    }
}

function fillNumbers() { 
    for(var i=0; i<MAX_ROW; i++) {
        for(var j=0; j<MAX_COL; j++) {
            var curPlace = board[i][j];
            var bombCount = 0;

            // Se for uma bomba, não vai ser número...
            if(curPlace == BOMB) continue;

            if(isOnBoard(i-1, j-1)){
                if(board[i-1][j-1] == BOMB){
                    bombCount++;
                }
            }

            if(isOnBoard(i-1, j)){
                if(board[i-1][j] == BOMB){
                    bombCount++;
                }
            }

            if(isOnBoard(i-1, j+1)){
                if(board[i-1][j+1] == BOMB){
                    bombCount++;
                }
            }

            if(isOnBoard(i, j+1)){
                if(board[i][j+1] == BOMB){
                    bombCount++;
                }
            }

            if(isOnBoard(i+1, j+1)){
                if(board[i+1][j+1] == BOMB){
                    bombCount++;
                }
            }

            if(isOnBoard(i+1, j)){
                if(board[i+1][j] == BOMB){
                    bombCount++;
                }
            }

            if(isOnBoard(i+1, j-1)){
                if(board[i+1][j-1] == BOMB){
                    bombCount++;
                }
            }

            if(isOnBoard(i, j-1)){
                if(board[i][j-1] == BOMB){
                    bombCount++;
                }
            }

            board[i][j] = bombCount.toString();

        }
    }
}

function isOnBoard(row, col) {
    var positionValid = true;

    if(row < 0 || row >= MAX_ROW)
        positionValid = false;
    if(col < 0 || col >= MAX_COL)
        positionValid = false;

    return positionValid;
}

function setDOM() {

    for(var i=0; i<MAX_ROW; i++) {
        for(var j=0; j<MAX_COL; j++) {
            const square = document.createElement("div");
            const row = i;
            const col = j;

            square.classList.add("square");

            // Adiciona evento click no square
            square.addEventListener("click", (event) => {
                onClickSquare(row, col);
            })

            boardEl.appendChild(square);
        }
    }
}

function onClickSquare(row, col) {
    var squaresEl = Array.from(boardEl.children);
    var index = (row * MAX_COL) + col;
    
    var innerHTML = "";
    var color = "";

    switch(board[row][col]) {
        case "1":
            innerHTML = "1";
            color = "#1212ec"
            break;
        case "2":
            innerHTML = "2";
            color = "#109e10"
            break;
        case "3":
            innerHTML = "3";
            color = "#df0d0d"
            break;
        case "4":
            innerHTML = "4";
            color = "#58057977"
            break;
        case "5":
            innerHTML = "5";
            color = "#415d88ff"
            break;
        case "6":
            innerHTML = "6";
            color = "#030335ff"
            break;
        case "7":
            innerHTML = "7";
            color = "#152519ff"
            break;
        case "8":
            innerHTML = "8";
            color = "#3f2d1eff"
            break;
        case "*":
            innerHTML = "💣"
            break;
    }

    squaresEl[index].innerHTML = innerHTML;
    squaresEl[index].classList.add("selected");
    squaresEl[index].style.color = color;
}

// Esse método renderiza o DOM mostrando já como está cada posição do Array, apenas para debug
function setDOM_Debug() {

    for(var i=0; i<MAX_ROW; i++) {
        for(var j=0; j<MAX_COL; j++) {
            const square = document.createElement("div");
            square.classList.add("square");

            if(board[i][j] == BOMB)
                square.classList.add("bomb");

            if(board[i][j] != "0")
                square.innerHTML = board[i][j];

            boardEl.appendChild(square);
        }
    }
}