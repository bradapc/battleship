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

test('Adding a 2 length ship to row 0 col 3', () => {
    const board = main.createGameboard();
    board.addShipToBoard(2, 0, 3);
    expect(board.board[0][3].isShip).toEqual(true);
})

test('Board is not shot on init', () => {
    const board = main.createGameboard();
    expect(board.board[0][3].isShot).toEqual(false);
})

test('Board receives hit at row 0 col 3', () => {
    const board = main.createGameboard();
    board.receiveAttack(0, 3);
    expect(board.board[0][3].isShot).toEqual(true);
})

test('Gameboard keeps track of newly added ships', () => {
    const board = main.createGameboard();
    board.addShipToBoard(2, 0, 3);
    expect(board.ships[0]).not.toBeUndefined();
})

test('Ship receives coordinates when added to board', () => {
    const board = main.createGameboard();
    board.addShipToBoard(2, 0, 3);
    expect(board.ships[0].coordinates[0]).toEqual([0, 3]);
})

test('Health of ship changes on board hit where ship is', () => {
    const board = main.createGameboard();
    board.addShipToBoard(2, 0, 3);
    board.receiveAttack(0, 3);
    expect(board.ships[0].health).toContain(1);
})

test('Ship sinks after losing all health', () => {
    const board = main.createGameboard();
    board.addShipToBoard(2, 0, 3);
    board.receiveAttack(0, 3);
    board.receiveAttack(0, 4);
    expect(board.ships[0].isSunk()).toBe(true);
})

test('Check if all ships sunk when a ship is still alive (should be false)', () => {
    const board = main.createGameboard();
    board.addShipToBoard(2, 0, 3);
    expect(board.checkAllShipsSunk()).toBe(false);
})

test('Check if all ships sunk when all ships are sunk (should be true)', () => {
    const board = main.createGameboard();
    board.addShipToBoard(2, 0, 3);
    board.receiveAttack(0, 3);
    board.receiveAttack(0, 4);
    expect(board.checkAllShipsSunk()).toBe(true);
})