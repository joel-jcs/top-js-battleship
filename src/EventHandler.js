import PlayerHandler from './Player';
import DOMHandler from './DOMHandler';
import GameManager from './GameManager';

const EventHandler = () => {
  const attackListener = (player, opponent, opponentGrid) => {
    const opponentBoard = opponent.gameboard;

    const gridRows = opponentGrid.querySelectorAll('.row');

    gridRows.forEach((row, rowIndex) => {
      const columns = row.querySelectorAll('.cell');

      columns.forEach((column, colIndex) => {
        column.addEventListener('click', (event) => {
          const { target } = event;
          const coordinates = {
            row: rowIndex,
            col: colIndex,
          };
          const attackedBoard = PlayerHandler.attack(
            opponentBoard,
            coordinates,
          );

          DOMHandler.updateBoard(opponentGrid, attackedBoard, coordinates);
          GameManager.startTurn(opponent, player);
        });
      });
    });
  };
  return {
    attackListener,
  };
};

export default EventHandler();
