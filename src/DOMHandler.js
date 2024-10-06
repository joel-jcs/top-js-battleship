import GameboardHandler from './Gameboard';
import PlayerHandler from './Player';
import ShipHandler from './Ship';

const DOMHandler = () => {
  const renderSettings = () => {
    const settingsContainer = document.getElementById('settings-container');

    return settingsContainer;
  };

  const renderGameboards = () => {
    const player1Container = document.getElementById('player1-container');
    const player2Container = document.getElementById('player2-container');

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

    const player1Grid = document.createElement('div');
    const player2Grid = document.createElement('div');

    player1Grid.id = 'player1-grid';
    player2Grid.id = 'player2-grid';

    player1Grid.classList.add('gameboard');
    player2Grid.classList.add('gameboard');

    player1Container.append(player1Grid);
    player2Container.append(player2Grid);

    const player1Board = GameboardHandler.createGameboard();
    player1Board.grid.forEach((row) => {
      // eslint-disable-next-line no-unused-vars
      row.forEach((col) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        player1Grid.append(cell);
      });
    });

    const player2Board = GameboardHandler.createGameboard();
    player2Board.grid.forEach((row) => {
      // eslint-disable-next-line no-unused-vars
      row.forEach((col) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        player2Grid.append(cell);
      });
    });

    return { player1Container, player2Container };
  };

  const renderShips = (gameboard) => {};

  return {
    renderSettings,
    renderGameboards,
  };
};

export default DOMHandler();
