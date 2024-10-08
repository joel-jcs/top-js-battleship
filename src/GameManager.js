import GameboardHandler from './Gameboard';
import PlayerHandler from './Player';
import EventHandler from './EventHandler';
import DOMHandler from './DOMHandler';

const GameManager = () => {
  const initGame = () => {
    DOMHandler.renderInfoContainer();
    DOMHandler.renderGameboards();
  };

  const createPlayers = () => {
    const player1 = PlayerHandler.createPlayer('Player 1');
    const player2 = PlayerHandler.createPlayer('CPU', true);
    return { player1, player2 };
  };

  const checkWinner = (player, opponent) => {
    const arePlayer1ShipsSunk = GameboardHandler.areAllShipsSunk(
      player.gameboard,
    );
    const arePlayer2ShipsSunk = GameboardHandler.areAllShipsSunk(
      opponent.gameboard,
    );

    let message = '';
    if (arePlayer1ShipsSunk || arePlayer2ShipsSunk) {
      if (arePlayer1ShipsSunk) {
        PlayerHandler.setWinner(opponent);
        message = `${opponent.name} has won the game!`;
      }
      if (arePlayer2ShipsSunk) {
        PlayerHandler.setWinner(player);
        message = `${opponent.name} has won the game!`;
      }
      DOMHandler.updateInfoMessage(message);
      DOMHandler.renderRestartButton();
      EventHandler.restartGameListener();

      const player1Container = document.getElementById('player1-container');
      const player2Container = document.getElementById('player2-container');
      player1Container.style.opacity = '0.5';
      player2Container.style.opacity = '0.5';

      player1Container.replaceWith(player1Container.cloneNode(true));
      player2Container.replaceWith(player2Container.cloneNode(true));
    }

    const winnerFound = arePlayer1ShipsSunk
      ? arePlayer2ShipsSunk
      : arePlayer1ShipsSunk;
    return winnerFound;
  };

  const startTurn = (player, opponent) => {
    const player1Grid = document.getElementById('player1-grid');
    const player2Grid = document.getElementById('player2-grid');
    let message = '';
    if (player.name !== 'CPU') {
      DOMHandler.setGridOpacity(player1Grid, player2Grid);
      EventHandler.attackListener(player, opponent, player2Grid);
      message = `${player.name}: It's your turn to attack!`;
      DOMHandler.updateInfoMessage(message);
      checkWinner(player, opponent);
    } else {
      DOMHandler.setGridOpacity(player2Grid, player1Grid);
      message = `${player.name} is attacking...`;
      DOMHandler.updateInfoMessage(message);

      setTimeout(() => {
        const coordinates = PlayerHandler.getCPUCoordinates(opponent.gameboard);
        PlayerHandler.attack(opponent.gameboard, coordinates);
        DOMHandler.updateBoard(player1Grid, opponent.gameboard, coordinates);
        message = `${player.name} has attacked on ${String.fromCharCode(
          coordinates.row + 65,
        )}${coordinates.col + 1}.<br>
        ${opponent.name}: It's time to strike back!`;
        DOMHandler.updateInfoMessage(message);
        DOMHandler.setGridOpacity(player1Grid, player2Grid);
        checkWinner(player, opponent);
      }, 500);
    }
  };

  return { initGame, createPlayers, startTurn };
};
export default GameManager();
