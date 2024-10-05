const Ship = () => {
  const createShip = (length) => {
    const ship = {
      length: length,
      timesHit: 0,
      isSunk: false,
      orientation: 'horizontal',
      coordinates: [],
    };

    return ship;
  };

  const hit = (ship) => (ship.timesHit += 1);

  const isSunk = (ship) => ship.timesHit >= ship.length;

  return { createShip, hit, isSunk };
};

module.exports = Ship();
