import PlayerHandler from './Player';
import DOMHandler from './DOMHandler';
import GameManager from './GameManager';

const EventHandler = () => {
  const startGameListener = (player1, player2) => {
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
      const player1Container = document.getElementById('player1-container');
      const player2Container = document.getElementById('player2-container');
      player1Container.style.opacity = '1';
      player2Container.style.opacity = '1';

      startBtn.remove();
      DOMHandler.renderInfoMessage();
      GameManager.startTurn(player1, player2);
    });
  };

  const attackListener = (player, opponent, opponentGrid) => {
    const opponentBoard = opponent.gameboard;

    const clickHandler = (event) => {
      const cell = event.target;
      const row = cell.parentNode;

      const rowIndex = Array.prototype.indexOf.call(
        row.parentNode.children,
        row,
      );
      const colIndex = Array.prototype.indexOf.call(row.children, cell);

      if (
        event.target.classList.contains('miss') ||
        event.target.classList.contains('hit')
      ) {
        return;
      }
      const coordinates = {
        row: rowIndex,
        col: colIndex,
      };

      const attackedBoard = PlayerHandler.attack(opponentBoard, coordinates);
      DOMHandler.updateBoard(opponentGrid, attackedBoard, coordinates);
      GameManager.startTurn(opponent, player);

      if (player.isWinner || opponent.isWinner) {
        opponentGrid.removeEventListener('mouseup', clickHandler);
      }
    };
    opponentGrid.addEventListener('mouseup', clickHandler);
  };

  const restartGameListener = () => {
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', () => {
      window.location.reload();
    });
  };
  return {
    startGameListener,
    attackListener,
    restartGameListener,
  };
};

export default EventHandler();
