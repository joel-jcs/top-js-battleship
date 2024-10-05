const Gameboard = () => {
  const createGameboard = () => {
    const gameboard = {
      grid: setGrid(),
      ships: [],
    };

    function setGrid() {
      const boardArr = [];
      const rows = 10;
      const cols = 10;
      for (let i = 0; i < rows; i++) {
        boardArr.push([]);
        for (let j = 0; j < cols; j++) {
          boardArr[i].push('');
        }
      }
      return boardArr;
    }

    return gameboard;
  };

  const placeShip = (gameboard, ship, coordinates) => {
    if (
      //if input coordinates are out of bounds
      coordinates.row > gameboard.grid.length ||
      coordinates.col > gameboard.grid[0].length
    ) {
      return 'Input coordinates are out of bounds';
    }

    if (
      // handling board-edge coordinates (i.e. coordinates inbounds but ship goes outbounds)
      ship.length + coordinates.row > gameboard.grid.length ||
      ship.length + coordinates.col > gameboard.grid[coordinates.row].length
    ) {
      return 'Trying to place ship out of bounds';
    }

    const hasShip = gameboard.grid[coordinates.row][coordinates.col] !== '';

    if (hasShip) {
      return 'There is another ship at these coordinates';
    }

    const { row, col } = coordinates;
    if (ship.orientation === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        gameboard.grid[row][col + i] = '*';
        ship.coordinates.push({ row, col: col + i });
      }
    } else if (ship.orientation === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        gameboard.grid[row + i][col] = '*';
        ship.coordinates.push({ row: row + i, col });
      }
    }
    gameboard.ships.push(ship);

    return gameboard;
  };

  const getShips = (gameboard) => gameboard.ships;

  const receiveAttack = (gameboard, ship, coordinates) => {
    const { row, col } = coordinates;
    if (gameboard.grid[row][col] === '') {
      gameboard.grid[row][col] = 'o';
    } else if (gameboard.grid[row][col] === '*') {
      gameboard.grid[row][col] = 'x';
    }

    return gameboard;
  };

  return { createGameboard, placeShip, getShips, receiveAttack };
};

module.exports = Gameboard();
