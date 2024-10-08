import GameboardHandler from './Gameboard';
import ShipHandler from './Ship';
import GameManager from './GameManager';
import EventHandler from './EventHandler';

const DOMHandler = () => {
  const renderInfoContainer = () => {
    const infoContainer = document.getElementById('info-container');
    const startBtn = document.createElement('button');
    startBtn.id = 'start-btn';
    startBtn.textContent = 'START GAME';
    infoContainer.appendChild(startBtn);

    return infoContainer;
  };

  const renderInfoMessage = () => {
    const infoContainer = document.getElementById('info-container');
    const infoMessage = document.createElement('h3');
    infoMessage.id = 'info-message';
    infoContainer.appendChild(infoMessage);
  };

  const updateInfoMessage = (message) => {
    const infoMessage = document.getElementById('info-message');
    infoMessage.innerHTML = message;
  };

  const setGridOpacity = (currentPlayer, idlePlayer) => {
    currentPlayer.style.opacity = 0.5;
    idlePlayer.style.opacity = 1;
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
    const { player1, player2 } = GameManager.createPlayers();
    const player1Container = document.getElementById('player1-container');
    const player2Container = document.getElementById('player2-container');

    //add player names to each grid
    const player1Name = document.createElement('h2');
    player1Name.classList.add('player-name');
    player1Name.textContent = player1.name;
    player1Container.append(player1Name);

    const player2Name = document.createElement('h2');
    player2Name.classList.add('player-name');
    player2Name.textContent = player2.name;
    player2Container.append(player2Name);

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

    player1Container.style.opacity = '0.3';
    player2Container.style.opacity = '0.3';

    EventHandler.startGameListener(player1, player2);

    return { player1Container, player2Container };
  };

  const updateBoard = (opponentGrid, attackedBoard, coordinates) => {
    const gridRows = opponentGrid.querySelectorAll('.row');
    const { row, col } = coordinates;

    const attackedCoordinates = attackedBoard.grid[row][col];
    if (attackedCoordinates === 'x') {
      gridRows[row].children[col].classList.add('hit');
      gridRows[row].children[col].innerText = '💥';
    } else if (attackedCoordinates === 'o') {
      gridRows[row].children[col].classList.add('miss');
      gridRows[row].children[col].innerText = '💦';
    }
  };

  const renderRestartButton = () => {
    const infoContainer = document.getElementById('info-container');
    const restartButton = document.createElement('button');
    restartButton.id = 'restart-btn';
    restartButton.textContent = 'Play Again?';
    restartButton.classList.add('restart-btn');
    infoContainer.append(restartButton);
  };

  return {
    renderInfoContainer,
    renderInfoMessage,
    updateInfoMessage,
    setGridOpacity,
    renderGameboards,
    updateBoard,
    renderRestartButton,
  };
};

export default DOMHandler();
