const GameboardHandler = require('./Gameboard');
const ShipHandler = require('./Ship');

test('Gameboard constructor', () => {
  expect(GameboardHandler.createGameboard()).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

beforeAll(() => (gameboard = GameboardHandler.createGameboard()));

beforeEach(() => {
  carrier = ShipHandler.createShip(5);
  battleship = ShipHandler.createShip(4);
  destroyer = ShipHandler.createShip(3);
  submarine = ShipHandler.createShip(3);
  patrol = ShipHandler.createShip(2);
});

describe('Placing ships in coordinates', () => {
  afterEach(() => (gameboard = GameboardHandler.createGameboard()));
  test('successfully place ship on gameboard horizontally', () => {
    let coordinates = {
      row: 0,
      col: 0,
    };

    GameboardHandler.placeShip(gameboard, destroyer, coordinates);

    expect(gameboard[0][0]).toBe('*');
    expect(gameboard[0][1]).toBe('*');
    expect(gameboard[0][2]).toBe('*');

    expect(gameboard[0][3]).not.toBe('*');
    console.log(gameboard[0]);

    coordinates = { row: 3, col: 4 };

    GameboardHandler.placeShip(gameboard, carrier, coordinates);

    expect(gameboard[3][4]).toBe('*');
    expect(gameboard[3][5]).toBe('*');
    expect(gameboard[3][6]).toBe('*');
    expect(gameboard[3][7]).toBe('*');
    expect(gameboard[3][8]).toBe('*');
    expect(gameboard[3][8]).toBe('*');
  });

  test('successfully place ship on gameboard vertically', () => {
    battleship.orientation = 'vertical';
    let coordinates = { row: 0, col: 0 };
    GameboardHandler.placeShip(gameboard, battleship, coordinates);

    expect(gameboard[0][0]).toBe('*');
    expect(gameboard[1][0]).toBe('*');
    expect(gameboard[2][0]).toBe('*');
    expect(gameboard[3][0]).toBe('*');

    patrol.orientation = 'vertical';

    coordinates = { row: 5, col: 8 };
    GameboardHandler.placeShip(gameboard, patrol, coordinates);

    expect(gameboard[5][8]).toBe('*');
    expect(gameboard[6][8]).toBe('*');

    expect(gameboard[7][8]).not.toBe('*');
    expect(gameboard[8][8]).not.toBe('*');
    expect(gameboard[9][8]).not.toBe('*');

    // console.log(gameboard);
  });

  test('placing ship out of bounds', () => {
    let coordinates = { row: 0, col: 12 };

    GameboardHandler.placeShip(gameboard, battleship, coordinates);
    console.log(gameboard[coordinates.row]);
    expect(gameboard[0][12]).toBe(undefined);

    coordinates = { row: 10, col: 1 };
    expect(gameboard[10]).toBe(undefined);
  });
});

//
//
// Got ahead of myself, this receive attack should be added after

// describe('Gameboard Receive Attack functions', () => {
//   test('selecting empty coordinates returns miss', () => {
//     GameboardHandler.receiveAttack(0, 0);

//     gameboard[1][1] = '*';
//     gameboard[1][2] = '*';
//     gameboard[1][3] = '*';
//     expect(gameboard[0][0]).toBe('miss');
//   });

//   test('selecting occupied coordinates returns hit', () => {
//     gameboard[1][1] = '*';
//     gameboard[1][2] = '*';
//     gameboard[1][3] = '*';

//     GameboardHandler.receiveAttack(0, 0);
//     expect(gameboard[1][2]).toBe('hit');
//   });
// });
