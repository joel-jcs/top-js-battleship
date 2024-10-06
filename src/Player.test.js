const GameboardHandler = require('./Gameboard');
const PlayerHandler = require('./Player');
const ShipHandler = require('./Ship');

test('Player constructor', () => {
  const player1 = PlayerHandler.createPlayer('Player');
  expect(player1.name).toBe('Player');
  player1.gameboard.grid[0][0] = 'X';
  expect(player1.isCPU).toBe(false);
  expect(player1.isWinner).toBe(false);
  expect(player1.gameboard.grid).toEqual([
    ['X', '', '', '', '', '', '', '', '', ''],
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

  const player2 = PlayerHandler.createPlayer('CPU', true);
  expect(player2.name).toBe('CPU');
  expect(player2.isCPU).toBe(true);
  expect(player2.gameboard.grid).toEqual([
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

let carrier;
let battleship;
let destroyer;
let submarine;
let patrol;

beforeAll(() => {
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

describe('Player Attack functions', () => {
  test('Human player attack', () => {
    const player2 = PlayerHandler.createPlayer('Player2');

    //attack on empty coordinate
    coordinates = { row: 0, col: 0 };
    PlayerHandler.attack(player2.gameboard, coordinates);
    expect(player2.gameboard.grid[0][0]).toBe('o');

    //attack a ship
    coordinates = { row: 1, col: 5 };
    GameboardHandler.placeShip(player2.gameboard, coordinates, carrier);
    PlayerHandler.attack(player2.gameboard, coordinates);
    expect(player2.gameboard.grid[1][4]).toBe('');
    expect(player2.gameboard.grid[1][5]).toBe('x');
    expect(player2.gameboard.grid[1][6]).toBe('*');
  });

  test('CPU attack on random empty location', () => {
    const player1 = PlayerHandler.createPlayer('Player 1');
    const player2 = PlayerHandler.createPlayer('CPU', true);

    coordinates = PlayerHandler.getCPUCoordinates(player1.gameboard);
    console.log(coordinates);
    PlayerHandler.attack(player1.gameboard, coordinates);
    expect(player2.gameboard.grid[0][0]).toBe('');
  });

  // describe('CPU attack player ship', () => {
  //   let shipPlacement;
  //   let player1;
  //   let coordinates;

  //   beforeEach(() => {
  //     player1 = PlayerHandler.createPlayer('Player 1');
  //     coordinates = PlayerHandler.getCPUCoordinates(player1.gameboard);
  //   });

  //   test('add ship to coordinates where auto-attack ', () => {
  //     jest.retryTimes(3);
  //     shipPlacement = GameboardHandler.placeShip(
  //       player1.gameboard,
  //       coordinates,
  //       carrier,
  //     );
  //     if (typeof shipPlacement !== 'object') {
  //       throw new Error('Ship placement is not an object, re-running test');
  //     }

  //     PlayerHandler.attack(player1.gameboard, coordinates);
  //     console.log(coordinates);
  //     console.log(player1.gameboard.grid);

  //     expect(player1.gameboard.grid[coordinates.row][coordinates.col]).toBe('x');
  //   });
  // });
});

describe('Set Winner function', () => {
  test('set winner', () => {
    const player1 = PlayerHandler.createPlayer('Player 1');
    const player2 = PlayerHandler.createPlayer('Player 2');

    PlayerHandler.setWinner(player1);
    expect(player1.isWinner).toBe(true);
    expect(player2.isWinner).toBe(false);
  });

  test('set winner after sinking all ships', () => {
    const player1 = PlayerHandler.createPlayer('Player 1');
    const player2 = PlayerHandler.createPlayer('Player 2');

    GameboardHandler.placeShip(player2.gameboard, { row: 4, col: 0 }, patrol);
    GameboardHandler.placeShip(
      player2.gameboard,
      { row: 6, col: 0 },
      submarine,
    );

    PlayerHandler.attack(player2.gameboard, { row: 4, col: 0 });
    PlayerHandler.attack(player2.gameboard, { row: 4, col: 1 });

    let areShipsSunk = GameboardHandler.areAllShipsSunk(player2.gameboard);

    console.log(areShipsSunk);
    if (areShipsSunk) {
      PlayerHandler.setWinner(player1);
    }

    expect(player1.isWinner).toBe(false);

    PlayerHandler.attack(player2.gameboard, { row: 6, col: 0 });
    PlayerHandler.attack(player2.gameboard, { row: 6, col: 1 });
    PlayerHandler.attack(player2.gameboard, { row: 6, col: 2 });

    console.log(player2.gameboard.grid);

    areShipsSunk = GameboardHandler.areAllShipsSunk(player2.gameboard);
    if (areShipsSunk) {
      PlayerHandler.setWinner(player1);
    }

    expect(player1.isWinner).toBe(true);
  });
});
