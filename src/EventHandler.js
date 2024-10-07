import GameboardHandler from './Gameboard';
import PlayerHandler from './Player';
import ShipHandler from './Ship';
import DOMHandler from './DOMHandler';

const EventHandler = () => {
  const attackListener = (player, opponentGrid, opponentBoard) => {
    console.log(opponentGrid);

    if (player.isCPU === false) {
      const gridRows = opponentGrid.querySelectorAll('.row');

      gridRows.forEach((row, rowIndex) => {
        const columns = row.querySelectorAll('.cell');

        columns.forEach((column, colIndex) => {
          column.addEventListener('click', (event) => {
            const { target } = event;
            console.log(target, rowIndex, colIndex);

            const attackedBoard = PlayerHandler.attack(opponentBoard, {
              row: rowIndex,
              col: colIndex,
            });

            DOMHandler.updateBoard(attackedBoard, opponentGrid);
          });
        });
      });
    }
  };
  return {
    attackListener,
  };
};

export default EventHandler();
