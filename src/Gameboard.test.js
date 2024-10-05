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
    coordinates = {
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
    coordinates = { row: 0, col: 0 };
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
    coordinates = { row: 0, col: 12 };
    GameboardHandler.placeShip(gameboard, battleship, coordinates);
    expect(gameboard[0][12]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, battleship, coordinates)).toBe(
      'Input coordinates are out of bounds',
    );

    coordinates = { row: 12, col: 0 };
    GameboardHandler.placeShip(gameboard, patrol, coordinates);
    expect(gameboard[12]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, battleship, coordinates)).toBe(
      'Input coordinates are out of bounds',
    );
  });

  test('placing ship on an edge vertically', () => {
    carrier.orientation = 'vertical';
    coordinates = { row: 6, col: 5 };
    GameboardHandler.placeShip(gameboard, carrier, coordinates);
    expect(gameboard[6][5]).toBe('');
    expect(gameboard[7][5]).toBe('');
    expect(gameboard[8][5]).toBe('');
    expect(gameboard[9][5]).toBe('');
    expect(gameboard[10]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, carrier, coordinates)).toBe(
      'Trying to place ship out of bounds',
    );

    patrol.orientation = 'vertical';
    coordinates = { row: 9, col: 0 };
    GameboardHandler.placeShip(gameboard, patrol, coordinates);
    expect(gameboard[9][0]).toBe('');
    expect(gameboard[10]).toBe(undefined);

    coordinates = { row: 8, col: 0 };
    GameboardHandler.placeShip(gameboard, patrol, coordinates);
    expect(gameboard[7][0]).toBe('');
    expect(gameboard[8][0]).toBe('*');
    expect(gameboard[9][0]).toBe('*');
    expect(gameboard[10]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, carrier, coordinates)).toBe(
      'Trying to place ship out of bounds',
    );
  });

  test('placing ship on an edge horizontally', () => {
    coordinates = { row: 0, col: 6 };
    expect(GameboardHandler.placeShip(gameboard, carrier, coordinates)).toBe(
      'Trying to place ship out of bounds',
    );
    expect(gameboard[0][6]).toBe('');
    expect(gameboard[0][7]).toBe('');
    expect(gameboard[0][8]).toBe('');
    expect(gameboard[0][9]).toBe('');
    expect(gameboard[0][10]).toBe(undefined);

    coordinates = { row: 0, col: 5 };
    expect(GameboardHandler.placeShip(gameboard, carrier, coordinates)).toBe(
      gameboard,
    );
    expect(gameboard[0][5]).toBe('*');
    expect(gameboard[0][6]).toBe('*');
    expect(gameboard[0][7]).toBe('*');
    expect(gameboard[0][8]).toBe('*');
    expect(gameboard[0][9]).toBe('*');
  });

  test('trying to place ship on an occupied coordinate', () => {
    coordinates = { row: 2, col: 2 };
    GameboardHandler.placeShip(gameboard, carrier, coordinates);

    expect(GameboardHandler.placeShip(gameboard, patrol, coordinates)).toBe(
      'There is another ship at these coordinates',
    );

    coordinates = { row: 2, col: 6 };
    expect(GameboardHandler.placeShip(gameboard, patrol, coordinates)).toBe(
      'There is another ship at these coordinates',
    );
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
