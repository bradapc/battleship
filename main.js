const createShip = function(length) {
    length;
    const health = new Array(length).fill(0);
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
    return {length, isSunk, hit, coordinates};
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
    return {addShipToBoard, board, receiveAttack, checkAllShipsSunk};
}

const createPlayer = function(){
    const gameboard = createGameboard();
    return {gameboard};
}

const shipTypes = [
    {
        name: 'Carrier',
        length: 5
    },
    {
        name: 'Battleship',
        length: 4
    },
    {
        name: 'Cruiser',
        length: 3
    },
    {
        name: 'Submarine',
        length: 3
    },
    {
        name: 'Destroyer',
        length: 2
    }
]

const game = (() => {
    const player = createPlayer();
    const computer = createPlayer();
    let turn = 'player';
    let currentShip = shipTypes[0];
    let currentIndex = 0;
    let currentShipAI = shipTypes[0];
    let currentIndexAI = 0;
    let playerInit = false;
    function initGame() {
        if(playerInit === false) {
            document.querySelector('.board-container').style.display = 'none';
            const initBoard = document.querySelector('.init-board');
            for(let i = 0; i < 10; i++) {
                for(let j = 0; j < 10; j++) {
                    const initGameTile = document.createElement('div');
                    initGameTile.classList.add('init-tile');
                    initGameTile.setAttribute('row', i);
                    initGameTile.setAttribute('col', j);
                    initBoard.appendChild(initGameTile);
                }
            }
            const addButton = document.querySelector('#submitcoords');
            addButton.addEventListener('click', () => {
                submitShipCoords();
            })
        }
    }
    initGame();
    function submitShipCoords() {
        const initTile = document.querySelectorAll('.init-tile');
        let rowInput = document.querySelector('#coordrow');
        let colInput = document.querySelector('#coordcol');
        rowInput = Number.parseInt(rowInput.value);
        colInput = Number.parseInt(colInput.value);
        if(colInput + currentShip.length - 1 < player.gameboard.board[rowInput].length && !player.gameboard.board[rowInput][colInput].isShip) {
            player.gameboard.addShipToBoard(currentShip.length, rowInput, colInput);
            const shipTiles = [];
            for(let i = 0; i < currentShip.length; i++) {
                shipTiles.push([rowInput, colInput + i]);
            }
            initTile.forEach(tile => {
                for(let i = 0; i < shipTiles.length; i++) {
                    if(tile.getAttribute('row') == shipTiles[i][0] && tile.getAttribute('col') == shipTiles[i][1]) {
                        tile.style.backgroundColor = 'black';
                    }
                }
            })
            currentIndex += 1;
            currentShip = shipTypes[currentIndex];
            if(currentIndex > 4) {
                playerInit = false;
                startGame();
            }
        } else {
            alert('bad');
        }
    }
    function startGame() {
        document.querySelector('.board-container').style.display = 'flex';
        document.querySelector('.init-container').style.display = 'none';
        computerRandomizeShips();
    }
    function computerRandomizeShips() {
        for(let i = 0; i < shipTypes.length; i++) {
            let row;
            let col;
            do {
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
            } while(!isValidShipPlacement(row, col));
            computer.gameboard.addShipToBoard(currentShipAI.length, row, col);
            currentIndexAI += 1;
            currentShipAI = shipTypes[currentIndexAI];
        }
    }
    function isValidShipPlacement(row, col) {
        if(col + currentShipAI.length - 1 < computer.gameboard.board[row].length && !computer.gameboard.board[row][col].isShip) {
            return true;
        } else {
            return false;
        }
    }
    function updateDOM() {
        const playerBoard = document.getElementById('player');
        const computerBoard = document.getElementById('computer');
        const tileDOM = document.querySelectorAll('.game-tile');
        tileDOM.forEach(element => element.remove());
        for(let i = 0; i < player.gameboard.board.length; i++) {
            for(let j = 0; j < player.gameboard.board[i].length; j++) {
                const gameTile = document.createElement('div');
                gameTile.classList.add('game-tile');
                gameTile.setAttribute('row', i);
                gameTile.setAttribute('col', j);
                playerBoard.appendChild(gameTile);
                if(player.gameboard.board[i][j].isShot) {
                    const missMarker = document.createElement('div');
                    missMarker.classList.add('miss-marker');
                    gameTile.appendChild(missMarker);
                    if(computer.gameboard.board[i][j].isShip) {
                        missMarker.style.backgroundColor = 'red';
                    }
                }
                if(player.gameboard.board[i][j].isShip) {
                    gameTile.style.backgroundColor = 'black';
                }
            }
        }
        for(let i = 0; i < computer.gameboard.board.length; i++) {
            for(let j = 0; j < computer.gameboard.board[i].length; j++) {
                const gameTile = document.createElement('div');
                gameTile.classList.add('game-tile');
                gameTile.setAttribute('row', i);
                gameTile.setAttribute('col', j);
                computerBoard.appendChild(gameTile);
                gameTile.addEventListener('click', () => {
                    if(!checkForWin()){
                        handleAttack('computer', gameTile.getAttribute('row'), gameTile.getAttribute('col'));
                    }
                });
                if(computer.gameboard.board[i][j].isShot) {
                    const missMarker = document.createElement('div');
                    missMarker.classList.add('miss-marker');
                    gameTile.appendChild(missMarker);
                    if(computer.gameboard.board[i][j].isShip) {
                        missMarker.style.backgroundColor = 'red';
                    }
                }
            }
        }
    }
    updateDOM();
    function handleAttack(type, row, col) {
        if(type === 'computer') {
            if(isValidAttack('computer', row, col) && turn === 'player') {
                computer.gameboard.receiveAttack(row, col);
                turn = 'computer';
                updateDOM();
                if(!checkForWin()) {
                    computerAttack();
                }
            }
        } else if(type === 'player') {
            player.gameboard.receiveAttack(row, col);
            turn = 'player';
            updateDOM();
            checkForWin();
        }
    }
    function isValidAttack(type, row, col) {
        if(type === 'computer') {
            if(computer.gameboard.board[row][col].isShot) {
                return false;
            } else {
                return true;
            }
        } else if(type === 'player') {
            if(player.gameboard.board[row][col].isShot) {
                return false;
            } else {
                return true;
            }
        }
    }
    function computerAttack() {
        let row;
        let col;
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
        } while(!isValidAttack('player', row, col));
        handleAttack('player', row, col);
    }
    function checkForWin() {
        if(player.gameboard.checkAllShipsSunk()) {
            alert('Computer wins!');
            return true;
        } else if(computer.gameboard.checkAllShipsSunk()) {
            alert('Player wins!');
            return true;
        }
        return false;
    }
})();


exports.createGameboard = createGameboard;
exports.createShip = createShip;