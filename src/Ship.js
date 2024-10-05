const Ship = () => {
  const createShip = (length) => {
    return {
      length: length,
      timesHit: 0,
      isSunk: false,
    };
  };

  const hit = (ship) => (ship.timesHit += 1);

  const isSunk = (ship) => ship.timesHit >= ship.length;

  return { createShip, hit, isSunk };
};

module.exports = Ship();
