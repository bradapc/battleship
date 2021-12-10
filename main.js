const createShip = function(length) {
    length = length;
    health = Array(length).fill(0);
    sunk = false;
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
    return {length, health, isSunk, hit};
}

const createGameboard = function() {
    const size = 10;
    board = []
    init();
    function init() {
        for(let i = 0; i < size; i++) {
            board[i] = [];
            for(let j = 0; j < size; j++) {
                board[i][j] = ({isShip: false, isShot: false});
            }
        }
    }
    const addShipToBoard = function(length, pos) {
        const newShip = createShip(length);
        for(let i = 0; i < length; i++) {
            board[pos + i].isShip = true;
        }
    }
    return {addShipToBoard, board};
}

exports.createGameboard = createGameboard;
exports.createShip = createShip;