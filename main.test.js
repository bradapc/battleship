const main = require('./main.js')

test('Create a battleship with length 4', () => {
    expect(main.createShip(4)).toMatchObject({length: 4});
})

test('Hit battleship of length 4 at 3rd position', () => {
    const ship = main.createShip(4);
    ship.hit(2);
    expect(ship.health).toEqual([0,0,1,0])
})

test('Is battleship that has not been hit sunk?', () => {
    const ship = main.createShip(4);
    expect(ship.isSunk()).toBe(false);
})

test('Is battleship of length 2 that has been hit twice sunk?', () => {
    const ship = main.createShip(2);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
})

test('Is battleship of length 2 that has been hit twice sunk?', () => {
    const ship = main.createShip(2);
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
})

test('Adding a 2 length ship to spot 4', () => {
    const board = main.createGameboard();
    board.addShipToBoard(2, 4);
    expect(board.board[4].isShip).toEqual(true);
})