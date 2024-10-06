import ShipHandler from './Ship';

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

  const checkInvalidInput = (gameboard, coordinates, ship) => {
    if (
      //if input coordinates are out of bounds
      coordinates.row > gameboard.grid.length ||
      coordinates.col > gameboard.grid[0].length
    ) {
      return 'Input coordinates are out of bounds';
    }

    const hasSelection =
      gameboard.grid[coordinates.row][coordinates.col] === 'x' ||
      gameboard.grid[coordinates.row][coordinates.col] === 'o';

    if (hasSelection) {
      return 'Coordinates have already been selected';
    }

    if (ship) {
      if (
        // handling board-edge coordinates (i.e. coordinates inbounds but ship goes outbounds)
        ship.length + coordinates.row > gameboard.grid.length ||
        ship.length + coordinates.col > gameboard.grid[coordinates.row].length
      ) {
        return 'Trying to place ship out of bounds';
      }

      // checking for ship overlap
      let checkCoordinates = {};
      let shipLocation;
      for (let i = 0; i < ship.length; i++) {
        if (ship.orientation === 'vertical') {
          const nextCol = coordinates.col + i;
          for (let j = 0; j < ship.length; j++) {
            checkCoordinates = { row: coordinates.row + j, col: nextCol };
            shipLocation = getShipAtCoordinates(gameboard, checkCoordinates);
            if (shipLocation) {
              return 'There is another ship at these coordinates';
            }
          }
        } else {
          const nextRow = coordinates.row + i;
          for (let j = 0; j < ship.length; j++) {
            checkCoordinates = { row: nextRow, col: coordinates.col + j };
            shipLocation = getShipAtCoordinates(gameboard, checkCoordinates);
            if (shipLocation) {
              return 'There is another ship at these coordinates';
            }
          }
        }
      }
    }
  };

  const placeShip = (gameboard, coordinates, ship) => {
    const error = checkInvalidInput(gameboard, coordinates, ship);

    if (typeof error === 'string') {
      return error;
    }

    const { row, col } = coordinates;
    if (ship.orientation === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        gameboard.grid[row][col + i] = '*';
        ShipHandler.setCoordinates(ship, { row, col: col + i });
      }
    } else if (ship.orientation === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        gameboard.grid[row + i][col] = '*';
        ShipHandler.setCoordinates(ship, { row: row + i, col });
      }
    }
    gameboard.ships.push(ship);

    return gameboard;
  };

  const getShips = (gameboard) => gameboard.ships;

  const getShipAtCoordinates = (gameboard, coordinates) => {
    const allShips = getShips(gameboard);
    for (let i = 0; i < allShips.length; i++) {
      //iterate over all ships on the grid
      for (let j = 0; j < allShips[i].coordinates.length; j++) {
        //iterate over the coordinates of each ship on the grid
        if (
          allShips[i].coordinates[j].row === coordinates.row &&
          allShips[i].coordinates[j].col === coordinates.col
        ) {
          //return the ship that matches the coordinates
          return allShips[i];
        }
      }
    }
  };

  const receiveAttack = (gameboard, coordinates) => {
    const { row, col } = coordinates;
    if (gameboard.grid[row][col] === '') {
      gameboard.grid[row][col] = 'o';
    } else if (gameboard.grid[row][col] === '*') {
      gameboard.grid[row][col] = 'x';

      const shipToHit = getShipAtCoordinates(gameboard, coordinates);
      ShipHandler.hit(shipToHit);

      const isSunk = ShipHandler.isSunk(shipToHit);
      if (isSunk) ShipHandler.sinkShip(shipToHit);
    }

    return gameboard;
  };

  const areAllShipsSunk = (gameboard) => {
    const allShips = getShips(gameboard);
    for (let i = 0; i < allShips.length; i++) {
      if (!allShips[i].isSunk) return false;
    }
    return true;
  };

  return {
    createGameboard,
    checkInvalidInput,
    placeShip,
    getShips,
    receiveAttack,
    areAllShipsSunk,
  };
};

export default Gameboard();
