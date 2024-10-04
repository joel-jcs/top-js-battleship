const Ship = () => {
  const createShip = () => {
    const ship = {
      length: null,
      timesHit: null,
      isSunk: false,
    };

    return ship;
  };

  return { createShip };
};

console.log(Ship());

// export default Ship();
module.exports = Ship();
