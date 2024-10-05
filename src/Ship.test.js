const ShipHandler = require('./Ship');

beforeAll(() => {
  carrier1 = ShipHandler.createShip(5);
  battleship1 = ShipHandler.createShip(4);
  destroyer1 = ShipHandler.createShip(3);
  submarine1 = ShipHandler.createShip(3);
  patrol1 = ShipHandler.createShip(2);
});

test('Ship constructor', () => {
  expect(carrier1).toEqual({
    length: 5,
    timesHit: 0,
    isSunk: false,
    orientation: 'horizontal',
    coordinates: [],
  });

  expect(patrol1).toEqual({
    length: 2,
    timesHit: 0,
    isSunk: false,
    orientation: 'horizontal',
    coordinates: [],
  });
});

describe('hit function', () => {
  afterEach(() => {
    carrier1 = ShipHandler.createShip(5);
    battleship1 = ShipHandler.createShip(4);
    destroyer1 = ShipHandler.createShip(3);
    submarine1 = ShipHandler.createShip(3);
    patrol1 = ShipHandler.createShip(2);
  });
  test('function should increment the ships hit counter', () => {
    ShipHandler.hit(carrier1);
    expect(carrier1.timesHit).toBe(1);
  });

  test('increment ship hits separately', () => {
    carrier2 = ShipHandler.createShip(5);
    battleship2 = ShipHandler.createShip(4);
    destroyer2 = ShipHandler.createShip(3);
    submarine2 = ShipHandler.createShip(3);
    patrol2 = ShipHandler.createShip(2);

    ShipHandler.hit(battleship1);
    ShipHandler.hit(battleship2);
    ShipHandler.hit(battleship2);

    expect(battleship1.timesHit).toBe(1);
    expect(battleship2.timesHit).toBe(2);
  });
});

describe('isSunk function', () => {
  test('return true if timesHit = ship.length', () => {
    carrier1.timesHit = 5;
    expect(ShipHandler.isSunk(carrier1)).toBe(true);
  });

  test('return false if timesHit =/= ship.length', () => {
    carrier1.timesHit = 3;
    expect(ShipHandler.isSunk(carrier1)).toBe(false);

    patrol1.timesHit = 0;
    expect(ShipHandler.isSunk(patrol1)).toBe(false);
  });

  test('return true if timesHit > ship.length', () => {
    battleship1.timesHit = 6;
    expect(ShipHandler.isSunk(battleship1)).toBe(true);

    submarine1.timesHit = 0;
    expect(ShipHandler.isSunk(submarine1)).toBe(false);
  });
});
