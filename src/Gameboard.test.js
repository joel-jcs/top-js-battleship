const GameboardHandler = require('./Gameboard');
const ShipHandler = require('./Ship');

test('Gameboard constructor', () => {
  expect(GameboardHandler.createGameboard().grid).toEqual([
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

describe('Placing ships in coordinates', () => {
  let gameboard;
  // let ships;
  let carrier;
  let battleship;
  let destroyer;
  let submarine;
  let patrol;

  beforeEach(() => {
    gameboard = GameboardHandler.createGameboard();
    // ships = [];

    carrier = ShipHandler.createShip(5);
    battleship = ShipHandler.createShip(4);
    destroyer = ShipHandler.createShip(3);
    submarine = ShipHandler.createShip(3);
    patrol = ShipHandler.createShip(2);
    carrier.coordinates = [];
    battleship.coordinates = [];
    destroyer.coordinates = [];
    submarine.coordinates = [];
    patrol.coordinates = [];
  });

  test('successfully place ship on gameboard horizontally', () => {
    coordinates = {
      row: 0,
      col: 0,
    };

    GameboardHandler.placeShip(gameboard, destroyer, coordinates);

    expect(gameboard.grid[0][0]).toBe('*');
    expect(gameboard.grid[0][1]).toBe('*');
    expect(gameboard.grid[0][2]).toBe('*');

    expect(gameboard.grid[0][3]).not.toBe('*');

    coordinates = { row: 3, col: 4 };

    GameboardHandler.placeShip(gameboard, carrier, coordinates);

    expect(gameboard.grid[3][4]).toBe('*');
    expect(gameboard.grid[3][5]).toBe('*');
    expect(gameboard.grid[3][6]).toBe('*');
    expect(gameboard.grid[3][7]).toBe('*');
    expect(gameboard.grid[3][8]).toBe('*');
    expect(gameboard.grid[3][8]).toBe('*');

    // expect(GameboardHandler.getShips()).toEqual([destroyer, carrier]);
    // expect(GameboardHandler.getShips()[1]).toEqual(carrier);
  });

  test('successfully place ship on gameboard vertically', () => {
    battleship.orientation = 'vertical';
    coordinates = { row: 0, col: 0 };
    GameboardHandler.placeShip(gameboard, battleship, coordinates);
    expect(gameboard.grid[0][0]).toBe('*');
    expect(gameboard.grid[1][0]).toBe('*');
    expect(gameboard.grid[2][0]).toBe('*');
    expect(gameboard.grid[3][0]).toBe('*');

    patrol.orientation = 'vertical';
    coordinates = { row: 5, col: 8 };
    GameboardHandler.placeShip(gameboard, patrol, coordinates);
    expect(gameboard.grid[5][8]).toBe('*');
    expect(gameboard.grid[6][8]).toBe('*');
    expect(gameboard.grid[7][8]).not.toBe('*');
    expect(gameboard.grid[8][8]).not.toBe('*');
    expect(gameboard.grid[9][8]).not.toBe('*');

    // expect(GameboardHandler.getShips()[1]).toEqual(patrol);
    // expect(ships).toEqual([battleship, patrol]);
  });

  test('placing ship out of bounds', () => {
    coordinates = { row: 0, col: 12 };
    GameboardHandler.placeShip(gameboard, battleship, coordinates);
    expect(gameboard.grid[0][12]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, battleship, coordinates)).toBe(
      'Input coordinates are out of bounds',
    );

    coordinates = { row: 12, col: 0 };
    GameboardHandler.placeShip(gameboard, patrol, coordinates);
    expect(gameboard.grid[12]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, battleship, coordinates)).toBe(
      'Input coordinates are out of bounds',
    );

    // expect(ships).toEqual([]);
  });

  test('placing ship on an edge vertically', () => {
    carrier.orientation = 'vertical';
    coordinates = { row: 6, col: 5 };
    GameboardHandler.placeShip(gameboard, carrier, coordinates);
    expect(gameboard.grid[6][5]).toBe('');
    expect(gameboard.grid[7][5]).toBe('');
    expect(gameboard.grid[8][5]).toBe('');
    expect(gameboard.grid[9][5]).toBe('');
    expect(gameboard.grid[10]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, carrier, coordinates)).toBe(
      'Trying to place ship out of bounds',
    );

    patrol.orientation = 'vertical';
    coordinates = { row: 9, col: 0 };
    GameboardHandler.placeShip(gameboard, patrol, coordinates);
    expect(gameboard.grid[9][0]).toBe('');
    expect(gameboard.grid[10]).toBe(undefined);

    coordinates = { row: 8, col: 0 };
    GameboardHandler.placeShip(gameboard, patrol, coordinates);
    expect(gameboard.grid[7][0]).toBe('');
    expect(gameboard.grid[8][0]).toBe('*');
    expect(gameboard.grid[9][0]).toBe('*');
    expect(gameboard.grid[10]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, carrier, coordinates)).toBe(
      'Trying to place ship out of bounds',
    );

    // expect(ships[0]).toEqual(patrol);
  });

  test('placing ship on an edge horizontally', () => {
    coordinates = { row: 0, col: 6 };
    expect(GameboardHandler.placeShip(gameboard, carrier, coordinates)).toBe(
      'Trying to place ship out of bounds',
    );
    expect(gameboard.grid[0][6]).toBe('');
    expect(gameboard.grid[0][7]).toBe('');
    expect(gameboard.grid[0][8]).toBe('');
    expect(gameboard.grid[0][9]).toBe('');
    expect(gameboard.grid[0][10]).toBe(undefined);

    coordinates = { row: 0, col: 5 };
    expect(GameboardHandler.placeShip(gameboard, carrier, coordinates)).toBe(
      gameboard,
    );
    expect(gameboard.grid[0][5]).toBe('*');
    expect(gameboard.grid[0][6]).toBe('*');
    expect(gameboard.grid[0][7]).toBe('*');
    expect(gameboard.grid[0][8]).toBe('*');
    expect(gameboard.grid[0][9]).toBe('*');
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

  test('get ships', () => {
    // expect(GameboardHandler.getShips()).toEqual([]);
  });
});

// Gameboards should have a receiveAttack function that takes a pair of coordinates,
// determines whether or not the attack hit a ship and then sends the ‘hit’ function
// to the correct ship, or records the coordinates of the missed shot.

describe('Gameboard Receive Attack functions', () => {
  beforeEach(() => {
    gameboard = GameboardHandler.createGameboard();

    carrier = ShipHandler.createShip(5);
    battleship = ShipHandler.createShip(4);
    destroyer = ShipHandler.createShip(3);
    submarine = ShipHandler.createShip(3);
    patrol = ShipHandler.createShip(2);
  });

  test('record the coordinates of missed shots', () => {
    coordinates = { row: 0, col: 0 };
    expect(GameboardHandler.receiveAttack(gameboard, null, coordinates)).toBe(
      gameboard,
    );
    expect(gameboard.grid[0][0]).toBe('o');

    coordinates = { row: 5, col: 3 };
    expect(GameboardHandler.receiveAttack(gameboard, null, coordinates)).toBe(
      gameboard,
    );
    expect(gameboard.grid[coordinates.row][coordinates.col]).not.toBe('');
  });

  test('record the coordinates of hit shots', () => {
    coordinates = { row: 1, col: 1 };
    GameboardHandler.placeShip(gameboard, carrier, coordinates);
    expect(
      GameboardHandler.receiveAttack(gameboard, carrier, coordinates),
    ).toBe(gameboard);
    expect(gameboard.grid[1][0]).toBe('');
    expect(gameboard.grid[1][1]).toBe('x');
    expect(gameboard.grid[1][2]).toBe('*');
    expect(gameboard.grid[1][3]).toBe('*');
    expect(gameboard.grid[1][4]).toBe('*');
    expect(gameboard.grid[1][5]).toBe('*');
    expect(gameboard.grid[1][6]).toBe('');
  });

  // test('update ship timesHit on hit', () => {
  //   coordinates = { row: 1, col: 1 };
  //   GameboardHandler.placeShip(gameboard, carrier, coordinates);
  //   GameboardHandler.receiveAttack(gameboard, carrier, coordinates);
  //   expect(carrier.timesHit).toBe(1);
  // });

  test('selecting occupied coordinates returns hit', () => {
    // gameboard.grid[1][1] = '*';
    // gameboard.grid[1][2] = '*';
    // gameboard.grid[1][3] = '*';
    // expect(gameboard.grid[1][2]).toBe('hit');
  });
});
