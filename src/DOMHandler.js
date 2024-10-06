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

    const player1Grid = document.createElement('div');
    const player2Grid = document.createElement('div');

    player1Grid.id = 'player1-grid';
    player2Grid.id = 'player2-grid';

    player1Grid.classList.add('gameboard');
    player2Grid.classList.add('gameboard');

    player1Container.appendChild(player1Grid);
    player2Container.appendChild(player2Grid);

    const player1Board = GameboardHandler.createGameboard();
    player1Board.grid.forEach((row) => {
      // eslint-disable-next-line no-unused-vars
      row.forEach((col) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        player1Grid.appendChild(cell);
      });
    });

    const player2Board = GameboardHandler.createGameboard();
    player2Board.grid.forEach((row) => {
      // eslint-disable-next-line no-unused-vars
      row.forEach((col) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        player2Grid.appendChild(cell);
      });
    });

    return { player1Container, player2Container };
  };

  return {
    renderSettings,
    renderGameboards,
  };
};

export default DOMHandler();
