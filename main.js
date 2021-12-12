const createShip = function(length) {
    length = length;
    health = Array(length).fill(0);
    sunk = false;
    coordinates = [];
    const isSunk = () => {
        for(let i = 0; i < health.length; i++) {
            if(health[i] === 0) {
                return false;
            } else {
                continue;
            }
        }
        return true;
    }
    const hit = (num) => {
        health[num] = 1;
    }
    return {length, health, isSunk, hit, coordinates};
}

const createGameboard = function() {
    const size = 10;
    let board = []
    let ships = [];
    init();
    function init() {
        for(let i = 0; i < size; i++) {
            board[i] = [];
            for(let j = 0; j < size; j++) {
                board[i][j] = ({isShip: false, isShot: false});
            }
        }
    }
    const addShipToBoard = function(length, row, col) {
        const newShip = createShip(length);
        for(let i = 0; i < length; i++) {
            board[row][col + i].isShip = true;
            newShip.coordinates.push([row, col + i]);
        }
        ships.push(newShip);
    }
    const receiveAttack = (row, col) => {
        board[row][col].isShot = true;
        if(board[row][col].isShip) {
            for(let i = 0; i < ships.length; i++) {
                for(let j = 0; j < ships[i].coordinates.length; j++) {
                    if(ships[i].coordinates[j][0] == [row] && ships[i].coordinates[j][1] == [col]) {
                        ships[i].hit(j);
                    }
                }
            }
        }
    }
    const checkAllShipsSunk = () => {
        for(let i = 0; i < ships.length; i++) {
            if(ships[i].isSunk()) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }
    return {addShipToBoard, board, receiveAttack, ships, checkAllShipsSunk};
}

const createPlayer = function(type) {
    const gameboard = createGameboard();
    gameboard.addShipToBoard(5, 0, 0);
    gameboard.addShipToBoard(4, 1, 0);
    gameboard.addShipToBoard(3, 2, 0);
    gameboard.addShipToBoard(3, 3, 0);
    gameboard.addShipToBoard(2, 4, 0);
    return {gameboard};
}

const game = (() => {
    const player = createPlayer('player');
    const computer = createPlayer('computer');
    function updateDOM() {
        const playerBoard = document.getElementById('player');
        const computerBoard = document.getElementById('computer');
        for(let i = 0; i < player.gameboard.board.length; i++) {
            for(let j = 0; j < player.gameboard.board[i].length; j++) {
                const gameTile = document.createElement('div');
                gameTile.classList.add('game-tile');
                gameTile.setAttribute('row', i);
                gameTile.setAttribute('col', j);
                playerBoard.appendChild(gameTile);
            }
        }
        for(let i = 0; i < computer.gameboard.board.length; i++) {
            for(let j = 0; j < computer.gameboard.board[i].length; j++) {
                const gameTile = document.createElement('div');
                gameTile.classList.add('game-tile');
                gameTile.setAttribute('row', i);
                gameTile.setAttribute('col', j);
                computerBoard.appendChild(gameTile);
            }
        }
    }
    updateDOM();
})();


exports.createGameboard = createGameboard;
exports.createShip = createShip;