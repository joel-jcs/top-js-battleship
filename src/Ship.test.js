const Ship = require('./Ship');

test('Ship', () => {
  const ship = Ship.createShip();
  expect(ship).toEqual({
    length: null,
    timesHit: null,
    isSunk: false,
  });
});
