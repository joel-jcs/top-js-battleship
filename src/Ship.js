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

  const sinkShip = (ship) => (ship.isSunk = true);

  const setCoordinates = (ship, coordinates) => {
    ship.coordinates.push(coordinates);
    return ship;
  };

  return { createShip, hit, isSunk, sinkShip, setCoordinates };
};

module.exports = Ship();
