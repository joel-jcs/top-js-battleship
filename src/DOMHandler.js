import GameboardHandler from './Gameboard';
import PlayerHandler from './Player';
import ShipHandler from './Ship';
import EventHandler from './EventHandler';

const DOMHandler = () => {
  const renderSettings = () => {
    const settingsContainer = document.getElementById('settings-container');

    return settingsContainer;
  };

  const setShips = (gameboard) => {
    const carrier = ShipHandler.createShip(5);
    const battleship = ShipHandler.createShip(4);
    const destroyer = ShipHandler.createShip(3);
    const submarine = ShipHandler.createShip(3);
    const patrol = ShipHandler.createShip(2);

    destroyer.orientation = 'vertical';
    submarine.orientation = 'vertical';

    const coordinates1 = {
      row: Math.floor(Math.random() * 1),
      col: Math.floor(Math.random() * 1),
    };

    const coordinates2 = {
      row: Math.floor(Math.random() * 2) + 1,
      col: Math.floor(Math.random() * 2) + 4,
    };

    const coordinates3 = {
      row: Math.floor(Math.random() * 2) + 3,
      col: Math.floor(Math.random() * 2) + 1,
    };

    const coordinates4 = {
      row: Math.floor(Math.random() * 2) + 4,
      col: Math.floor(Math.random() * 2) + 4,
    };

    const coordinates5 = {
      row: Math.floor(Math.random() * 2) + 7,
      col: Math.floor(Math.random() * 2) + 7,
    };
    GameboardHandler.placeShip(gameboard, coordinates1, carrier);
    GameboardHandler.placeShip(gameboard, coordinates2, battleship);
    GameboardHandler.placeShip(gameboard, coordinates3, destroyer);
    GameboardHandler.placeShip(gameboard, coordinates4, submarine);
    GameboardHandler.placeShip(gameboard, coordinates5, patrol);
    return gameboard;
  };

  const renderShips = (gameboard, playerGrid) => {
    const gameboardArr = setShips(gameboard);
    const gridRows = playerGrid.querySelectorAll('.row');
    gameboardArr.grid.forEach((gameboardRow, row) => {
      gameboardRow.forEach((gameboardCell, col) => {
        if (gameboardCell === '*') {
          gridRows[row].children[col].classList.add('ship');
        }
      });
    });
  };

  const renderGameboards = () => {
    // create grid labels
    const gridRowLegend = document.createElement('div');
    const gridColLegend = document.createElement('div');

    gridRowLegend.classList.add('grid-row-legend');
    gridColLegend.classList.add('grid-col-legend');

    const gridRowLabelArr = [];
    const gridColLabelArr = [];
    for (let i = 0; i < 10; i++) {
      gridRowLabelArr.push(String.fromCharCode(i + 65));
      gridColLabelArr.push(i + 1);
    }

    gridRowLabelArr.forEach((row) => {
      const gridRowLabel = document.createElement('div');
      gridRowLabel.classList.add('grid-row-labels');
      gridRowLabel.textContent = row;
      gridRowLegend.append(gridRowLabel);
    });

    gridColLabelArr.forEach((col) => {
      const gridColLabel = document.createElement('div');
      gridColLabel.classList.add('grid-col-labels');
      gridColLabel.textContent = col;
      gridColLegend.append(gridColLabel);
    });

    const player1Container = document.getElementById('player1-container');
    const player2Container = document.getElementById('player2-container');

    const gridRowLegend2 = gridRowLegend.cloneNode(true);
    const gridColLegend2 = gridColLegend.cloneNode(true);

    player1Container.append(gridRowLegend);
    player1Container.append(gridColLegend);
    player2Container.append(gridRowLegend2);
    player2Container.append(gridColLegend2);

    // add grids to player game boards
    const player1Grid = document.createElement('div');
    const player2Grid = document.createElement('div');

    player1Grid.id = 'player1-grid';
    player2Grid.id = 'player2-grid';

    player1Grid.classList.add('gameboard');
    player2Grid.classList.add('gameboard');

    player1Container.append(player1Grid);
    player2Container.append(player2Grid);

    const player1 = PlayerHandler.createPlayer('Player 1');
    player1.gameboard.grid.forEach((row) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');
      // eslint-disable-next-line no-unused-vars
      row.forEach((col) => {
        const cell = document.createElement('div');

        cell.classList.add('cell');
        rowElement.append(cell);
      });
      player1Grid.append(rowElement);
    });
    renderShips(player1.gameboard, player1Grid);

    const player2 = PlayerHandler.createPlayer('Player 2', true);
    player2.gameboard.grid.forEach((row) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');
      // eslint-disable-next-line no-unused-vars
      row.forEach((col) => {
        const cell = document.createElement('div');

        cell.classList.add('cell');
        rowElement.append(cell);
      });
      player2Grid.append(rowElement);
    });
    setShips(player2.gameboard);

    EventHandler.attackListener(player1, player2Grid, player2.gameboard);

    return { player1Container, player2Container };
  };

  const updateBoard = (attackedBoard, opponentGrid) => {
    const gridRows = opponentGrid.querySelectorAll('.row');

    for (let row = 0; row < attackedBoard.grid.length; row++) {
      for (let col = 0; col < attackedBoard.grid[row].length; col++) {
        const attackedCoordinates = attackedBoard.grid[row][col];
        if (attackedCoordinates === 'x') {
          gridRows[row].children[col].classList.add('hit');
          gridRows[row].children[col].innerText = '💥';
        } else if (attackedCoordinates === 'o') {
          gridRows[row].children[col].classList.add('miss');
          gridRows[row].children[col].innerText = '💦';
        }
      }
    }
  };

  return {
    renderSettings,
    renderGameboards,
    updateBoard,
  };
};

export default DOMHandler();
