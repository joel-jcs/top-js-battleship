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

let gameboard;
let carrier;
let battleship;
let destroyer;
let submarine;
let patrol;

beforeEach(() => {
  gameboard = GameboardHandler.createGameboard();
  shipsPlaced = GameboardHandler.getShips(gameboard);

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

describe('Placing ships in coordinates', () => {
  test('successfully place ship on gameboard horizontally', () => {
    coordinates = {
      row: 0,
      col: 0,
    };

    GameboardHandler.placeShip(gameboard, coordinates, destroyer);

    expect(gameboard.grid[0][0]).toBe('*');
    expect(gameboard.grid[0][1]).toBe('*');
    expect(gameboard.grid[0][2]).toBe('*');

    expect(gameboard.grid[0][3]).not.toBe('*');

    coordinates = { row: 3, col: 4 };

    GameboardHandler.placeShip(gameboard, coordinates, carrier);

    expect(gameboard.grid[3][4]).toBe('*');
    expect(gameboard.grid[3][5]).toBe('*');
    expect(gameboard.grid[3][6]).toBe('*');
    expect(gameboard.grid[3][7]).toBe('*');
    expect(gameboard.grid[3][8]).toBe('*');
    expect(gameboard.grid[3][8]).toBe('*');

    expect(shipsPlaced).toEqual([destroyer, carrier]);
    expect(shipsPlaced[1]).toEqual(carrier);
  });

  test('successfully place ship on gameboard vertically', () => {
    battleship.orientation = 'vertical';
    coordinates = { row: 0, col: 0 };
    GameboardHandler.placeShip(gameboard, coordinates, battleship);
    expect(gameboard.grid[0][0]).toBe('*');
    expect(gameboard.grid[1][0]).toBe('*');
    expect(gameboard.grid[2][0]).toBe('*');
    expect(gameboard.grid[3][0]).toBe('*');

    patrol.orientation = 'vertical';
    coordinates = { row: 5, col: 8 };
    GameboardHandler.placeShip(gameboard, coordinates, patrol);
    expect(gameboard.grid[5][8]).toBe('*');
    expect(gameboard.grid[6][8]).toBe('*');
    expect(gameboard.grid[7][8]).not.toBe('*');
    expect(gameboard.grid[8][8]).not.toBe('*');
    expect(gameboard.grid[9][8]).not.toBe('*');

    expect(shipsPlaced).toEqual([battleship, patrol]);
    expect(shipsPlaced[1]).toEqual(patrol);
  });

  test('placing ship out of bounds', () => {
    coordinates = { row: 0, col: 12 };
    GameboardHandler.placeShip(gameboard, coordinates, battleship);
    expect(gameboard.grid[0][12]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, coordinates, battleship)).toBe(
      'Input coordinates are out of bounds',
    );

    coordinates = { row: 12, col: 0 };
    GameboardHandler.placeShip(gameboard, coordinates, patrol);
    expect(gameboard.grid[12]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, coordinates, battleship)).toBe(
      'Input coordinates are out of bounds',
    );

    expect(shipsPlaced).toEqual([]);
  });

  test('placing ship on an edge vertically', () => {
    carrier.orientation = 'vertical';
    coordinates = { row: 6, col: 5 };
    GameboardHandler.placeShip(gameboard, coordinates, carrier);
    expect(gameboard.grid[6][5]).toBe('');
    expect(gameboard.grid[7][5]).toBe('');
    expect(gameboard.grid[8][5]).toBe('');
    expect(gameboard.grid[9][5]).toBe('');
    expect(gameboard.grid[10]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, coordinates, carrier)).toBe(
      'Trying to place ship out of bounds',
    );

    patrol.orientation = 'vertical';
    coordinates = { row: 9, col: 0 };
    GameboardHandler.placeShip(gameboard, coordinates, patrol);
    expect(gameboard.grid[9][0]).toBe('');
    expect(gameboard.grid[10]).toBe(undefined);

    coordinates = { row: 8, col: 0 };
    GameboardHandler.placeShip(gameboard, coordinates, patrol);
    expect(gameboard.grid[7][0]).toBe('');
    expect(gameboard.grid[8][0]).toBe('*');
    expect(gameboard.grid[9][0]).toBe('*');
    expect(gameboard.grid[10]).toBe(undefined);
    expect(GameboardHandler.placeShip(gameboard, coordinates, carrier)).toBe(
      'Trying to place ship out of bounds',
    );

    expect(shipsPlaced[0]).toEqual(patrol);
  });

  test('placing ship on an edge horizontally', () => {
    coordinates = { row: 0, col: 6 };
    expect(GameboardHandler.placeShip(gameboard, coordinates, carrier)).toBe(
      'Trying to place ship out of bounds',
    );
    expect(gameboard.grid[0][6]).toBe('');
    expect(gameboard.grid[0][7]).toBe('');
    expect(gameboard.grid[0][8]).toBe('');
    expect(gameboard.grid[0][9]).toBe('');
    expect(gameboard.grid[0][10]).toBe(undefined);

    coordinates = { row: 0, col: 5 };
    expect(GameboardHandler.placeShip(gameboard, coordinates, battleship)).toBe(
      gameboard,
    );
    expect(gameboard.grid[0][5]).toBe('*');
    expect(gameboard.grid[0][6]).toBe('*');
    expect(gameboard.grid[0][7]).toBe('*');
    expect(gameboard.grid[0][8]).toBe('*');
    expect(gameboard.grid[0][9]).toBe('');

    expect(shipsPlaced[0]).toEqual(battleship);
  });

  test('trying to place ship on an occupied coordinate', () => {
    coordinates = { row: 2, col: 2 };
    GameboardHandler.placeShip(gameboard, coordinates, carrier);

    expect(GameboardHandler.placeShip(gameboard, coordinates, patrol)).toBe(
      'There is another ship at these coordinates',
    );

    coordinates = { row: 2, col: 6 };
    expect(GameboardHandler.placeShip(gameboard, coordinates, patrol)).toBe(
      'There is another ship at these coordinates',
    );

    expect(shipsPlaced).toEqual([carrier]);
  });

  test('get ships', () => {
    expect(shipsPlaced).toEqual([]);
  });
});

describe('Gameboard Receive Attack functions', () => {
  test('record the coordinates of missed shots', () => {
    coordinates = { row: 0, col: 0 };
    expect(GameboardHandler.receiveAttack(gameboard, coordinates)).toBe(
      gameboard,
    );
    expect(gameboard.grid[0][0]).toBe('o');

    coordinates = { row: 5, col: 3 };
    expect(GameboardHandler.receiveAttack(gameboard, coordinates)).toBe(
      gameboard,
    );
    expect(gameboard.grid[coordinates.row][coordinates.col]).not.toBe('');
  });

  test('record the coordinates of hit shots', () => {
    coordinates = { row: 1, col: 1 };
    GameboardHandler.placeShip(gameboard, coordinates, carrier);
    expect(GameboardHandler.receiveAttack(gameboard, coordinates)).toBe(
      gameboard,
    );
    expect(gameboard.grid[1][0]).toBe('');
    expect(gameboard.grid[1][1]).toBe('x');
    expect(gameboard.grid[1][2]).toBe('*');
    expect(gameboard.grid[1][3]).toBe('*');
    expect(gameboard.grid[1][4]).toBe('*');
    expect(gameboard.grid[1][5]).toBe('*');
    expect(gameboard.grid[1][6]).toBe('');
  });

  test('update ship timesHit on hit', () => {
    coordinates = { row: 1, col: 1 };
    GameboardHandler.placeShip(gameboard, coordinates, carrier);
    GameboardHandler.receiveAttack(gameboard, coordinates);
    expect(carrier.timesHit).toBe(1);

    GameboardHandler.receiveAttack(gameboard, { row: 1, col: 2 });
    expect(carrier.timesHit).toBe(2);

    GameboardHandler.receiveAttack(gameboard, { row: 1, col: 3 });
    expect(carrier.timesHit).toBe(3);

    battleship.orientation = 'vertical';
    coordinates = { row: 6, col: 3 };
    GameboardHandler.placeShip(gameboard, coordinates, battleship);

    GameboardHandler.receiveAttack(gameboard, coordinates);
    expect(battleship.timesHit).toBe(1);

    GameboardHandler.receiveAttack(gameboard, { row: 7, col: 3 });
    expect(battleship.timesHit).toBe(2);

    GameboardHandler.receiveAttack(gameboard, { row: 8, col: 3 });
    expect(battleship.timesHit).toBe(3);

    GameboardHandler.receiveAttack(gameboard, { row: 9, col: 3 });
    expect(battleship.timesHit).toBe(4);
    expect(battleship.isSunk).toBe(true);
  });

  test('ship sinks when timesHit === length', () => {
    coordinates = { row: 1, col: 1 };
    GameboardHandler.placeShip(gameboard, coordinates, patrol);
    GameboardHandler.receiveAttack(gameboard, coordinates);
    GameboardHandler.receiveAttack(gameboard, { row: 1, col: 2 });
    expect(patrol.isSunk).toBe(true);
  });
});

describe('Gameboard Are All Ships Sunk?', () => {
  test('report if all ships are sunk', () => {
    GameboardHandler.placeShip(gameboard, { row: 0, col: 0 }, carrier);
    GameboardHandler.placeShip(gameboard, { row: 1, col: 1 }, battleship);
    GameboardHandler.placeShip(gameboard, { row: 2, col: 2 }, destroyer);
    GameboardHandler.placeShip(gameboard, { row: 3, col: 3 }, submarine);
    GameboardHandler.placeShip(gameboard, { row: 4, col: 4 }, patrol);

    ShipHandler.sinkShip(carrier);
    ShipHandler.sinkShip(battleship);
    ShipHandler.sinkShip(destroyer);
    ShipHandler.sinkShip(submarine);

    expect(GameboardHandler.areAllShipsSunk(gameboard)).toBe(false);

    ShipHandler.sinkShip(patrol);
    expect(GameboardHandler.areAllShipsSunk(gameboard)).toBe(true);
  });
});
