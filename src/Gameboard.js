const Gameboard = () => {
  const createGameboard = () => {
    const rows = 10;
    const cols = 10;
    const gameboard = [];
    for (let i = 0; i < rows; i++) {
      gameboard.push([]);
      for (let j = 0; j < cols; j++) {
        gameboard[i].push('');
      }
    }
    return gameboard;
  };

  const placeShip = (gameboard, ship, coordinates) => {
    if (
      //if input coordinates are out of bounds
      coordinates.row > gameboard.length ||
      coordinates.col > gameboard[0].length
    ) {
      return 'error';
    }

    // if (
    //   // handling cases of board-edges (i.e. coordinates are inbounds but ship is larger)
    //   ship.length + coordinates.row > gameboard.length ||
    //   ship.length + coordinates.col > gameboard[coordinates.row].length
    // ) {
    //   return 'error';
    // }

    const { row, col } = coordinates;
    if (ship.orientation === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        gameboard[row][col + i] = '*';
      }
    } else if (ship.orientation === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        gameboard[row + i][col] = '*';
      }
    }

    return gameboard;
  };

  // Got ahead of myself, this receive attack should be added after
  //   const receiveAttack = (row, col) => {
  //     gameboard[row][col] = 'miss';
  //   };

  return { createGameboard, placeShip };
};

module.exports = Gameboard();
