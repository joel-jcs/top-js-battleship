import PlayerHandler from './Player';
import DOMHandler from './DOMHandler';
import GameManager from './GameManager';

const EventHandler = () => {
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
        opponentGrid.removeEventListener('click', clickHandler);
      }
    };
    opponentGrid.addEventListener('click', clickHandler);
  };
  return {
    attackListener,
  };
};

export default EventHandler();
